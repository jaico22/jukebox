import { SongAttributes } from "./songAttributes";

export type MediaItem = {
    id: string,
    type: string,
    href: string,
    attributes: SongAttributes,
}