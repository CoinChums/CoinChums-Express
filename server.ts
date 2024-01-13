const { startServer } = require("./src/app");
const { Log } = require("./src/utils/Logger");

(() => {
  Log.debug(`\n ${"🥳".repeat(10)} RESTARTING SERVER ${"🥳".repeat(10)}`);
  startServer();
})();
