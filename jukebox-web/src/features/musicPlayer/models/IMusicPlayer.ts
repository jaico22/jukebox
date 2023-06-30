import { Song } from "./song";

export interface IMusicPlayer {
    play(): Promise<void>;
    pause(): void;
    authorize(): Promise<void>;
    playNext(songId: string): Promise<void>;
    playLast(songId: string): Promise<void>;
    initializeQueue(): Promise<void>;
    skip(): Promise<void>;
    previous(): Promise<void>;
    search(query: string): Promise<Song[]>;
}