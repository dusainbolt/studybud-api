import { registerEnumType } from "@nestjs/graphql";

export enum StatusOnOff {
  OFF,
  ON,
}

registerEnumType(StatusOnOff, {
  name: "StatusOnOff",
  description: "The status on off",
});
