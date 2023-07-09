import { Socket, Server } from "socket.io";
import ISocketReceiver from "./ISocketReceiver.js";
import { readdir } from "fs/promises";
import { resolve } from "path";

let io: any;

const socket = {
    init: (httpServer : any) => {
        io = new Server(httpServer);
        io.on('error', (err: any) => console.log('error', err));
        io.on("connection", (socket: Socket) => {
            console.log(`New connection: ${socket.id}`);
            registerSocketReceivers(socket);
        })
        return io;
    },
    getInstance: () => {
        if (!io) {
            throw new Error("Sockie.io is not initalized")
        }
        return io;
    }
}

async function registerSocketReceivers(socket : Socket): Promise<void>
{    
    for await (const file of getFiles('.')) {
        if (file.endsWith('.socketReceiver.js') || file.endsWith('.socketReceiver.ts')) {
          const receiver = (await import(file)) as ISocketReceiver;
          socket.on(receiver.MessageId, (arg: any) => receiver.ReceiveMessage(socket, arg))
        }
    }
}

async function* getFiles(dir: string) : AsyncGenerator<string, any, undefined> {
  const dirents = await readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = resolve(dir, dirent.name) as string;
    if (dirent.isDirectory()) {
      yield* getFiles(res);
    } else if (res) {
      yield res;
    }
  }
}

export default socket;