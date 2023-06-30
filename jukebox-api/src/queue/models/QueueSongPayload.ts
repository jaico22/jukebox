import { Song } from "./Song"

export type QueueSongPayload = {
    queueId: string,
    song: Song
}