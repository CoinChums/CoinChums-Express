import Express from "express";
import { CONFIG } from "./global/config";
import { Log } from "./utils/Logger";

const app = Express();

// MiddleWares
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

/** Start Express App */
export const startServer = async () => {
  Log.debug("----------------- Server Started -----------------");
  try {
    app.listen(CONFIG.port, () => {
      console.clear();
      Log.debug(
        "CoinChums Server is listening at ",
        `${CONFIG.domainUrl}:${CONFIG.port}`
      );
    });
  } catch (error) {
    Log.error("Server failed at startup: ", error);
  }
};
