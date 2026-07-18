import express from "express";
import authController from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";


const authRouter = express.Router();

/**
 * @route POST /api/auth/register
 * @description Register new user
 * @access public
 */
authRouter.post('/register',authController.registerUserController);

/**
 * @route POST /api/auth/login
 * @description Login new user
 * @access public
 */
authRouter.post('/login',authController.loginUserController);

/**
 * @route GET /api/auth/logout
 * @description clear token from user cookie and add to blacklist
 * @access public
 */
authRouter.get('/logout',authController.logoutUserController);

/**
 * @route GET /api/auth/get-me
 * @description get current logged in user details
 * @access private
 */
authRouter.get('/get-me',authMiddleware.authUser,authController.getUserController);



export default authRouter;