import jwt from "jsonwebtoken";

import {env} from "./env.js";

const jwtSecret = env("JWT_SECRET");

export const createToken = payload => jwt.sign(payload, jwtSecret, {expiresIn: "24h"});

export const verifyToken = token => {
    try {
        const payload = jwt.verify(token, jwtSecret);
        return {
            data: payload,
            error: null,
        }
    }
    catch(error) {
        return {
            error,
            data: null,
        }
    }
};
