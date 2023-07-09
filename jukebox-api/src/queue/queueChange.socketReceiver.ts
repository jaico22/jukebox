import { Socket } from "socket.io";
import ISocketReceiver from "../ISocketReceiver.js";
import { QueueChangePayload } from "./models/QueueChangedPayload.js";
import { QueueSyncPayload } from "./models/QueueSyncPayload.js";

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