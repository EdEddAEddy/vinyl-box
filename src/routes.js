import express from "express";
import { userRegister } from "./controllers/users.js";

const routers = express();

routers.post("/user", userRegister);

export default routers;
