import { cleanEnv, port, str, url } from "envalid";
const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
    FOLDER_LOGS: str(),
    URL_DB: url()
  });
};
export default validateEnv;
