import fs from "fs";
import moment from "moment";

enum ELogLevel {
  DEBUG = "DEBUG",
  ERROR = "ERROR",
}

enum ELogColors {
  Reset = "\x1b[0m",
  Bright = "\x1b[1m",
  Dim = "\x1b[2m",
  Underscore = "\x1b[4m",
  Blink = "\x1b[5m",
  Reverse = "\x1b[7m",
  Hidden = "\x1b[8m",
  FgBlack = "\x1b[30m",
  FgRed = "\x1b[31m",
  FgGreen = "\x1b[32m",
  FgYellow = "\x1b[33m",
  FgBlue = "\x1b[34m",
  FgMagenta = "\x1b[35m",
  FgCyan = "\x1b[36m",
  FgWhite = "\x1b[37m",
  FgGray = "\x1b[90m",
  BgBlack = "\x1b[40m",
  BgRed = "\x1b[41m",
  BgGreen = "\x1b[42m",
  BgYellow = "\x1b[43m",
  BgBlue = "\x1b[44m",
  BgMagenta = "\x1b[45m",
  BgCyan = "\x1b[46m",
  BgWhite = "\x1b[47m",
  BgGray = "\x1b[100m",
}

class Logger {
  private filePath;
  constructor(path: string) {
    this.filePath = fs.openSync(path, "a");
  }

  getTimeStamp() {
    const now = moment();
    return now.format("DD-MMM-YYYY hh:m:s A");
  }

  private getColor(logLevel: ELogLevel) {
    if (logLevel === ELogLevel.DEBUG) {
      return ELogColors.FgYellow;
    } else if (logLevel === ELogLevel.ERROR) {
      return ELogColors.FgRed;
    }
  }

  private format(params: Array<any>) {
    let output = "";
    if (Array.isArray(params)) {
      for (const param of params) {
        output += this.format(param);
      }
    } else if (
      typeof params === "string" ||
      typeof params === "number" ||
      params === null ||
      params === undefined
    ) {
      return params;
    } else {
      return JSON.stringify(params, null, 2);
    }
    return output;
  }

  private print(logLevel: ELogLevel, ...params: any) {
    const str = `${ELogColors.Reset}${this.getColor(
      logLevel
    )}${logLevel} - [${this.getTimeStamp()}]${
      ELogColors.FgWhite
    }\n${this.format(params)}`;
    const fileStr = `${logLevel} - [${this.getTimeStamp()}]\n${this.format(
      params
    )}\n`;
    console.log(str);
    fs.writeSync(this.filePath, fileStr);
  }

  debug(...params: any) {
    this.print(ELogLevel.DEBUG, ...params);
  }
  error(...params: any) {
    this.print(ELogLevel.ERROR, ...params);
  }
}

export const Log = new Logger(process.cwd() + "/src/app.log");
