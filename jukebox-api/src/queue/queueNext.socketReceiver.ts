import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import ISocketReceiver from "../ISocketReceiver";
import { QueueSongPayload } from "./models/QueueSongPayload";

class QueueNextSocketReceiver implements ISocketReceiver {
    MessageId: string;
    
    constructor() {
        this.MessageId = "QueueNext"
    }

    ReceiveMessage(socket: Socket, payload: QueueSongPayload) {
        console.log(payload)
        const io = require("../socket");
        io.getInstance().to(payload.queueId).emit("NextSong", payload.song.id);       
    };
}

export default new QueueNextSocketReceiver();