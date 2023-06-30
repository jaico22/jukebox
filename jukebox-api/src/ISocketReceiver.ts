import { Socket } from "socket.io";

export default interface ISocketReceiver {
    MessageId: string;
    ReceiveMessage: (socket: Socket, payload: any) => void;
}