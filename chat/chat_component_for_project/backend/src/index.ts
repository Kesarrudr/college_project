import express from "express";
import UserRoter from "./routes/auth/user";
import HealthCheckRoute from "./routes/healthCheck.route";
import MessageRouter from "./routes/chat/message.router";
import RepelRouter from "./routes/create/repel.router";
import cors from "cors";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import { app, server } from "./socket/socket";
import { asyncHandler } from "./utils/asyncHandler";

dotenv.config();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3010",
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    credentials: true,
  }),
);
app.use(cookieParser());

//TODO: add login function with google and other 3 party
app.use("/api/v1/healthCheck", HealthCheckRoute);
app.use("/api/v1/user", UserRoter);
app.use("/api/v1/create", RepelRouter);
app.use("/api/v1/chat", MessageRouter);
app.use(
  "/",
  asyncHandler(async (req, res) => {
    res.status(200).json({
      message: "😂",
    });
  }),
);
server.listen(port, () => {
  console.log(`Server is running on the port ${port}`);
});
