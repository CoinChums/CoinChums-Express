import { TConfig } from "../types/config.types";

const _config: TConfig = {
  domainUrl: "http://localhost",
  port: 8080,
};

export const CONFIG = Object.freeze(_config);
