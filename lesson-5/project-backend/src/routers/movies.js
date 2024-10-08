import {Router} from "express";

import { isValidId } from "../middlewares/isValidId.js";

import * as movieControllers from "../controllers/movies.js";

import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const moviesRouter = Router();

moviesRouter.get("/", ctrlWrapper(movieControllers.getMoviesController));

moviesRouter.get("/:id", isValidId, ctrlWrapper(movieControllers.getMovieByIdController));

export default moviesRouter;