import * as v from "valibot";
import { ErrorMessageType } from "~/constants/errorMessages";

export const confirmationCodeSchema = v.pipe(
  v.string(),
  v.trim(),
  v.minLength(1, ErrorMessageType.Required),
);
