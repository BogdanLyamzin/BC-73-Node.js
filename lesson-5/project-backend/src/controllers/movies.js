import createHttpError from "http-errors";

import * as movieServices from "../services/movies.js";

export const getMoviesController = async (req, res)=> {
    const data = await movieServices.getMovies();

    res.json({
        status: 200,
        message: "Successfully get movies",
        data,
    });
};

export const getMovieByIdController = async(req, res)=> {
    const {id} = req.params;
    const data = await movieServices.getMovieById(id);

    if(!data) {
        throw createHttpError(404, `Movie with id=${id} not found`);
    }

    res.json({
        status: 200,
        message: `Movie with id=${id} get successfully`,
        data,
    });
};