import { ValidationArguments } from "class-validator";

export class MSG {
  static _ERROR_VALIDATE = "MSG_VALIDATE";
  static _PREFIX_MSG_SYSTEM = "MSG_SYSTEM";
  static _PREFIX_MSG_LOGIC = "MSG_LOGIC";

  static validLength = (args: ValidationArguments) => {
    return `${MSG._ERROR_VALIDATE}_1,${args.constraints[0]},${args.constraints[1]},${args.property}, ${args.value}`;
  };

  static system = {
    INVALID_API_KEY: {
      message: "Invalid api key",
      code: `${MSG._PREFIX_MSG_SYSTEM}_1`,
    },
    INVALID_TOKEN: {
      message: "Invalid token",
      code: `${MSG._PREFIX_MSG_SYSTEM}_2`,
    },
  };

  static logic = {
    INVALID_USER: {
      message: "Invalid user",
      code: `${MSG._PREFIX_MSG_LOGIC}_1`,
    },
  };
}
