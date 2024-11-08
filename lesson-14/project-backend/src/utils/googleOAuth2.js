import { OAuth2Client } from "google-auth-library";
import * as path from "node:path";
import {readFile} from "node:fs/promises";
import createHttpError from "http-errors";

import {env} from "./env.js";

const clientId = env("GOOGLE_AUTH_CLIENT_ID");
const clientSecret = env("GOOGLE_AUTH_CLIENT_SECRET");

const googleOAuthConfigPath = path.resolve("google-oauth.json");
const googleOAuthConfig = JSON.parse(await readFile(googleOAuthConfigPath));

const googleOAuthClient = new OAuth2Client({
    clientId,
    clientSecret,
    redirectUri: googleOAuthConfig.web.redirect_uris[0],
});

export const generateAuthUrl = ()=> {
    const url = googleOAuthClient.generateAuthUrl({
        scope: [
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile",
        ],
    });

    return url;
}

export const validCode = async code => {
    const response = await googleOAuthClient.getToken(code);
    if(response.tokens.id_token) {
        throw createHttpError(401, "Invalid google code");
    }

    const ticket = await googleOAuthClient.verifyIdToken({
        idToken: response.tokens.id_token
    });

    return ticket;
}

export const getUsernameFromGooglePayload = ({given_name, family_name}) => {
    if(!given_name || !family_name) return "User";
    return !family_name ? given_name : `${given_name} ${family_name}`;
}
