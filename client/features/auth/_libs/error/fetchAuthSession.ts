// 再現条件不明だが、ユーザーが存在しない場合に UserNotFoundException: User does not exist エラーが発生する

import {
  INVALID_LOGIN_TOKEN,
  LOGINS_NOT_MATCH,
  OTHER_NOT_AUTHORIZED,
  TOKEN_IS_INACTIVE,
  UNKNOWN_ERROR,
  USER_NOT_FOUND,
} from "../../_constants/errorCode";

// この場合はリトライしても意味がないため、リトライしない
function isUserNotFoundError(error: unknown): error is Error {
  return error instanceof Error && error.name === "UserNotFoundException";
}

/**
 * 色々な理由で NotAuthorizedException が発生する
 * Sentry を見たところリトライしても意味がないため、リトライしない
 *
 * NotAuthorizedException. Refresh Token has expired. は別途 'tokenRefresh_failure' イベントの監視でログアウト処理が行われるので、ここでは取り扱わない
 *
 * 観測しているエラーの種類
 * - ログインしている状態で退会が実行された場合、NotAuthorizedException: Token is inactive エラーが発生する
 * - 再現条件不明だが、Cognito がキャッシュで持っている（？）ログインユーザーと実際のユーザーの不一致が発生したときに
 *   NotAuthorizedException: Logins don't match. Please include at least one valid login for this identity or identity pool. が発生する
 * - 再現条件不明だが、login token というものの有効期限が切れた場合に
 *   NotAuthorizedException: Invalid login token. Token expired: 1727419245 >= 1727407607 が発生する
 *   この状態では idToken, accessToken の refresh に失敗するため、再ログインが必要
 */
function isNotAuthorizedException(error: unknown): error is Error {
  return (
    error instanceof Error &&
    error.name === "NotAuthorizedException" &&
    (error.message.match(/^Token is inactive/) !== null ||
      error.message.match(/^Logins don't match/) !== null ||
      error.message.match(/^Invalid login token. Token expired:/) !== null)
  );
}

export function isShouldSignOutError(error: unknown): error is Error {
  return isUserNotFoundError(error) || isNotAuthorizedException(error);
}

export function getShouldSignOutErrorCode(error: Error) {
  switch (error.name) {
    case "UserNotFoundException":
      return USER_NOT_FOUND;
    case "NotAuthorizedException": {
      if (error.message.match(/^Token is inactive/)) {
        return TOKEN_IS_INACTIVE;
      }
      if (error.message.match(/^Logins don't match/)) {
        return LOGINS_NOT_MATCH;
      }
      if (error.message.match(/^Invalid login token. Token expired:/)) {
        return INVALID_LOGIN_TOKEN;
      }
      return OTHER_NOT_AUTHORIZED;
    }
    default:
      return UNKNOWN_ERROR;
  }
}
