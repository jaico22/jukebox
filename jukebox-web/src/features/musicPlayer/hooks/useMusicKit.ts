import { useEffect, useMemo } from "react";
import { useDispatch } from 'react-redux'
import { IMusicPlayer } from "../models/IMusicPlayer";
import { useJukeBoxApi } from "../../../hooks/jukeBoxApi/useJukeBoxApi";
import {  LibraryResponseData } from "../models/apple/libraryResponse";
import { Song } from "../models/song";
import { setCurrentSong, setIsPlaying, setIsReady, setQueue } from "../musicPlayerSlice";
import { DeveloperTokenResponse } from "../../../hooks/jukeBoxApi/models/responses/developerTokenResponse";
import { apiRoutes } from "../../../hooks/jukeBoxApi/routes";
import JukeBoxApi from "../../../hooks/jukeBoxApi/models/JukeBoxApi";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { MediaItem } from "../models/apple/mediaItem";
import { SearchResponse } from "../models/apple/searchResponse";

const musicKitItemToSong = (item: MediaItem) => {
    return {
        name: item?.attributes?.name,
        albumName: item?.attributes?.albumName,
        durationMs: item?.attributes?.durationInMillis,
        albumCoverUrl: item?.attributes?.artwork?.url,
        artist: item?.attributes?.artistName,
        id: item?.id
    }
}

class MusicKit implements IMusicPlayer {
    instance: any | undefined;
    dispatch: Dispatch<AnyAction>;
    userLibrarySize: number | undefined;
    debugId: string;

    constructor(dispatch: Dispatch<AnyAction>) {
        this.dispatch = dispatch;
        this.debugId = this.makeid(10);
    }

    init(jukeBoxApi: JukeBoxApi) {
        jukeBoxApi.Post<DeveloperTokenResponse>(apiRoutes.Auth.Apple.Developer).then(resp => {
            const musicKit = (window as any).MusicKit;
            musicKit.configure({
                developerToken: resp.data?.token,
                app: {
                    name: "Juke Box",
                    build: 'pre-alpha-0'
                }
            }).then(() => {
                this.instance = musicKit.getInstance();
                this._registerListeners();
                this.dispatch(setIsReady(true));
            })
        });
    }

    _registerListeners(): void {
        this.instance.addEventListener('nowPlayingItemDidChange', (item: any) => {
            this.dispatch(setCurrentSong(musicKitItemToSong(item.item)))
            this._getRandomSong().then(song => {
                this.instance.playLater({ song: song.id })
            })
        })
        this.instance.addEventListener('queueItemsDidChange', () => {
            this.updateQueue();
        })
    }

    makeid(length : number) : string {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
        }
        return result;
    }

    async play(): Promise<void> {
        this.dispatch(setIsPlaying(true))
        await this.instance?.play();
    }

    async pause(): Promise<void> {
        this.dispatch(setIsPlaying(false));
        await this.instance?.pause();
    }

    async authorize(): Promise<void> {
        const res = await this.instance?.authorize();
        this._registerListeners();
        return res;
    }

    async playNext(songId: string): Promise<void> {
        await this.instance?.playNext({song: songId});
    }

    async initializeQueue(): Promise<void> {        
        var response = await this.callApi<LibraryResponseData>("v1/me/library/songs?limit=1")
        if (response)
        {
            this.userLibrarySize = response.meta.total
            for (let i = 0; i < 5; i++){
                const song = await this._getRandomSong();
                this.instance.playLater({ song: song.id })
            }          
        }
    }
        
    getQueue(): Song[] {
        if (!this.instance)
            return [];
        return this.instance.queue.items;
    }

    async skip(): Promise<void> {
        await this.instance.skipToNextItem()
    }

    async previous(): Promise<void> {
        await this.instance.skipToPreviousItem()
    }

    async _getRandomSong(): Promise<Song> {
        const songIndex = Math.floor(Math.random() * (this.userLibrarySize ?? 1));
        const response = await this.callApi<LibraryResponseData>(`v1/me/library/songs?limit=1&offset=${songIndex}`);
        return musicKitItemToSong(response.data[0]);
    }

    async playLast(songId: string) {
        this.instance.playLater({ song: songId })
    }

    async search(query: string) {
        var response = await this.callApi<SearchResponse>(`v1/catalog/${this.instance.storefrontId}/search?term=${query}&types=songs`);
        return response.results.songs.data.map(d => musicKitItemToSong(d));
    }

    private async callApi<T>(route: string) : Promise<T> {
        var response = await fetch(`https://api.music.apple.com/${route}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${this.instance.developerToken}`,
                "media-user-token": this.instance.musicUserToken
            }
        });
        return await response.json() as T;
    }

    private updateQueue() {
        const startIndex = Math.max(0, this.instance.queue.position);
        const items = this.instance.queue.items.slice(startIndex, startIndex + 5);
        this.dispatch(setQueue(items.map((i : MediaItem) => musicKitItemToSong(i))))
    }
}


export function useMusicKit(): IMusicPlayer {
    const jukeBoxApi = useJukeBoxApi();

    const dispatch = useDispatch();
    

    const musicKit = useMemo(() => new MusicKit(dispatch), [dispatch]);

    useEffect(() => {
        if ((window as any).MusicKit && !musicKit.instance) {
            musicKit.init(jukeBoxApi);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [(window as any).MusicKit, jukeBoxApi, musicKit]);

    useEffect(() => {
        window.addEventListener('musickitloaded', function () {
            musicKit.init(jukeBoxApi);
        })
    });

    return musicKit;
}