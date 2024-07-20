import Account from "../models/Account.mjs";

export const saveAccounts = async (userId, accounts) => {
  try {
    for (const account of accounts) {
      const accountData = new Account({
        userId,
        accountId: account.id,
        name: account.name,
        mask: account.mask,
        type: account.type,
        subtype: account.subtype,
      });
      await accountData.save();
    }
  } catch (error) {
    console.error("Error saving accounts:", error);
  }
};
