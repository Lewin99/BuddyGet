import jwt from "jsonwebtoken";
import client from "../src/Plaid_client.mjs";
import UserAccount from "../models/UserAccount.mjs";
import Account from "../models/Account.mjs";

const Acess_Token_Secret_Key = process.env.SECRET_key;

export const LinkToken = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send("Authorization token missing");
  }

  let decoded;
  try {
    decoded = jwt.verify(token, Acess_Token_Secret_Key);
  } catch (error) {
    return res.status(403).send("Invalid authorization token");
  }

  const userId = decoded.userId;

  try {
    const response = await client.linkTokenCreate({
      user: {
        client_user_id: `${userId}`,
      },
      client_name: "Your App Name",
      country_codes: ["US"],
      language: "en",
      products: ["transactions"],
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to create link token");
  }
};

export const exchangePublicToken = async (req, res) => {
  const { public_token, meta_data } = req.body;
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send("Authorization token missing");
  }

  let decoded;
  try {
    decoded = jwt.verify(token, Acess_Token_Secret_Key);
  } catch (error) {
    return res.status(403).send("Invalid authorization token");
  }

  const userId = decoded.userId;

  console.log("Metadata received:", meta_data);
  if (!meta_data || !meta_data.institution) {
    return res
      .status(400)
      .json({ error: "Invalid metadata: institution information is missing" });
  }

  try {
    const response = await client.itemPublicTokenExchange({ public_token });
    console.log("Plaid response:", response);

    const { access_token: accessToken, item_id: itemId } = response.data;

    if (!accessToken || !itemId) {
      return res.status(500).json({
        error: "Failed to retrieve access token or item ID from Plaid",
      });
    }

    const institution = meta_data.institution;

    console.log("Institution:", institution);
    console.log("Accounts:", meta_data.accounts);

    // Store accessToken and item details
    const userAccount = new UserAccount({
      userId,
      itemId,
      accessToken,
      institutionId: institution.institution_id,
      institutionName: institution.name,
    });
    await userAccount.save();

    // Fetch and save account balances
    const balanceResponse = await client.accountsBalanceGet({
      access_token: accessToken,
    });
    const balances = balanceResponse.data.accounts;

    let totalBalance = 0;

    for (const account of balances) {
      const existingAccount = await Account.findOne({
        userId,
        accountId: account.account_id,
      });

      if (existingAccount) {
        existingAccount.balances = {
          available: account.balances.available,
          current: account.balances.current,
          limit: account.balances.limit,
        };
        await existingAccount.save();
      } else {
        const accountData = new Account({
          userId,
          accountId: account.account_id,
          name: account.name,
          mask: account.mask,
          type: account.type,
          subtype: account.subtype,
          balances: {
            available: account.balances.available,
            current: account.balances.current,
            limit: account.balances.limit,
          },
        });
        await accountData.save();
      }

      // Summing up available balances
      if (account.balances.available) {
        totalBalance += account.balances.available;
      }
    }

    // Update the user account with the total balance
    userAccount.totalBalance = totalBalance;
    await userAccount.save();

    res.json({ status: "success" });
  } catch (error) {
    console.error("Error exchanging public token:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
