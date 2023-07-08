import * as dotenv from "dotenv"
import express from "express"
import cors from "cors"
import helmet from "helmet"
import http from 'http'

import developerAuthRouter from "./auth/apple/developer/developer.controller"

dotenv.config();
if (process.env.NODE_ENV === "local") {
  dotenv.config({ path: `.env.local`, override: true });
}

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const corsOptions = {
  origin: process.env.CORS_ALLOWED_ORIGINS?.split(',')
};

console.log(`CORS: ${JSON.stringify(corsOptions)}`)

const app = express();
const server = http.createServer(app);

// Configure express
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/auth/apple/developer", developerAuthRouter);

// Initialize web sockets for group sessions
require('./socket').init(server); 

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});