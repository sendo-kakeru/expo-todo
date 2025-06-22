const CognitoUpdatePasswordException = {
  /** message: Incorrect username or password. */
  NotAuthorizedException: "NotAuthorizedException",

  /** message: Attempt limit exceeded, please try after some time. */
  LimitExceededException: "LimitExceededException",

  /** message: 1 validation error detected: Value at 'previousPassword' failed to satisfy constraint: Member must satisfy regular expression pattern: ^[\S]+.*[\S]+$ */
  InvalidParameterException: "InvalidParameterException",
} as const;

type CognitoUpdatePasswordException =
  (typeof CognitoUpdatePasswordException)[keyof typeof CognitoUpdatePasswordException];

export function isUpdatePasswordException(
  name: string,
): name is CognitoUpdatePasswordException {
  return Object.values(CognitoUpdatePasswordException).some(
    (_name) => _name === name,
  );
}

function isKnownError(
  error: unknown,
): error is { name: CognitoUpdatePasswordException } {
  return error instanceof Error && isUpdatePasswordException(error.name);
}

export function updatePasswordCatchHandler(error: unknown) {
  if (isKnownError(error)) {
    return { error: error.name };
  }

  // TODO: どんなエラーが出るかわからないので、全部ログに出している
  // 必要に応じて条件を変更する
  console.error("cognito", "updatePassword", error);

  if (error instanceof Error) {
    return { error: error.message };
  }
  // isSubmitSuccessful になることを防ぐため、暫定対応として例外をスローする
  throw error;
}
