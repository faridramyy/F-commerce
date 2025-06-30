import dotenv from "dotenv";
dotenv.config();

const secrets = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || "development",

  mongo: {
    uri: process.env.MONGO_URI,
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASS,
    dbName: process.env.MONGO_DB_NAME,
  },

  jwt: {
    accessTokenSecret: process.env.JWT_SECRET,
    accessTokenExpiresIn: process.env.JWT_EXPIRES_IN || "1d",
    refreshTokenSecret: process.env.JWT_REFRESH_SECRET,
    refreshTokenExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  },

  email: {
    service: process.env.EMAIL_SERVICE,
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    from: process.env.EMAIL_FROM,
  },

  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10),
    max: parseInt(process.env.RATE_LIMIT_MAX, 10),
  },

  uploads: {
    maxFileSizeMB: parseInt(process.env.MAX_FILE_SIZE_MB, 10),
    dir: process.env.UPLOADS_DIR || "uploads",
  },

  security: {
    corsOrigin: process.env.CORS_ORIGIN,
    secureCookies: process.env.SECURE_COOKIES === "true",
    sessionSecret: process.env.SESSION_SECRET,
  },

  app: {
    name: process.env.APP_NAME,
    url: process.env.APP_URL,
  },
};

export default secrets;
