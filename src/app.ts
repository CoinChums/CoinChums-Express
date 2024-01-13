const express = require("express");
const { CONFIG } = require("./global/config");
const { Log } = require("./utils/Logger");
const path = require("path");

const app = express();

// MiddleWares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** Start Express App */
export const startServer = async () => {
  Log.debug("----------------- Server Started -----------------");
  try {
    app.use(express.static(path.join(__dirname, "public")));
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
