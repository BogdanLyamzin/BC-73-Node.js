import {writeSongs} from "../../utils/songs/writeSongs.js";

export const removeAllSongs = async ()=> await writeSongs([]);

removeAllSongs();