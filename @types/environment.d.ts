namespace NodeJS {
    interface ProcessEnv extends NodeJS.PreocessEnv {
        PORT: string;
        DATABASE_URL: string;
        EXPRESS_SESSION_SECRET: string;
        PASSPROT_GOOGLE_CLIENT_ID: string;
        PASSPROT_GOOGLE_CLIENT_SECRET: string;
        PASSPORT_KAKAO_CLIENT_ID: string;
        PASSPORT_KAKAO_CLIENT_SECRET: string;
    }
}