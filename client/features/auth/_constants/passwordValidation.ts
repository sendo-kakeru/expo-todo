export const PASSWORD_PATTERN =
  "(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?!^\\s)(?!.*\\s$)[a-zA-Z\\d^$*.\\[\\]\\{\\}\\(\\)?\"!@#%&\\/\\\\,><':;\\|_~`=+\\-\\s]*";
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 256;
export const PASSWORD_REGEXP =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!^\s)(?!.*\s$)[a-zA-Z\d^$*.[\]{}()?"!@#%&/\\,><':;|_~`=+\-\s]{8,256}$/;
