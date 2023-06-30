import { Song } from "../../musicPlayer/models/song"

export type QueueSongPayload = {
    queueId: string,
    song: Song
}