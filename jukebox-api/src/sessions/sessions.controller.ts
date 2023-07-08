import express from "express";
import { ISessionsService } from "./isessionsService.interface";
import { SessionsService } from "./sessions.service";
import { GetSessionResponse } from "./models/getSessionResponse";

const router = express.Router();

router.get("/:sessionId", async (req, res, next) => {
    try {
        const sessionId = req.params.sessionId;
        const sessionsService : ISessionsService = new SessionsService();
        res.status(200).send({
            isSessionActive: sessionsService.DoesSessionExist(sessionId)
        } as GetSessionResponse);
        next();
    } catch (ex: any) {
        console.error(ex)
        res.status(500).send(ex.message);
    }
});

export default router;