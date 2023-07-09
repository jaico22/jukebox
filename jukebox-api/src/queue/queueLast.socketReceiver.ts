import { Socket } from "socket.io";
import ISocketReceiver from "../ISocketReceiver.js";
import { QueueSongPayload } from "./models/QueueSongPayload.js";

class QueueNextSocketReceiver implements ISocketReceiver {
    MessageId: string;
    
    constructor() {
        this.MessageId = "QueueLast"
    }

    ReceiveMessage(socket: Socket, payload: QueueSongPayload) {
        console.log(payload)
        const io = require("../socket");
        io.getInstance().to(payload.queueId).emit("LastSong", payload.song.id);       
    };
}

export default new QueueNextSocketReceiver();