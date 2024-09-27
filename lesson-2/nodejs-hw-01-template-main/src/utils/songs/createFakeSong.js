import { faker } from "@faker-js/faker";

export const createFakeSong = ()=> ({
    id: faker.string.uuid(),
    artist: faker.music.artist(),
    album: faker.music.album(),
    songName: faker.music.songName(),
});