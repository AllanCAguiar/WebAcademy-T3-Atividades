import express from "express";
import dotenv from "dotenv";
import { engine } from "express-handlebars";
import sass from "node-sass-middleware";
import validateEnv from "./utils/validateEnv";
import logger from "./middlewares/logger";
import router from "./router/router";

dotenv.config();
validateEnv();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(
  sass({
    src: `${__dirname}/../public/scss`,
    dest: `${__dirname}/../public/css`,
    outputStyle: "compressed",
    prefix: "/css"
  })
);

app.use("/js", [
  express.static(`${__dirname}/../public/js`),
  express.static(`${__dirname}/../node_modules/bootstrap/dist/js/`)
]);

app.use("/css", express.static(`${__dirname}/../public/css`));
app.use("/img", [express.static(`${__dirname}/public/js`)]);
app.use("/img", [express.static(`${__dirname}/public/img`)]);
app.use(express.json());
app.use(logger("completo"));

app.engine(
  "handlebars",
  engine({
    helpers: require(`${__dirname}/views/helpers/helpers.ts`)
  })
);
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views/main`);

app.use(router);

app.listen(PORT, () => {
  console.log("Express está rodando na porta " + PORT);
});
