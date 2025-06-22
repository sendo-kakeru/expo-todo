const CognitoConfirmSignUpException = {
  /** message: Invalid verification code provided, please try again. */
  CodeMismatchException: "CodeMismatchException",

  /** message(例): Value '1 12 123' at 'confirmationCode' failed to satisfy constraint: Member must satisfy regular expression pattern: [\S]+ */
  InvalidParameterException: "InvalidParameterException",

  /** message: Attempt limit exceeded, please try after some time. */
  LimitExceededException: "LimitExceededException",

  /** message: Invalid code provided, please request a code again. */
  ExpiredCodeException: "ExpiredCodeException",
} as const;

type CognitoConfirmSignUpException =
  (typeof CognitoConfirmSignUpException)[keyof typeof CognitoConfirmSignUpException];

/**
 * NotAuthorizedException: User cannot be confirmed. Current status is CONFIRMED
 * error.name が error.message と意味的に一致しないので、error.message で判定する
 * サインアップ画面の確認コード入力画面を開いたまま、別ブラウザで確認コードの送信を完了させると発生させることが可能
 */
export const CURRENT_STATUS_IS_CONFIRMED_ERROR =
  "User cannot be confirmed. Current status is CONFIRMED";

export function isConfirmSignUpException(
  name: string,
): name is CognitoConfirmSignUpException {
  return Object.values(CognitoConfirmSignUpException).some(
    (_name) => _name === name,
  );
}

function isKnownError(
  error: unknown,
): error is { name: CognitoConfirmSignUpException } {
  return error instanceof Error && isConfirmSignUpException(error.name);
}

export function confirmSignUpCatchHandler(error: unknown) {
  if (isKnownError(error)) {
    return { error: error.name };
  }

  if (error instanceof Error) {
    if (error.message !== CURRENT_STATUS_IS_CONFIRMED_ERROR) {
      // TODO: 必要に応じて条件を変更する
      console.error("cognito", "confirmSignUp", error);
    }
    return { error: error.message };
  }

  console.error("cognito", "confirmSignUp", error);

  // isSubmitSuccessful になることを防ぐため、暫定対応として例外をスローする
  throw error;
}
