import { useContext } from "react";
import { MusicPlayerContext } from "../MusicPlayerProvider";

export const useMusicPlayer = () => useContext(MusicPlayerContext);