import { createContext, useEffect } from "react";
import { IGroupSession } from "./models/IGroupSession";
import { socket } from './../../socket'
import { useDispatch, useSelector } from "react-redux";
import { setIsConnected, setQueue, setSessionId } from "./groupSessionSlice";
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
    const sessionState = useSelector((state: RootState) => state.groupSession);

    useEffect(() => {
        (window as any).disconnectSession = () => {
            if (!sessionState.isGuest && sessionState.sessionId) {
                socket.emit("CloseSession", {
                    sessionId: sessionState.sessionId
                })        
            }
        }
    }, [sessionState.sessionId, sessionState.isGuest])

    useEffect(() => {
        window.addEventListener("beforeunload", (e) => {
            (window as any).disconnectSession();
        }, false)
    }, [])

    useEffect(() => {
        function onConnect() {
            dispatch(setIsConnected(true))
        }

        function onDisconnect() {
            if (!sessionState.isGuest) {
                socket.emit("CloseSession", {
                    sessionId: sessionState.sessionId
                })
            }
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

        function onSessionEnd() {
            dispatch(setIsConnected(false));
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('NextSong', onNextSong);
        socket.on("QueueSyncRequest", onQueueSyncRequest);
        socket.on("QueueUpdate", onQueueUpdate);
        socket.on("LastSong", onLastSong);
        socket.on("SessionEnded", onSessionEnd);

        socket.connect();
        
        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('NextSong', onNextSong);
            socket.off('QueueSyncRequest', onQueueSyncRequest);
            socket.off('QueueUpdate', onQueueUpdate);
            socket.off('LastSong', onLastSong);
            socket.off('SessionEnded', onSessionEnd)
        };
    }, [dispatch, musicPlayer, musicPlayerState.queue]);

    useEffect(() => {
        socket.emit("QueueChange", {
            sessionId: sessionState.sessionId,
            queue: musicPlayerState.queue
        })
    }, [musicPlayerState.queue])

    const groupSession: IGroupSession = {
        groupSessionId: sessionState.sessionId,

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
        },

        joinSession: function(sessionId: string) {
            socket.emit("JoinSession", {
                sessionId: sessionId
            });
            dispatch(setSessionId(sessionId));
        },

        closeSession: function () {
            socket.emit("CloseSession", {
                sessionId: sessionState.sessionId
            });
        }
    }
    
    return <GroupSessionContext.Provider value={groupSession}>{props.children}</GroupSessionContext.Provider>
}

export { GroupSessionProvider }
