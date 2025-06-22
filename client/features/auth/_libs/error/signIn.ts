export const CognitoSignInException = {
  /** message: There is already a signed in user. */
  UserAlreadyAuthenticatedException: "UserAlreadyAuthenticatedException",

  /** message: User does not exist. */
  UserNotFoundException: "UserNotFoundException",

  /**
   * message: Incorrect username or password.
   * message: Password attempts exceeded
   */
  NotAuthorizedException: "NotAuthorizedException",
} as const;

export type CognitoSignInException =
  (typeof CognitoSignInException)[keyof typeof CognitoSignInException];

export function isSignInException(
  name: string,
): name is CognitoSignInException {
  return Object.values(CognitoSignInException).some((_name) => _name === name);
}

function isKnownError(
  error: unknown,
): error is { name: CognitoSignInException } {
  return error instanceof Error && isSignInException(error.name);
}

export function signInCatchHandler(error: unknown) {
  if (isKnownError(error)) {
    return { error: error.name };
  }

  // TODO: どんなエラーが出るかわからないので、全部ログに出している
  // 必要に応じて条件を変更する
  console.error("cognito", "signIn", error);

  if (error instanceof Error) {
    return { error: error.message };
  }
  // isSubmitSuccessful になることを防ぐため、暫定対応として例外をスローする
  throw error;
}
