import express from "express";
import cors from "cors";
import pino from "pino-http";

import * as movieServices from "./services/movies.js";

import { env } from "./utils/env.js";

const logger = pino({
    transport: {
        target: "pino-pretty"
    }
});

export const startServer = ()=>{
    const app = express();

    app.use(cors());
    // app.use(logger);

    app.get("/movies", async (req, res)=> {
        const data = await movieServices.getMovies();

        res.json({
            status: 200,
            message: "Successfully get movies",
            data,
        });
    });

    app.get("/movies/:id", async(req, res)=> {
        const {id} = req.params;
        const data = await movieServices.getMovieById(id);

        if(!data) {
           return res.status(404).json({
                status: 404,
                message: `Movie with id=${id} not found`,
            });
        }

        res.json({
            status: 200,
            message: `Movie with id=${id} get successfully`,
            data,
        });
    });

    app.use((req, res)=> {
        res.status(404).json({
            message: `${req.url} not found`
        });
    });

    app.use((error, req, res, next)=> {
        res.status(500).json({
            message: error.message,
        });
    });

    const port = Number(env("PORT", 3000));

    app.listen(port, ()=> console.log(`Server running on ${port} port`));
};