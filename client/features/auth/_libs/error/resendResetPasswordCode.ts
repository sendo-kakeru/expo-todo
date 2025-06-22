const CognitoResendResetPasswordCodeException = {
  /** message: Attempt limit exceeded, please try after some time. */
  LimitExceededException: "LimitExceededException",
} as const;

type CognitoResendResetPasswordCodeException =
  (typeof CognitoResendResetPasswordCodeException)[keyof typeof CognitoResendResetPasswordCodeException];

export function isResendResetPasswordCodeException(
  name: string,
): name is CognitoResendResetPasswordCodeException {
  return Object.values(CognitoResendResetPasswordCodeException).some(
    (_name) => _name === name,
  );
}

function isKnownError(
  error: unknown,
): error is { name: CognitoResendResetPasswordCodeException } {
  return (
    error instanceof Error && isResendResetPasswordCodeException(error.name)
  );
}

export function resendResetPasswordCodeCatchHandler(error: unknown) {
  if (isKnownError(error)) {
    return { error: error.name };
  }

  // TODO: どんなエラーが出るかわからないので、全部ログに出している
  // 必要に応じて条件を変更する
  console.error("cognito", "resendResetPasswordCode", error);

  if (error instanceof Error) {
    return { error: error.message };
  }
  // isSubmitSuccessful になることを防ぐため、暫定対応として例外をスローする
  throw error;
}
