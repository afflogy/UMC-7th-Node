// const express = require('express')  // -> CommonJS
import cors from "cors";
import dotenv from "dotenv";
import { handleUserRegister } from "./controllers/user.controller.js";
import { handleAddStore } from "./controllers/store.controller.js"
import { handleAddReview, handleGetUserReview } from "./controllers/review.controller.js";
import { handleAddMission } from "./controllers/mission.controller.js"
import { handleOngoingMission, handleGetStoreMission, handleGetUserOngoingMission } from "./controllers/mission.controller.js"
import express from "express";          // -> ES Module

dotenv.config();

const app = express();
const port = process.env.PORT;


/**
 * 공통 응답을 사용할 수 있는 헬퍼 함수 등록
 */
app.use((req, res, next) => {

  res.create = (create) => {
    return res.json({
      resultType: "CREATE",
      error: null,
      create});
  };

  res.success = (success) => {
    return res.json({ 
      resultType: "SUCCESS", 
      error: null, 
      success });
  };

  res.error = ({ 
    errorCode = "unknown", 
    reason = null, 
    data = null }) => {
    
      return res.json({
      resultType: "FAIL",
      error: { errorCode, reason, data },
      success: null,
    });
  };

  next();
});


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
app.post("/api/stores/:storeId/review/:userId", handleAddReview);

// 가게 미션 추가 API
app.post("/api/stores/:storeId/mission", handleAddMission);

// 미션을 도전 중으로 변경 API
app.post("/api/users/:userId/missions/:missionId", handleOngoingMission);

// 사용자 리뷰 조회 API
app.get("/api/users/:userId/review", handleGetUserReview);

// 특정 가게 미션 목록 조회 API
app.get("/api/stores/:storeId/mission", handleGetStoreMission);

// 내가 진행 중인 미션 목록 조회 API
app.get("/api/users/:userId/mission/:state", handleGetUserOngoingMission);



/**
 * 전역 오류를 처리하기 위한 미들웨어
 */
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 500).error({
    errorCode: err.errorCode || "unknown",
    reason: err.reason || err.message || null,
    data: err.data || null,
  });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});