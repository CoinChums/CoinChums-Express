import Express from "express";
import { CONFIG } from "./config";

const app = Express();

// MiddleWares
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

/** Start Express App */
export const startServer = async () => {
  try {
    app.listen(CONFIG.port, () => {
      console.clear();
      console.debug(
        "CoinChums Server is listening at",
        `${CONFIG.domainUrl}:${CONFIG.port}`
      );
    });
  } catch (error) {
    console.error("Server failed at startup: ", error);
  }
};

startServer();
