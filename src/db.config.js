import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

export const pool = mysql.createPool({
    host: process.env.DB_HOST, // mysql의 hostname
    user: process.env.DB_USER, // user 이름
    port: process.env.DB_PORT, // 포트 번호
    database: process.env.DB_NAME, // 데이터베이스 이름
    password: process.env.DB_PASSWORD, // 비밀번호
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
  
  export const prisma = new PrismaClient({ log: ["query"] });