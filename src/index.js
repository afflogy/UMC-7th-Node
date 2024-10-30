// const express = require('express')  // -> CommonJS
import cors from "cors";
import dotenv from "dotenv";
import { handleUserRegister } from "./controllers/user.controller.js";
import { handleAddStore } from "./controllers/store.controller.js"
import { handleAddReview } from "./controllers/review.controller.js";
import { handleAddMission } from "./controllers/mission.controller.js"
import { handleOngoingMission } from "./controllers/mission.controller.js"
import express from "express";          // -> ES Module

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());                            // cors 방식 허용
app.use(express.static('public'));          // 정적 파일 접근
app.use(express.json());                    // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

app.get('/', (req, res) => {
  res.send('Hello UMC Sooni!');
});

// 회원가입 API
app.post("/api/account/register", handleUserRegister);

// 가게 추가 API
app.post("/api/stores", handleAddStore);

// 가게 리뷰 추가 API
app.post("/api/stores/{storeId}/review", handleAddReview);

// 가게 미션 추가 API
app.post("/api/stores/{storeId}/mission", handleOngoingMission);

// 미션을 도전 중으로 변경 API
app.post("/api/store/{store_id}/missions/{mission_id}", handleOngoingMission);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});