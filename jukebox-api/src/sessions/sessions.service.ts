import { ISessionsService } from "./isessionsService.interface.js";
import socket from "../socket.js";
export class SessionsService implements ISessionsService
{
    DoesSessionExist(sessionId: string): boolean {
        const room = socket.getInstance().of("/").adapter.rooms.get(sessionId);    
        return room;
    }
}
