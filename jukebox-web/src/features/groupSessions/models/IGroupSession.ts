import { Song } from "../../musicPlayer/models/song";

export interface IGroupSession {
    groupSessionId: string | undefined;
    addNextSong: (queuId: string, song: Song) => void;
    addLastSongSong: (queuId: string, song: Song) => void;
    joinSession: (sessionId: string) => void;
    closeSession: () => void;
}