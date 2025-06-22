const CognitoConfirmUserAttributeException = {
  /** message: An account with the given email already exists. */
  AliasExistsException: "AliasExistsException",

  /** message: Invalid verification code provided, please try again. */
  CodeMismatchException: "CodeMismatchException",

  /** message(例): Value '1 12 123' at 'confirmationCode' failed to satisfy constraint: Member must satisfy regular expression pattern: [\S]+ */
  InvalidParameterException: "InvalidParameterException",

  /** message: Attempt limit exceeded, please try after some time. */
  LimitExceededException: "LimitExceededException",

  /** message: Invalid code provided, please request a code again. */
  ExpiredCodeException: "ExpiredCodeException",
} as const;

type CognitoConfirmUserAttributeException =
  (typeof CognitoConfirmUserAttributeException)[keyof typeof CognitoConfirmUserAttributeException];

export function isConfirmUserAttributeException(
  name: string,
): name is CognitoConfirmUserAttributeException {
  return Object.values(CognitoConfirmUserAttributeException).some(
    (_name) => _name === name,
  );
}

function isKnownError(
  error: unknown,
): error is { name: CognitoConfirmUserAttributeException } {
  return error instanceof Error && isConfirmUserAttributeException(error.name);
}

export function confirmUserAttributeCatchHandler(error: unknown) {
  if (isKnownError(error)) {
    return { error: error.name };
  }

  // TODO: どんなエラーが出るかわからないので、全部ログに出している
  // 必要に応じて条件を変更する
  console.error("cognito", "confirmUserAttribute", error);

  if (error instanceof Error) {
    return { error: error.message };
  }
  // isSubmitSuccessful になることを防ぐため、暫定対応として例外をスローする
  throw error;
}
