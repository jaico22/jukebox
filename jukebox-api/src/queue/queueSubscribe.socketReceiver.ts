import { Socket } from "socket.io";
import ISocketReceiver from "../ISocketReceiver";
import { JoinSessionPayload } from "./models/JoinSessionPayload";

class QueueSubscriberSocketReceiver implements ISocketReceiver {
    public MessageId: string;

    constructor() {
        this.MessageId = "JoinSession"
    }

    ReceiveMessage = (socket: Socket, payload: JoinSessionPayload) => {
        socket.join(`room-${payload.sessionId}`);
        const io = require("../socket");
        io.getInstance().to(payload.sessionId).emit("QueueSyncRequest", { sessionId: socket.id });
    }
}

export default new QueueSubscriberSocketReceiver();