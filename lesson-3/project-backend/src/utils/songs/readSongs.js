import * as fs from "node:fs/promises";

import {PATH_DB_SONGS} from "../../constants/songs.js";

export const readSongs = async ()=> {
    const data = await fs.readFile(PATH_DB_SONGS, "utf-8");
    return JSON.parse(data);
};