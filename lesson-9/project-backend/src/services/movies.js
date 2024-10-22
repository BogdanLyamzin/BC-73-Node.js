import MovieCollection from "../db/models/Movie.js";

import { calcPaginationData } from "../utils/calcPaginationData.js";

export const getMovies = async ({page, perPage: limit, sortBy = "_id", sortOrder = "asc", filter = {}})=> {
    const skip = (page - 1) * limit;

    const moviesQuery = MovieCollection.find().skip(skip).limit(limit).sort({[sortBy]: sortOrder});

    if(filter.minReleaseYear) {
        moviesQuery.where("releaseYear").gte(filter.minReleaseYear);
    }
    if(filter.maxReleaseYear) {
        moviesQuery.where("releaseYear").lte(filter.maxReleaseYear);
    }

    const data =  await moviesQuery;
    const count = await MovieCollection.find().merge(moviesQuery).countDocuments();

    const paginationData = calcPaginationData({count, page, perPage: limit});

    return {
        page,
        perPage: limit,
        ...paginationData,
        data,
        count,
    }
};

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
