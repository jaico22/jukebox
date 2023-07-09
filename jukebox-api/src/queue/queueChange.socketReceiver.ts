import { Socket } from "socket.io";
import ISocketReceiver from "../ISocketReceiver.js";
import { QueueChangePayload } from "./models/QueueChangedPayload.js";
import { QueueSyncPayload } from "./models/QueueSyncPayload.js";
import io from "../socket.js"

class QueueSocketReceiver implements ISocketReceiver {
    public MessageId: string;

    constructor() {
        this.MessageId = "QueueChange"
    }

    ReceiveMessage = (socket: Socket, payload: QueueChangePayload) => {
        io.getInstance().to(payload.sessionId).emit("QueueUpdate", {
            queue: payload.queue
        } as QueueSyncPayload)
    };
}

export default new QueueSocketReceiver();