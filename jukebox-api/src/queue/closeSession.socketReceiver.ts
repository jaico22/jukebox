import { Socket } from "socket.io";
import ISocketReceiver from "../ISocketReceiver.js";
import { CloseSessionPayload } from "./models/CloseSessionPayload.js";
import io from "../socket.js"

class CloseSessionReceiver implements ISocketReceiver {
    public MessageId: string;

    constructor() {
        this.MessageId = "CloseSession"
    }

    ReceiveMessage = (socket: Socket, payload: CloseSessionPayload) => {
        io.getInstance().to(payload.sessionId).emit("SessionEnded");
        io.getInstance().in(payload.sessionId).socketsLeave(payload.sessionId)
    };
}

export default new CloseSessionReceiver();