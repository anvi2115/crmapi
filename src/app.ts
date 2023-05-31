import express, { Application } from "express";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
//import { generateToken } from './api/utils/jwt.utils';
import * as path from "path";
//import routes from './api/routes';
import logger from "./api/middlewares/logger.middleware";
import errorHandler from "./api/middlewares/error-handler.middleware";
import * as MySQLConnector from "./api/utils/mysql.connector";
import Controller from "./api/utils/interface/controller.interface";

const app = express();

// Only generate a token for lower level environments
// if (process.env.NODE_ENV !== 'production') {
//   console.log('JWT', generateToken());
// }

class App {
  public express: Application;
  public port: number;

  constructor(controllers: Controller[], port: number) {
    this.express = express();
    this.port = port;

    this.initialiseDatabaseConnection();
    this.initialiseMiddleware();
    this.initialiseControllers(controllers);
    this.initialiseErrorHandling();
  }

  private initialiseMiddleware(): void {
    this.express.use(helmet());
    this.express.use(cors());
    this.express.use(logger);
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(compression());
  }

  private initialiseControllers(controllers: Controller[]): void {
    controllers.forEach((controller: Controller) => {
      this.express.use("/api", controller.router);
    });
  }

  private initialiseErrorHandling(): void {
    this.express.use(errorHandler);
  }

  private initialiseDatabaseConnection(): void {
    MySQLConnector.init();
  }

  public listen(): void {
    this.express.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;
