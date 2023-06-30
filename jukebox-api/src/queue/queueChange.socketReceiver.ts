import { Socket } from "socket.io";
import ISocketReceiver from "../ISocketReceiver";
import { QueueChangePayload } from "./models/QueueChangedPayload";
import { QueueSyncPayload } from "./models/QueueSyncPayload";

class QueueSocketReceiver implements ISocketReceiver {
    public MessageId: string;

    constructor() {
        this.MessageId = "QueueChange"
    }

    ReceiveMessage = (socket: Socket, payload: QueueChangePayload) => {
        console.log('Received');
        console.log(payload)
        const io = require('../socket');
        io.getInstance().to(`room-${socket.id}`).emit("QueueUpdate", {
            queue: payload.queue
        } as QueueSyncPayload)
    };
}

export default new QueueSocketReceiver();