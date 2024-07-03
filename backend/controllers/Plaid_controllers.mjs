import client from "../src/Plaid_client.mjs";

export const LinkToken = async (req, res) => {
  try {
    const response = await client.linkTokenCreate({
      user: {
        client_user_id: "1234", // Replace with your user ID logic, even for testing
      },
      client_name: "Your App Name",
      country_codes: ["US"],
      language: "en",
      products: ["transactions"],
    });
    res.json(response.data); // Ensure to access the data property correctly
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to create link token");
  }
};

export const exchangePublicToken = async (req, res) => {
  const { public_token } = req.body;

  try {
    const response = await client.itemPublicTokenExchange({
      public_token: public_token,
    });
    const accessToken = response.data.access_token;
    // Save the access token to your database for later use
    res.json({ access_token: accessToken });
  } catch (error) {
    console.error(error.response.data);
    res.status(500).send("Failed to exchange public token");
  }
};
