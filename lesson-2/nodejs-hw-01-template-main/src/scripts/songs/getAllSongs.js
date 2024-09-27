import {readSongs} from "../../utils/songs/readSongs.js";

export const getAllSongs = ()=> readSongs();

console.log(await getAllSongs());
