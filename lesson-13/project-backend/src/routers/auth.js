import { Router } from "express";

import * as authControllers from "../controllers/auth.js";

import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../utils/validateBody.js";

import {userRegisterSchema, userLoginSchema, loginGoogleCode} from "../validation/users.js";

const authRouter = Router();

authRouter.post("/register", validateBody(userRegisterSchema), ctrlWrapper(authControllers.registerController));

authRouter.get("/verify", ctrlWrapper(authControllers.verifyController));

authRouter.post("/login", validateBody(userLoginSchema), ctrlWrapper(authControllers.loginController));

authRouter.get("/get-oauth-url", ctrlWrapper(authControllers.getGoogleOAuthUrlController));

authRouter.post("/confirm-oauth", validateBody(loginGoogleCode),ctrlWrapper(authControllers.loginWithGoogleController));

authRouter.post("/refresh", ctrlWrapper(authControllers.refreshSessionController));

authRouter.post("/logout", ctrlWrapper(authControllers.logoutController));

export default authRouter;
