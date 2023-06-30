import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import ISocketReceiver from "../ISocketReceiver";
import { QueueSyncPayload } from "./models/QueueSyncPayload";

class QueueSyncSocketReceiver implements ISocketReceiver {
    public MessageId: string;

    constructor() {
        this.MessageId = "QueueSync"
    }
    
    ReceiveMessage = (socket: Socket, payload: QueueSyncPayload) => {
        console.log('received')
        console.log(payload)
        const io = require("../socket");
        io.getInstance().to(payload.sessionId).emit("QueueUpdate", payload);
    }
}

export default new QueueSyncSocketReceiver();