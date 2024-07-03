import express from "express";
import {
  LinkToken,
  exchangePublicToken,
} from "../controllers/Plaid_controllers.mjs";

const plaidrouters = express.Router();

plaidrouters.post("/CreateLinkToken", LinkToken);
plaidrouters.post("/ExchangePublicToken", exchangePublicToken);
export default plaidrouters;
