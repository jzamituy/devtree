
import dotenv from 'dotenv';

const envFile = process.env.NODE_ENV === 'production' ? './env.production' : './env.local';
dotenv.config({ path: envFile });

import express from "express";
import { connectDB } from "./config/db";
import router from "./router";

const server = express();
connectDB();
server.use(express.json());
server.use(router);

export default server;
