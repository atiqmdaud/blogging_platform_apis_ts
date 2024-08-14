import express from "express";
import cookieParser from "cookie-parser";
import { swaggerUi, specs } from "./config/swagger";
import connectDB from "./config/db";

const app = express();

app.use(express.json());
app.use(cookieParser());

connectDB();

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
