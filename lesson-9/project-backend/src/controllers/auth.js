import createHttpError from "http-errors";

import * as authServices from "../services/auth.js";

export const registerController = async(req, res)=> {
    await authServices.register(req.body);

    res.status(201).json({
        message: "Successffuly register user!"
    });
};

export const loginController = async(req, res)=> {
    const session = await authServices.login(req.body);

    res.cookie("refreshToken", session.refreshToken, {
        httpOnly: true,
        expires: session.refreshTokenValidUntil,
    });

    res.cookie("sessionId", session._id, {
        httpOnly: true,
        expires: session.refreshTokenValidUntil,
    });

    res.json({
        message: "Successfully loggin user!",
        data: {
            accessToken: session.accessToken,
        }
    })
}
