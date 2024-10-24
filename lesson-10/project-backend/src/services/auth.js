import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import {randomBytes} from "crypto";

import SessionCollection from "../db/models/Session.js";
import UserCollection from "../db/models/User.js";

import { accessTokenLifetime, refreshTokenLifetime } from "../constants/users.js";

const createSession = ()=> {
    const accessToken = randomBytes(30).toString("base64");
    const refreshToken = randomBytes(30).toString("base64");
    const accessTokenValidUntil = Date.now() + accessTokenLifetime;
    const refreshTokenValidUntil = Date.now() + refreshTokenLifetime;

    return {
        accessToken,
        refreshToken,
        accessTokenValidUntil,
        refreshTokenValidUntil,
    }
}

export const register = async(payload) => {
    const {email, password} = payload;
    const user = await UserCollection.findOne({email});
    if(user) {
        throw createHttpError(409, "Email already exist");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    return await UserCollection.create({...payload, password: hashPassword});
}

export const login = async(payload) => {
    const {email, password} = payload;
    const user = await UserCollection.findOne({email});
    if(!user) {
        throw createHttpError(401, "Email or password invalid");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare) {
        throw createHttpError(401, "Email or password invalid");
    }

    await SessionCollection.deleteOne({userId: user._id});

    const newSession = createSession();

    return await SessionCollection.create({
        userId: user._id,
        ...newSession,
    })
}

export const refreshSession = async({sessionId, refreshToken})=> {
    const oldSession = await SessionCollection.findOne({
        _id: sessionId,
        refreshToken,
    });
    if(!oldSession) {
        throw createHttpError(401, "Session not found");
    }

    if(Date.now () > oldSession.refreshTokenValidUntil) {
        throw createHttpError(401, "Refresh token expired");
    }

    await SessionCollection.deleteOne({_id: sessionId});

    const newSession = createSession();

    return await SessionCollection.create({
        userId: oldSession.userId,
        ...newSession,
    })
}

export const logout = async(sessionId)=> {
    await SessionCollection.deleteOne({_id: sessionId});
}

export const findSession = filter => SessionCollection.findOne(filter);

export const findUser = filter => UserCollection.findOne(filter);
