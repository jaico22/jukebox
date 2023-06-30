import { ArtWork } from "./artwork"

export type SongAttributes = {
    artistName: string,
    albumName: string,
    durationInMillis: number,
    artwork: ArtWork,
    name: string
}