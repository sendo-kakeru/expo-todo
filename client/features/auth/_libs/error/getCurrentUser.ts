// UserUnAuthenticatedException: User needs to be authenticated to call this API.
export function isUserUnAuthenticatedException(error: unknown): error is Error {
  return (
    error instanceof Error &&
    error.message.includes("User needs to be authenticated to call this API")
  );
}
