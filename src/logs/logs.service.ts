import { Injectable, Logger, Scope } from "@nestjs/common";
import * as dayjs from "dayjs";
import { appendFile, existsSync, mkdirSync } from "fs";
import {
  DEC_END_REQUEST
} from "./../plugins/logging.plugin";
@Injectable({ scope: Scope.TRANSIENT })
export class AppLogger extends Logger {
  // list key in message will handle ignore
  private ignoreData: Array<string> = ["initialized"];
  // list key in message will handle break line
  private breakLineData: Array<string> = [DEC_END_REQUEST];
  // root folder save log
  private dirName: string = "src/logs/data";

  log(message: string) {
    super.log(message);
    this.writeLogToFile(message);
  }
  warn(message: string) {
    super.warn(message);
    this.writeLogToFile(message);
  }
  error(message: string, trace: string = "") {
    super.error(message);
    this.writeLogToFile(message);
  }
  debug(message: string) {
    super.debug(message);
    this.writeLogToFile(message);
  }
  verbose(message: string) {
    super.verbose(message);
    this.writeLogToFile(message);
  }

  ignoreLog(message: string, arrayCondition): boolean {
    return arrayCondition.some((value) => message.indexOf(value) !== -1);
  }

  // write content log to file every day
  writeLogToFile(message) {
    try {
      if (!message || this.ignoreLog(message, this.ignoreData)) {
        return;
      }
      // check folder save is exist
      if (!existsSync(this.dirName)) {
        mkdirSync(this.dirName);
      }
      // set message with time
      const timeStamp: string = this.getTimestamp();
      const timeString: string = dayjs(timeStamp).format("YYYY_MM_DD_HH");
      let fileName = `${this.dirName}/${timeString}.log`;
      message = `${timeStamp.replace(",", "")}: ${message}\n`;

      // check break line
      if (this.ignoreLog(message, this.breakLineData)) {
        message = `${message}\n`;
      }

      appendFile(fileName, message, (error) => {
        if (error) console.log("error when write logs: " + error);
      });
    } catch (e) {
      throw e;
    }
  }
}
