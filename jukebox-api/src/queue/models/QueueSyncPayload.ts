import { Song } from "./Song.js"

export type QueueSyncPayload = {
    sessionId: string,
    queue: Song[]
}