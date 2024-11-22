import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as KakaoStrategy } from "passport-kakao";
import { prisma } from "./db.config.js";

dotenv.config();

// 구글 로그인
export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID,
    clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/oauth2/callback/google",
    scope: ["email", "profile"],
    state: true,
  },
  (accessToken, refreshToken, profile, cb) => {
    return googleVerify(profile)
      .then((user) => cb(null, user))
      .catch((err) => cb(err));
  }
);

const googleVerify = async (profile) => {
    const email = profile.emails?.[0]?.value;
    if (!email) {
      throw new Error(`profile.email was not found: ${profile}`);
    }
  
    const user = await prisma.user.findFirst({ where: { email } });
    if (user !== null) {
      return { id: user.id, email: user.email, name: user.name };
    }
  
    const created = await prisma.user.create({
      data: {
        email,
        name: profile.displayName,
        gender: profile.gender || 2, // 기본값 설정
        birthDate: profile.birthDate || new Date().toISOString().split("T")[0],
        address: profile.address || "Unknown",    // 기본값 설정
        phoneNum: profile.phoneNum || "N/A",     // 기본값 설정
        password: "staticpassword",
      },
    });
  
    return { id: created.id, email: created.email, name: created.name };
  };

 
  // 카카오 로그인
  export const kakaoStrategy = new KakaoStrategy(
    {
      clientID: process.env.PASSPORT_KAKAO_CLIENT_ID, // 카카오 앱의 client ID
      clientSecret: process.env.PASSPORT_KAKAO_CLIENT_SECRET, // 카카오 앱의 client secret (선택적)
      callbackURL: "http://localhost:3000/oauth2/callback/kakao", // 콜백 URL
    },
    (accessToken, refreshToken, profile, done) => {
      return kakaoVerify(profile)
        .then((user) => done(null, user))
        .catch((err) => done(err));
    }
  );
  
  const kakaoVerify = async (profile) => {
    // 카카오 프로필에서 이메일을 가져오는 경우, 없을 수 있음
    const kakaoId = String(profile.id);  // 카카오에서 제공하는 고유 ID

    // 이메일이 없는 경우
    const email = profile._json.kakao_account.email || "unknown"; // 이메일이 없을 수 있음


    const user = await prisma.user.findFirst({ where: { kakaoId } });
    if (user !== null) {
      return { id: user.id, name: user.name, kakaoId: user.kakaoId };
    }
  
    const created = await prisma.user.create({
      data: {
        kakaoId,
        email,
        name: profile.displayName, // 카카오에서 가져온 닉네임 사용
        gender: profile.gender || 2, // 기본값 설정
        birthDate: profile.birthDate || new Date().toISOString().split("T")[0],
        address: profile.address || "Unknown",
        phoneNum: profile.phoneNum || "Unknown",
        password: "staticpassword", // 비밀번호는 임시로 설정
      },
    });
  
    return { id: created.id, name: created.name, kakaoId: created.kakaoId };
  };