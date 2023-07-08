import { ISessionsService } from "./isessionsService.interface";

export class SessionsService implements ISessionsService
{
    DoesSessionExist(sessionId: string): boolean {
        const io = require("../socket");
        const room = io.getInstance().of("/").adapter.rooms.get(sessionId);    
        return room;
    }
}
