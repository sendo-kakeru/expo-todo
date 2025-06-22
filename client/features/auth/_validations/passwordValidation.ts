import * as v from "valibot";
import { ErrorMessageType } from "~/constants/errorMessages";
import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEXP,
} from "../_constants/passwordValidation";

export const passwordSchema = v.pipe(
  v.string(),
  v.minLength(PASSWORD_MIN_LENGTH, ErrorMessageType.PasswordMinLength),
  v.maxLength(PASSWORD_MAX_LENGTH, ErrorMessageType.PasswordMaxLength),
  v.regex(PASSWORD_REGEXP, ErrorMessageType.PasswordInvalidCharacter),
);
