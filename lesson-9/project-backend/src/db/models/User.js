import {Schema, model} from 'mongoose';

import { handleSaveError, setUpdateSettings } from './hooks.js';

import { emailRegexp } from '../../constants/users.js';

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        match: emailRegexp,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
}, {versionKey: false, timestamps: true});

userSchema.post("save", handleSaveError);

userSchema.pre("findOneAndUpdate", setUpdateSettings);

userSchema.post("findOneAndUpdate", handleSaveError);

const UserCollection = model("user", userSchema);

export default UserCollection;
