import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { swaggerUi, specs } from "./config/swagger";
import connectDB from "./config/db";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

connectDB();

// mongoose
//   .connect(
//     process.env.MONGO_URI as string,
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     } as ConnectOptions
//   )
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("Could not connect to MongoDB", err));

import authRoutes from "./routes/auth";
import postRoutes from "./routes/posts";

app.use("/api/auth", authRoutes);
app.use("/api", postRoutes);

// Swagger UI setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(3000, () => {
  console.log("Server running on port 3000");
  console.log("Waiting DB Connection..");
});
