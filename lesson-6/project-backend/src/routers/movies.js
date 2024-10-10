import {Router} from "express";

import { isValidId } from "../middlewares/isValidId.js";

import * as movieControllers from "../controllers/movies.js";

import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const moviesRouter = Router();

moviesRouter.get("/", ctrlWrapper(movieControllers.getMoviesController));

moviesRouter.get("/:id", isValidId, ctrlWrapper(movieControllers.getMovieByIdController));

moviesRouter.post("/", ctrlWrapper(movieControllers.addMovieController));

moviesRouter.put("/:id", ctrlWrapper(movieControllers.upsertMovieController));

moviesRouter.patch("/:id", ctrlWrapper(movieControllers.patchMovieController));

moviesRouter.delete("/:id", ctrlWrapper(movieControllers.deleteMovieController));

export default moviesRouter;