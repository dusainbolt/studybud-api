import * as dayjs from "dayjs";

export class DateHelper {
  static generateExpire = (day: number = 7) => dayjs().add(day, "day");
}
