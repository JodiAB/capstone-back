import express from "express";
import { config } from "dotenv";
import cors from "cors";
import router from "./routes/items.js";
import userRouter from "./routes/user.js";
import loginRouter from "./routes/login.js";
import login from "./middleware/Auth.js";
import cookieParser from "cookie-parser";
// import authController from './controller/authController.js';

config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Request-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Expose-Headers", "Authorization");
  next();
});

app.use("/product", router);
app.use("/users", userRouter);
app.use("/login", login, loginRouter);
// app.post('/register', authController.register);

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
