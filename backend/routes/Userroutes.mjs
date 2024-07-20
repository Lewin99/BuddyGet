import express from "express";
import { postuser, login } from "../controllers/UserControllers.mjs";

const usersrouter = express.Router();

usersrouter.post("/", postuser);
usersrouter.post("/login", login);
export default usersrouter;
