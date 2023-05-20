import { IQueueService } from "./queue.service.interface";

export class QueueService implements IQueueService {
    QueueSong(queueId: string, songId: string): void {
        const io = require("../socket");
        io.getInstance().to(queueId).emit("newSong", songId);
    }
}