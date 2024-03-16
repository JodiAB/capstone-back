import express from "express";
import { config } from "dotenv";
import cors from "cors";
import router from "./routes/items.js";
import userRouter from "./routes/user.js";
import loginRouter from "./routes/login.js";
import login from "./middleware/Auth.js";
import cookieParser from "cookie-parser";

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

// Routes
app.use("/product", router);
app.use("/user", userRouter); // Use "/user" instead of "/users"
app.use("/login", login, loginRouter);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
