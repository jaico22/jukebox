import { Song } from "./Song"

export type QueueSyncPayload = {
    sessionId: string,
    queue: Song[]
}