import { initMongoDB } from "./db/ininMongoDB.js";
import { startServer } from "./server.js";

const boostrap = async ()=>{
    await initMongoDB();
    startServer();
};

boostrap();