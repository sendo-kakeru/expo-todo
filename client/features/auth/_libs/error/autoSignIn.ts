export const CognitoAutoSignInException = {
  /** message: There is already a signed in user. */
  UserAlreadyAuthenticatedException: "UserAlreadyAuthenticatedException",
} as const;

export type CognitoSignInException =
  (typeof CognitoAutoSignInException)[keyof typeof CognitoAutoSignInException];

export function isAutoSignInException(
  name: string,
): name is CognitoSignInException {
  return Object.values(CognitoAutoSignInException).some(
    (_name) => _name === name,
  );
}

function isKnownError(
  error: unknown,
): error is { name: CognitoSignInException } {
  return error instanceof Error && isAutoSignInException(error.name);
}

// エラー例不明
export function autoSignInCatchHandler(error: unknown) {
  if (isKnownError(error)) {
    return { error: error.name };
  }

  // TODO: どんなエラーが出るかわからないので、全部ログに出している
  // 必要に応じて条件を変更する
  console.error("cognito", "autoSignIn", error);

  if (error instanceof Error) {
    return { error: error.message };
  }
  // isSubmitSuccessful になることを防ぐため、暫定対応として例外をスローする
  throw error;
}
