import { Router } from "express";
import { getAllUsers } from "./user.handlers.js";
const userRouter=Router();


userRouter.get('/users',getAllUsers)

export default userRouter;