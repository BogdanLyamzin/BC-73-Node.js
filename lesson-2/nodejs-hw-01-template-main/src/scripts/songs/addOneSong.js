import { createFakeSong } from "../../utils/songs/createFakeSong.js";
import { readSongs } from "../../utils/songs/readSongs.js";
import { writeSongs } from "../../utils/songs/writeSongs.js";

export const addOneSong = async ()=> {
    const songList = await readSongs();
    const newSong = createFakeSong();
    // await writeSongs([...songList, newSong]);
    songList.push(newSong);
    await writeSongs(songList);
};

addOneSong();