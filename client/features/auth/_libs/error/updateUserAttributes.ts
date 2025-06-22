const CognitoUpdateUserAttributesException = {
  /** message: An account with the given email already exists. */
  AliasExistsException: "AliasExistsException",

  // 他の確認コード系のフォームは再送しまくると下記のエラーが出るのだが、このフォームでは相当な回数再送しても出なかったのでコメントアウト
  /** message: Attempt limit exceeded, please try after some time. */
  // LimitExceededException = 'LimitExceededException',
} as const;

type CognitoUpdateUserAttributesException =
  (typeof CognitoUpdateUserAttributesException)[keyof typeof CognitoUpdateUserAttributesException];

export function isUpdateUserAttributesException(
  name: string,
): name is CognitoUpdateUserAttributesException {
  return Object.values(CognitoUpdateUserAttributesException).some(
    (_name) => _name === name,
  );
}

function isKnownError(
  error: unknown,
): error is { name: CognitoUpdateUserAttributesException } {
  return error instanceof Error && isUpdateUserAttributesException(error.name);
}

export function updateUserAttributesCatchHandler(error: unknown) {
  if (isKnownError(error)) {
    return { error: error.name };
  }

  // TODO: どんなエラーが出るかわからないので、全部ログに出している
  // 必要に応じて条件を変更する
  console.error("cognito", "updateUserAttributes", error);

  if (error instanceof Error) {
    return { error: error.message };
  }
  // isSubmitSuccessful になることを防ぐため、暫定対応として例外をスローする
  throw error;
}
