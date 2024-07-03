import express from "express";
import { postuser } from "../controllers/UserControllers.mjs";

const usersrouter = express.Router();

usersrouter.post("/", postuser);
export default usersrouter;
