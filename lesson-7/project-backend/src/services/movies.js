import MovieCollection from "../db/models/Movie.js";

export const getMovies = ()=> MovieCollection.find();

export const getMovieById = id => MovieCollection.findById(id);

export const addMovie = payload => MovieCollection.create(payload);

export const updateMovieById = async(_id, payload, options = {})=> {
    const result = await MovieCollection.findOneAndUpdate({_id}, payload, {
        includeResultMetadata: true,
        ...options,
    });

    if(!result || !result.value) return null;

    return {
        data: result.value,
        isNew: Boolean(result.lastErrorObject.upserted),
    };
};

export const deleteMovieById = _id => MovieCollection.findOneAndDelete({_id});
