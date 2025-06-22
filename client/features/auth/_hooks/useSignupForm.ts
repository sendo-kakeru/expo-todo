import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import * as v from "valibot";
import { ErrorMessageType } from "~/constants/errorMessages";
import { passwordSchema } from "../_validations/passwordValidation";

const signupFormDefaultSchema = v.object({
  username: v.pipe(v.string(), v.email(ErrorMessageType.InvalidEmail)),
  password: passwordSchema,
  terms: v.boolean(ErrorMessageType.AgreeRequired),
  privacyPolicy: v.boolean(ErrorMessageType.AgreeRequired),
});

export type SignupFormSchema = v.InferOutput<typeof signupFormDefaultSchema>;

export const useSignupDefaultForm = () => {
  return useForm<SignupFormSchema>({
    defaultValues: {
      username: "",
      password: "",
      terms: false,
      privacyPolicy: false,
    },
    mode: "onTouched",
    resolver: valibotResolver(signupFormDefaultSchema),
  });
};
