import { useState } from "react";
import { FormProvider } from "react-hook-form";
import { View } from "react-native";
import { Button } from "~/components/ui/button";
import { Link } from "~/components/ui/link";
import { Text } from "~/components/ui/text";
import { SignupConfirmForm } from "~/features/auth/_components/ConfirmForm";
import { SignupDefaultForm } from "~/features/auth/_components/DefaultForm";
import { useSignupDefaultForm } from "~/features/auth/_hooks/useSignupForm";
import type { AuthStep } from "~/features/auth/_types";

export default function SignUp() {
  const [step, setStep] = useState<AuthStep>("default");
  const { getValues, ...methods } = useSignupDefaultForm();

  // TODO: ログイン済みならリダイレクト

  return (
    <View className="flex-1">
      <Text className="font-bold text-xl">新規登録</Text>
      {step === "default" ? (
        <FormProvider {...methods} getValues={getValues}>
          <SignupDefaultForm onSuccess={() => setStep("confirm")} />
        </FormProvider>
      ) : (
        <SignupConfirmForm
          password={getValues("password")}
          username={getValues("username")}
        />
      )}
      <View className="mt-32 flex justify-center md:mt-40">
        {step === "confirm" ? (
          <Button
            onPress={() => {
              setStep("default");
            }}
          >
            <Text>戻る</Text>
          </Button>
        ) : (
          // TODO: コード再送処理
          <Link href="/signup/verification">確認コードを再送する</Link>
        )}
      </View>
    </View>
  );
}
