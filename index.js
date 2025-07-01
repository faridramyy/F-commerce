import express from "express";
import "./config/passport.js";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import expressLayouts from "express-ejs-layouts";

import secrets from "./config/secrets.js";
import connectDB from "./config/db.js";
import appRoutes from "./routes/index.js";

const app = express();
const PORT = secrets.port;

// app.use(helmet());
// app.use(cors({ origin: secrets.security.corsOrigin, credentials: true }));
// app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(
//   rateLimit({
//     windowMs: secrets.rateLimit.windowMs,
//     max: secrets.rateLimit.max,
//     standardHeaders: true,
//     legacyHeaders: false,
//   })
// );

app.set("view engine", "ejs");
app.set('layout', 'partials/layout');
app.use(expressLayouts);

app.use(express.static("public"));

app.use(appRoutes);

connectDB(() => {
  app.listen(PORT, () =>
    console.log(`${secrets.app.name} running at ${secrets.app.url}`)
  );
});
