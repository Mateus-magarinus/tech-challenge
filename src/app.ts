import express from "express";
import routes from "./routes/routes";
import config from "./config/config";
import RedisClient from "./cache/redis";

const contextPath: string = config.constants.CONTEXT_PATH;

class App {
  public readonly app: express.Application;

  constructor() {
    this.app = express();

    this.configure();
    this.routes();
  }

  private configure() {
    this.app.use(express.json());
    this.app.use(express.urlencoded());
    this.redis();
  }

  private redis() {
    return RedisClient.getInstance(config.redis);
  }

  private routes() {
    this.app.use(contextPath, routes);
  }
}

export default new App().app;
