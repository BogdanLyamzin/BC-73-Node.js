import createHttpError from "http-errors";

import * as authServices from "../services/auth.js";

const setupSession = (res, session)=> {
    res.cookie("refreshToken", session.refreshToken, {
        httpOnly: true,
        expires: session.refreshTokenValidUntil,
    });

    res.cookie("sessionId", session._id, {
        httpOnly: true,
        expires: session.refreshTokenValidUntil,
    });
}

export const registerController = async(req, res)=> {
    await authServices.register(req.body);

    res.status(201).json({
        message: "Successffuly register user!"
    });
};

export const loginController = async(req, res)=> {
    const session = await authServices.login(req.body);

    setupSession(res, session);

    res.json({
        status: 200,
        message: "Successfully loggin user!",
        data: {
            accessToken: session.accessToken,
        }
    })
}

export const refreshSessionController = async(req, res)=> {
    const session = await authServices.refreshSession({
        sessionId: req.cookies.sessionId,
        refreshToken: req.cookies.refreshToken,
    });

    setupSession(res, session);

    res.json({
        status: 200,
        message: "Session successfully refresh",
        data: {
            accessToken: session.accessToken,
        }
    })
}

export const logoutController = async(req, res)=> {
    const {sessionId} = req.cookies;
    if(sessionId) {
        await authServices.logout(sessionId);
        
        res.clearCookie("sessionId");
        res.clearCookie("refreshToken");

        return res.status(204).send();
    }

    throw createHttpError(401, "Session not found");
}
