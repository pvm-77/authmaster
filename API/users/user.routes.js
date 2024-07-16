import { Router } from "express";
import { getAllUsers } from "./user.handlers.js";
const userRouter=Router();


userRouter.get('/',getAllUsers)

export default userRouter;