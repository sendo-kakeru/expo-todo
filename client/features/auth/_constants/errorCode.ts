/** サインアップ画面で出るエラーをログイン画面へ伝達するためのキー */
export const SIGNUP_ERROR_KEY = "error";
/** サインアップ画面で出る UsernameExistsError をログイン画面へ伝達するための定数 */
export const USERNAME_EXISTS_ERROR = "E001";

/** 強制サインアウト画面に伝達するエラー */
/** UserNotFoundException: User does not exist */
export const USER_NOT_FOUND = "US-01";
/** NotAuthorizedException で過去検知したことがないエラー */
export const OTHER_NOT_AUTHORIZED = "AU-00";
/** NotAuthorizedException: Token is inactive */
export const TOKEN_IS_INACTIVE = "AU-01";
/** NotAuthorizedException: Logins don't match. Please include at least one valid login for this identity or identity pool.  */
export const LOGINS_NOT_MATCH = "AU-02";
/** NotAuthorizedException: Invalid login token. Token expired: 1727419245 >= 1727407607 */
export const INVALID_LOGIN_TOKEN = "AU-03";
/** 未知のエラー */
export const UNKNOWN_ERROR = "UN-00";
