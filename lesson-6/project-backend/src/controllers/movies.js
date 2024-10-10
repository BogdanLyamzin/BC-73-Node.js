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

export const addMovieController = async(req, res)=>{
    const data = await movieServices.addMovie(req.body);

    res.status(201).json({
        status: 201,
        message: "Movie add successfully",
        data,
    });
};

export const upsertMovieController = async(req, res)=> {
    const {id} = req.params;
    const {data, isNew} = await movieServices.updateMovieById(id, req.body, {upsert: true});

    const status = isNew ? 201 : 200;

    res.status(status).json({
        status,
        message: "Movie upsert successfully",
        data,
    });
};

export const patchMovieController = async(req, res)=> {
    const {id} = req.params;
    const result = await movieServices.updateMovieById(id, req.body);

    if(!result) {
        throw createHttpError(404, `Movie with id=${id} not found`);
    }

    res.json({
        status: 200,
        message: "Movie patch successfully",
        data: result.data,
    });
};

export const deleteMovieController = async(req, res)=> {
    const {id} = req.params;
    const data = await movieServices.deleteMovieById(id);

    if(!data) {
        throw createHttpError(404, `Movie with id=${id} not found`);
    }

    res.status(204).send();
};