import { Socket } from "socket.io";
import ISocketReceiver from "../ISocketReceiver.js";
import { JoinSessionPayload } from "./models/JoinSessionPayload.js";
import io from "../socket.js"

class QueueSubscriberSocketReceiver implements ISocketReceiver {
    public MessageId: string;

    constructor() {
        this.MessageId = "JoinSession"
    }

    ReceiveMessage = (socket: Socket, payload: JoinSessionPayload) => {
        socket.join(payload.sessionId);
        io.getInstance().to(payload.sessionId).emit("QueueSyncRequest", { sessionId: payload.sessionId });
    }
}

export default new QueueSubscriberSocketReceiver();