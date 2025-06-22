const CognitoConfirmResetPasswordException = {
  /** message: Invalid verification code provided, please try again. */
  CodeMismatchException: "CodeMismatchException",

  /** message(例): Value '1 12 123' at 'confirmationCode' failed to satisfy constraint: Member must satisfy regular expression pattern: [\S]+ */
  InvalidParameterException: "InvalidParameterException",

  /** message: Attempt limit exceeded, please try after some time. */
  LimitExceededException: "LimitExceededException",

  /** message: Invalid code provided, please request a code again. */
  ExpiredCodeException: "ExpiredCodeException",
} as const;

type CognitoConfirmResetPasswordException =
  (typeof CognitoConfirmResetPasswordException)[keyof typeof CognitoConfirmResetPasswordException];

export function isConfirmResetPasswordException(
  name: string,
): name is CognitoConfirmResetPasswordException {
  return Object.values(CognitoConfirmResetPasswordException).some(
    (_name) => _name === name,
  );
}

function isKnownError(
  error: unknown,
): error is { name: CognitoConfirmResetPasswordException } {
  return error instanceof Error && isConfirmResetPasswordException(error.name);
}

export function confirmResetPasswordCatchHandler(error: unknown) {
  if (isKnownError(error)) {
    return { error: error.name };
  }

  // TODO: どんなエラーが出るかわからないので、全部ログに出している
  // 必要に応じて条件を変更する
  console.error("cognito", "confirmResetPassword", error);

  if (error instanceof Error) {
    return { error: error.message };
  }
  // isSubmitSuccessful になることを防ぐため、暫定対応として例外をスローする
  throw error;
}
