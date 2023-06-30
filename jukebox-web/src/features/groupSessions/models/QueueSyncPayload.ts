import { Song } from "../../musicPlayer/models/song"

export type QueueSyncPayload = {
    sessionId: string,
    queue: Song[]
}