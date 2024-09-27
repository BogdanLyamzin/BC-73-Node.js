import {readSongs} from "../../utils/songs/readSongs.js";

export const countSongs = async ()=> ((await readSongs()).length);

console.log(await countSongs());