import { Express } from "express";
import { Log } from "../utils/Logger";
import { userRouter } from "./user.router";

// All Enabled Routers
const AppRouters = [userRouter];

/** Registers app routers */
export const registerRouters = (app: Express): void => {
  AppRouters.forEach((router) => {
    try {
      app.use(`/${router.name}`, router.router);
    } catch (e) {
      Log.error("Failed registering router: ", router.name);
    }
  });
};
