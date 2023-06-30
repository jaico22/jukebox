import { Song } from "../../musicPlayer/models/song";

export interface IGroupSession {
    groupSessionId: string;
    addNextSong: (queuId: string, song: Song) => void;
    addLastSongSong: (queuId: string, song: Song) => void;
}