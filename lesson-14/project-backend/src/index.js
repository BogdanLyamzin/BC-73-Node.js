import { initMongoDB } from "./db/ininMongoDB.js";
import { startServer } from "./server.js";
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from "./constants/index.js";
import { createDirIfNotExist } from "./utils/createDirIfNotExist.js";

const boostrap = async ()=>{
    await initMongoDB();
    await createDirIfNotExist(TEMP_UPLOAD_DIR);
    await createDirIfNotExist(UPLOAD_DIR);
    startServer();
};

boostrap();
