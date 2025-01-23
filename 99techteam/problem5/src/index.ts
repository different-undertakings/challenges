import dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";

import cors from "cors";
import router from "./routes/resource.route";
import logger from "./infra/logger";
import errorHandler from "./middlewares/error-handler.middleware";

const app = express();
const port = process.env.PORT;

app.use(morgan(process.env.ENV as string));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.use("/api", router);

app.use(errorHandler);

app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});
