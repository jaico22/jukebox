import * as dotenv from "dotenv"
import express from "express"
import cors from "cors"
import helmet from "helmet"
import http from 'http'

import developerAuthRouter from "./auth/apple/developer/developer.controller"
import sessionsRouter from "./sessions/sessions.controller"

dotenv.config();
if (process.env.NODE_ENV === "local") {
  dotenv.config({ path: `.env.local`, override: true });
}

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const corsOptions = {};

const app = express();
const server = http.createServer(app);

// Configure express
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/auth/apple/developer", developerAuthRouter);
app.use("/api/sessions", sessionsRouter);

// Initialize web sockets for group sessions
require('./socket').init(server); 

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});