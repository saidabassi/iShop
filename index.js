import cors from "cors";
import express from "express";
const app = express();
import connectDB from "./DB.js";
import authRouter from "./Routes/userRoute.js";
import productRouter from "./Routes/productRoute.js";
import "express-async-errors";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import notFoundMidlleware from "./middleware/not-found.js";
import morgan from "morgan";
import authenticateUser from './middleware/auth.js'

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
//function connect to DB
connectDB();
app.use(cors());
// json
app.use(express.json());
// dummy page
app.get("/", (req, res) => {
  // throw new Error('error')
  res.json({ msg: "API" });
});

//Routes
app.use("/api/user", authRouter);
app.use("/api/products", authenticateUser,productRouter);

// error middleware
app.use(notFoundMidlleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
