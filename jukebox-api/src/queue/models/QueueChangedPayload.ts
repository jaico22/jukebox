import { Song } from "./Song.js"

export type QueueChangePayload = {
    sessionId: string;
    queue: Song[]
}