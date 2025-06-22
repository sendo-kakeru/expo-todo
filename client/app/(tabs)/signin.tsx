import { useState } from "react";
import type { AuthStep } from "~/features/auth/_types";

export default function SignIn() {
  const [_step, _setStep] = useState<AuthStep>("default");

  return <></>;
}
