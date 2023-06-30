import { createContext } from "react";
import { IMusicPlayer } from "./models/IMusicPlayer";

export const MusicPlayerContextk = createContext<IMusicPlayer | undefined>(undefined)
