// const express = require('express')  // -> CommonJS

// cors
import cors from "cors";
import dotenv from "dotenv";

// ES Module
import express from "express";

//swagger
import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";

// controllers
import { handleUserRegister } from "./controllers/user.controller.js";
import { handleAddStore } from "./controllers/store.controller.js"
import { handleAddReview, handleGetUserReview } from "./controllers/review.controller.js";
import { handleAddMission } from "./controllers/mission.controller.js"
import { handleOngoingMission, handleGetStoreMission, handleGetUserOngoingMission } from "./controllers/mission.controller.js"

import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import session from "express-session";
import passport from "passport";
import { googleStrategy } from "./oauth.config.js";
import { prisma } from "./db.config.js";


dotenv.config();

passport.use(googleStrategy);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

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


// swagger - 접속 url : http://localhost:3000/docs/#
app.use(
  "/docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup({}, {
    swaggerOptions: {
      url: "/openapi.json",
    },
  })
);

app.get("/openapi.json", async (req, res, next) => {
  // #swagger.ignore = true
  const options = {
    openapi: "3.0.0",
    disableLogs: true,
    writeOutputFile: false,
  };
  const outputFile = "/dev/null"; // 파일 출력은 사용하지 않습니다.
  const routes = ["./src/index.js"];
  const doc = {
    info: {
      title: "UMC 7th",
      description: "UMC 7th Node.js 테스트 프로젝트입니다.",
    },
    host: "localhost:3000",
  };

  const result = await swaggerAutogen(options)(outputFile, routes, doc);
  res.json(result ? result.data : null);
});


// cors 방식 허용
// Case1 'Access-Control-Allow-Origin' header..' 특정 프론트엔드 주소 허용 시 : {origin: ["<프론트엔드_주소_및_포트>"],} 처럼 설정해준다.
// Case2 'Request header field x-auth-token..' 프론트 엔드에서 보내는 header 정보 확인 : {allowedHeaders: ["x-auth-token", ...],}
app.use(cors());

// express
app.use(express.static('public'));          // 정적 파일 접근
app.use(express.json());                    // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석


app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, // ms : 주기적으로 만료된 세션 삭제
      dbRecordIdIsSessionId: true, // 세션 ID를 데이터베이스 레코드 ID로 사용
      dbRecordIdFunction: undefined,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());


// // API 설정
app.get('/', (req, res) => {
  // #swagger.ignore = true
  res.send('Hello UMC Sooni!');
});

// 인증
app.get("/oauth2/login/google", passport.authenticate("google"));
app.get(
  "/oauth2/callback/google",
  passport.authenticate("google", {
    failureRedirect: "/oauth2/login/google",
    failureMessage: true,
  }),
  (req, res) => {
    res.redirect("/");
  }
);

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
  console.error(`[${new Date().toISOString()}] Error:`, err); // 모든 에러 기록
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