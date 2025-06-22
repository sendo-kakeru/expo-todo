const CognitoResendSignUpCodeException = {
  /**
   * UserNotFoundException: Username/client id combination not found.
   * 確認コード再送画面で、未登録のメールアドレスを入力した場合に発生する
   */
  UserNotFoundException: "UserNotFoundException",
  /** message: Attempt limit exceeded, please try after some time. */
  LimitExceededException: "LimitExceededException",
} as const;

type CognitoResendSignUpCodeException =
  (typeof CognitoResendSignUpCodeException)[keyof typeof CognitoResendSignUpCodeException];

/**
 * InvalidParameterException: User is already confirmed.
 * error.name が error.message と意味的に一致しないので、error.message で判定する
 * サインアップ画面の確認コード入力画面を開いたまま、別ブラウザで確認コードの送信を完了させると発生させることが可能
 */
export const ALREADY_CONFIRMED_ERROR = "User is already confirmed.";

export function isResendSignUpCodeException(
  name: string,
): name is CognitoResendSignUpCodeException {
  return Object.values(CognitoResendSignUpCodeException).some(
    (_name) => _name === name,
  );
}

function isKnownError(
  error: unknown,
): error is { name: CognitoResendSignUpCodeException } {
  return error instanceof Error && isResendSignUpCodeException(error.name);
}

export function resendSignUpCodeCatchHandler(error: unknown) {
  if (isKnownError(error)) {
    return { error: error.name };
  }

  if (error instanceof Error) {
    if (error.message !== ALREADY_CONFIRMED_ERROR) {
      // TODO: 必要に応じて条件を変更する
      console.error("cognito", "resendSignUpCode", error);
    }
    return { error: error.message };
  }

  console.error("cognito", "resendSignUpCode", error);

  // isSubmitSuccessful になることを防ぐため、暫定対応として例外をスローする
  throw error;
}
