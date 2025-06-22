import type { FieldErrors, UseFormSetError } from "react-hook-form";
import { ErrorMessage } from "~/components/ErrorMessage";

type Method =
  | "autoSignIn"
  | "confirmResetPassword"
  | "confirmSignUp"
  | "confirmUserAttribute"
  | "resendSignUpCode"
  | "resetPassword"
  | "resendResetPasswordCode"
  | "signIn"
  | "signUp"
  | "updatePassword"
  | "updateUserAttributes";

const methods: Method[] = [
  "autoSignIn",
  "confirmResetPassword",
  "confirmSignUp",
  "confirmUserAttribute",
  "resendSignUpCode",
  "resetPassword",
  "resendResetPasswordCode",
  "signIn",
  "signUp",
  "updatePassword",
  "updateUserAttributes",
];

function isSupportedMethod(method: string): method is Method {
  return methods.some((_method) => _method === method);
}

type Props = {
  errors: FieldErrors;
};

export function CognitoErrorMessage(props: Props) {
  const errorMessage = useMessage(props);
  if (!errorMessage) return null;
  return <ErrorMessage>{errorMessage}</ErrorMessage>;
}

function useMessage({ errors }: Props): string | null {
  if (!errors.root) return null;

  const method = Object.keys(errors.root)[0];
  if (!method || !isSupportedMethod(method)) return null;

  const message = errors.root[method]?.message;
  if (!message) return null;

  return message;
}

export function setCognitoError(
  setError: UseFormSetError<Record<string, never>>,
  method: Method,
  result: { error: string },
) {
  const name = `root.${method}` as const;
  setError(name, { type: "custom", message: result.error });
}
