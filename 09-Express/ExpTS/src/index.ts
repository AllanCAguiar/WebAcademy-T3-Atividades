import express from 'express';
import dotenv from 'dotenv';
import validateEnv from './utils/validateEnv';
import logger from "./middlewares/logger"
import router from "./router/router";
import { engine } from "express-handlebars";

dotenv.config();
validateEnv();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(logger("completo"));

app.engine("handlebars", engine({
    helpers: require(`${__dirname}/views/helpers/helpers.ts`)
}));
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`)

app.use(router);

app.listen(PORT, () => {
  console.log('Express está rodando na porta ' + PORT);
});
