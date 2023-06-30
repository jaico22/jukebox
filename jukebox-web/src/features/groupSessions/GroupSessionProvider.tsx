import { createContext, useEffect } from "react";
import { IGroupSession } from "./models/IGroupSession";
import { socket } from './../../socket'
import { useDispatch, useSelector } from "react-redux";
import { setIsConnected, setQueue } from "./groupSessionSlice";
import { useMusicPlayer } from "../musicPlayer/hooks/useMusicPlayer";
import { RootState } from "../../store";
import { QueueSyncRequestPayload } from "./models/QueueSyncRequestPayload";
import { QueueSyncPayload } from "./models/QueueSyncPayload";
import { Song } from "../musicPlayer/models/song";
import { QueueSongPayload } from "./models/QueueSongPayload";

type GroupSessionProviderProps = {
    children: JSX.Element | JSX.Element[]
}

export const GroupSessionContext = createContext<IGroupSession | undefined>(undefined)

const GroupSessionProvider = (props: GroupSessionProviderProps) => {
    const dispatch = useDispatch();
    const musicPlayer = useMusicPlayer();
    const musicPlayerState = useSelector((state: RootState) => state.musicPlayer);

    useEffect(() => {
        function onConnect() {
            dispatch(setIsConnected(true))
        }

        function onDisconnect() {
            dispatch(setIsConnected(false))
        }

        function onNextSong(value : string) {
            musicPlayer?.playNext(value)
        }

        function onLastSong(value: string) {
            musicPlayer?.playLast(value)
        }

        function onQueueSyncRequest(payload: QueueSyncRequestPayload)
        {
            socket.emit("QueueSync", {
                sessionId: payload.sessionId,
                queue: musicPlayerState.queue
            } as QueueSyncPayload)
        }

        function onQueueUpdate(payload: QueueSyncPayload)
        {
            console.log(payload);
            dispatch(setQueue(payload.queue));
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('NextSong', onNextSong);
        socket.on("QueueSyncRequest", onQueueSyncRequest);
        socket.on("QueueUpdate", onQueueUpdate);
        socket.on("LastSong", onLastSong);

        socket.connect();
        
        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('NextSong', onNextSong);
            socket.off('QueueSyncRequest', onQueueSyncRequest);
            socket.off('QueueUpdate', onQueueUpdate);
            socket.off('LastSong', onLastSong);
        };
    }, [dispatch, musicPlayer, musicPlayerState.queue]);

    useEffect(() => {
        socket.emit("QueueChange", {
            queue: musicPlayerState.queue
        })
    }, [musicPlayerState.queue])

    const groupSession: IGroupSession = {
        groupSessionId: socket.id,

        addNextSong(queueId: string, song: Song) {
            socket.emit("QueueNext", {
                queueId: queueId,
                song: song
            } as QueueSongPayload);
        },

        addLastSongSong: function (queueId: string, song: Song): void {
            socket.emit("QueueLast", {
                queueId: queueId,
                song: song
            } as QueueSongPayload);
        }
    }
    
    return <GroupSessionContext.Provider value={groupSession}>{props.children}</GroupSessionContext.Provider>
}

export { GroupSessionProvider }
