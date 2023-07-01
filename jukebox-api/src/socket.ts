import { Socket } from "socket.io";
import ISocketReceiver from "./ISocketReceiver";

let io: any;

module.exports = {
    init: (httpServer : any) => {
        io = require('socket.io')(httpServer);
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
        if (file.endsWith('.socketReceiver.ts')) {
          const receiver = require(file).default as ISocketReceiver;
          socket.on(receiver.MessageId, (arg) => receiver.ReceiveMessage(socket, arg))
        }
    }
}

const { resolve } = require('path');
const { readdir } = require('fs').promises;

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