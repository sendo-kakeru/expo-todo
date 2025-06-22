export const CognitoSignUpException = {
  /** message: An account with the given email already exists. */
  UsernameExistsException: "UsernameExistsException",

  /** message: PreSignUp failed with error not allowed to signup.. */
  UserLambdaValidationException: "UserLambdaValidationException",
} as const;

export type CognitoSignUpException =
  (typeof CognitoSignUpException)[keyof typeof CognitoSignUpException];

export function isSignUpException(
  name: string,
): name is CognitoSignUpException {
  return Object.values(CognitoSignUpException).some((_name) => _name === name);
}

function isKnownError(
  error: unknown,
): error is { name: CognitoSignUpException } {
  return error instanceof Error && isSignUpException(error.name);
}

export function signUpCatchHandler(error: unknown) {
  if (isKnownError(error)) {
    return { error: error.name };
  }

  // TODO: どんなエラーが出るかわからないので、全部ログに出している
  // 必要に応じて条件を変更する
  console.error("cognito", "signUp", error);

  if (error instanceof Error) {
    return { error: error.message };
  }
  // isSubmitSuccessful になることを防ぐため、暫定対応として例外をスローする
  throw error;
}
