import { Song } from "./Song.js"

export type QueueSongPayload = {
    queueId: string,
    song: Song
}