let io: any;

module.exports = {
    init: (httpServer : any) => {
        io = require('socket.io')(httpServer);
        return io;
    },
    getInstance: () => {
        if (!io) {
            throw new Error("Sockie.io is not initalized")
        }
        return io;
    }
}