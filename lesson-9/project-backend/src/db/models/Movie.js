import {Schema, model} from 'mongoose';

import { handleSaveError, setUpdateSettings } from './hooks.js';

import { typeList, releaseYearRegexp } from '../../constants/movies.js';

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    director: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: typeList,
        default: "film",
        required: true,
    },
    releaseYear: {
        type: Number,
        // match: releaseYearRegexp,
    },
}, {versionKey: false, timestamps: true});

export const sortByListMovie = ["title", "director",  "type", "releaseYear"];

movieSchema.post("save", handleSaveError);

movieSchema.pre("findOneAndUpdate", setUpdateSettings);

movieSchema.post("findOneAndUpdate", handleSaveError);

const MovieCollection = model("movie", movieSchema);

export default MovieCollection;
