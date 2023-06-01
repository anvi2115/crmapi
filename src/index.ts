import UserController from "./api/users/user.controller";
import App from "./app";
import * as dotenv from 'dotenv'

dotenv.config()
const app = new App(
  [new UserController()],
  80
);

app.listen();