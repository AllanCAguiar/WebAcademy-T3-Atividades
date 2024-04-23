import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import router from "./router";
import validateEnv from "./utils/validateEnv";
import setCookieLang from "./middlewares/setLangCookie";

dotenv.config();
validateEnv();

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cookieParser());
app.use(setCookieLang);
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Express app iniciada na porta ${PORT}.`);
});
