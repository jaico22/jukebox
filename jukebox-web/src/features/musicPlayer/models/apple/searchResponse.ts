import { MediaItem } from "./mediaItem"

export type SearchResponse = {
    results: SearchResponseResults
}

export type SearchResponseResults = {
    songs: SearchResponseResultsSongs
}

export type SearchResponseResultsSongs = {
    data: MediaItem[]
}

