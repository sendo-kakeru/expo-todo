const CognitoResetPasswordException = {
  /** message: Username/client id combination not found. */
  UserNotFoundException: "UserNotFoundException",

  /** message: Attempt limit exceeded, please try after some time. */
  LimitExceededException: "LimitExceededException",

  /** message: Cannot reset password for the user as there is no registered/verified email or phone_number */
  InvalidParameterException: "InvalidParameterException",
} as const;

type CognitoResetPasswordException =
  (typeof CognitoResetPasswordException)[keyof typeof CognitoResetPasswordException];

export function isResetPasswordException(
  name: string,
): name is CognitoResetPasswordException {
  return Object.values(CognitoResetPasswordException).some(
    (_name) => _name === name,
  );
}

function isKnownError(
  error: unknown,
): error is { name: CognitoResetPasswordException } {
  return error instanceof Error && isResetPasswordException(error.name);
}

export function resetPasswordCatchHandler(error: unknown) {
  if (isKnownError(error)) {
    return { error: error.name };
  }

  // TODO: どんなエラーが出るかわからないので、全部ログに出している
  // 必要に応じて条件を変更する
  console.error("cognito", "resetPassword", error);

  if (error instanceof Error) {
    return { error: error.message };
  }
  // isSubmitSuccessful になることを防ぐため、暫定対応として例外をスローする
  throw error;
}
