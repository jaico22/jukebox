import { Socket } from "socket.io";
import ISocketReceiver from "../ISocketReceiver.js";
import { QueueSongPayload } from "./models/QueueSongPayload.js";
import io from "../socket.js"

class QueueNextSocketReceiver implements ISocketReceiver {
    MessageId: string;
    
    constructor() {
        this.MessageId = "QueueLast"
    }

    ReceiveMessage(socket: Socket, payload: QueueSongPayload) {
        io.getInstance().to(payload.queueId).emit("LastSong", payload.song.id);       
    };
}

export default new QueueNextSocketReceiver();