import express from "express";
import { QueueService } from "./queue.service";
import { IQueueService } from "./queue.service.interface";

const router = express.Router();

router.post("/:queueId", async (req, res, next) => { 
    try {
        const queueId = req.params.queueId;
        const songId = req.query.songId as string;

        if (!songId || !queueId) {
            res.status(400).send();
            return;
        }
        const queueService: IQueueService = new QueueService();
        queueService.QueueSong(queueId, songId);

        res.status(200).send();
        next();       
    } catch (ex : any) {
        res.status(500).send(ex.message)
    }

});

export default router;