import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import { 
    checkUserName, 
    getCurrentUser, 
    getUsers, 
    loginUser, 
    logOutUser, 
    registerUser 
} from "../controllers/user.controller.js";

const userRouter: Router = Router();

userRouter.route('/')
    .get(protect, getUsers)
    .post(registerUser);

userRouter.route('/currentUser')
    .get(protect, getCurrentUser);

userRouter.route('/login')
    .post(loginUser);

userRouter.route('/logout')
    .post(logOutUser);

userRouter.route('/checkUserName')
    .get(checkUserName);

export default userRouter;