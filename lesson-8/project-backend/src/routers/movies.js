import {Router} from "express";

import { isValidId } from "../middlewares/isValidId.js";
import { parsePaginationParams } from "../middlewares/parsePaginationParams.js";
import { parseSortParamsDecorator } from "../utils/parseSortParamsDecorator.js";

import { sortByListMovie } from "../db/models/Movie.js";

import * as movieControllers from "../controllers/movies.js";

import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../utils/validateBody.js";

import {movieAddSchema, movieUpdateSchema} from "../validation/movies.js";

const moviesRouter = Router();

moviesRouter.get("/", parsePaginationParams, parseSortParamsDecorator(sortByListMovie), ctrlWrapper(movieControllers.getMoviesController));

moviesRouter.get("/:id", isValidId, ctrlWrapper(movieControllers.getMovieByIdController));

moviesRouter.post("/", validateBody(movieAddSchema), ctrlWrapper(movieControllers.addMovieController));

moviesRouter.put("/:id", isValidId, validateBody(movieAddSchema), ctrlWrapper(movieControllers.upsertMovieController));

moviesRouter.patch("/:id", isValidId, validateBody(movieUpdateSchema), ctrlWrapper(movieControllers.patchMovieController));

moviesRouter.delete("/:id", isValidId, ctrlWrapper(movieControllers.deleteMovieController));

export default moviesRouter;