import { MediaItem } from "./mediaItem"

export type LibraryMetaData = {
    total: number
}

export type LibraryResponse = {
    data: LibraryResponseData
}
export type LibraryResponseData = {
    data: MediaItem[]
    meta: LibraryMetaData,
    next: string
}