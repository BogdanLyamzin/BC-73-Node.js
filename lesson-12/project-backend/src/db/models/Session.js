import {Schema, model} from 'mongoose';

import { handleSaveError, setUpdateSettings } from './hooks.js';

const sessionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    accessToken: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
        required: true,
    },
    accessTokenValidUntil: {
        type: Date,
        required: true,
    },
    refreshTokenValidUntil: {
        type: Date,
        required: true,
    }
}, {versionKey: false, timestamps: true});

sessionSchema.post("save", handleSaveError);

sessionSchema.pre("findOneAndUpdate", setUpdateSettings);

sessionSchema.post("findOneAndUpdate", handleSaveError);

const SessionCollection = model("sesion", sessionSchema);

export default SessionCollection;
