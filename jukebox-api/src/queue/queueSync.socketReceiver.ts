import { Socket } from "socket.io";
import ISocketReceiver from "../ISocketReceiver.js";
import { QueueSyncPayload } from "./models/QueueSyncPayload.js";
import io from "../socket.js"

class QueueSyncSocketReceiver implements ISocketReceiver {
    public MessageId: string;

    constructor() {
        this.MessageId = "QueueSync"
    }
    
    ReceiveMessage = (socket: Socket, payload: QueueSyncPayload) => {
        io.getInstance().to(payload.sessionId).emit("QueueUpdate", payload);
    }
}

export default new QueueSyncSocketReceiver();