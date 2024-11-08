import {access, mkdir} from "node:fs/promises";

export const createDirIfNotExist = async (path) => {
    try {
        await access(path);
    }
    catch(error) {
        if(error.code === "ENOENT") {
            await mkdir(path);
        }
    }
}
