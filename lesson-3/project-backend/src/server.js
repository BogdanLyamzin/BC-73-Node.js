import express from "express";
import cors from "cors";
import pino from "pino-http";

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

    app.get("/", (req, res)=> {
        res.json({
            message: "Welcome to server"
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