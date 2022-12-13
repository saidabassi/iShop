import express from "express";
const authRouter = express.Router();
import {
  register,
  Login,
  updateUser,
  getCurrentUser,
} from "../controllers/userController.js";


authRouter.route("/register").post( register);
authRouter.route("/login").post(Login);
authRouter.route("/updateUser").patch(updateUser);
authRouter.route("/currentUser").get(getCurrentUser);
   
export default authRouter;
     