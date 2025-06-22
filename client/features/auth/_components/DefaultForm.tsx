import { signUp } from "aws-amplify/auth";
import { useRouter } from "expo-router";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { View } from "react-native";
import { ErrorMessage } from "~/components/ErrorMessage";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { Link } from "~/components/ui/link";
import { Text } from "~/components/ui/text";
import { useIsPending } from "~/hooks/useIsPending";
import type { SignupFormSchema } from "../_hooks/useSignupForm";
import {
  CognitoErrorMessage,
  setCognitoError,
} from "../_libs/error/CognitoErrorMessage";
import {
  CognitoSignUpException,
  signUpCatchHandler,
} from "../_libs/error/signUp";

export function SignupDefaultForm({ onSuccess }: { onSuccess: () => void }) {
  const router = useRouter();
  const { isPending, startPending, stopPending } = useIsPending();

  const {
    formState: { errors, isSubmitting },
    control,
    handleSubmit,
    setError,
  } = useFormContext<SignupFormSchema>();

  async function onSubmit({ username, password }: SignupFormSchema) {
    try {
      startPending();
      const signUpResult = await signUp({
        username,
        password,
        options: {
          userAttributes: {
            email: username,
          },
          autoSignIn: true,
        },
      }).catch(signUpCatchHandler);
      if ("error" in signUpResult) {
        if (
          signUpResult.error === CognitoSignUpException.UsernameExistsException
        ) {
          router.navigate(
            `/signup?${SIGNUP_ERROR_KEY}=${USERNAME_EXISTS_ERROR}`,
          );
          return;
        }

        setCognitoError(setError, "signUp", signUpResult);
        return;
      }

      switch (signUpResult.nextStep.signUpStep) {
        case "CONFIRM_SIGN_UP": {
          onSuccess();
          break;
        }

        default: {
          // TODO: 処理追加
        }
      }
    } finally {
      stopPending();
    }
  }

  const agreedTerms = useWatch({ name: "terms" });
  const agreedPrivacyPolicy = useWatch({ name: "privacyPolicy" });
  const disabled =
    isSubmitting || !agreedTerms || !agreedPrivacyPolicy || isPending;

  return (
    <View className="justify-center">
      <View
        className={
          "gap-y-4 rounded-b-lg border-slate-500 border-x border-b bg-white px-6 pt-8 pb-10 md:px-16 md:py-10"
        }
      >
        <Controller
          control={control}
          name="username"
          render={({
            field: { value, disabled, onChange, onBlur },
            fieldState: { error },
          }) => (
            <Input
              aria-labelledby="メールアドレス"
              editable={!isSubmitting && !isPending && !disabled}
              error={error?.message}
              label="メールアドレス"
              onBlur={onBlur}
              onChangeText={onChange}
              selectTextOnFocus={!isSubmitting && !isPending && !disabled}
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({
            field: { value, disabled, onChange, onBlur },
            fieldState: { error },
          }) => (
            <Input
              aria-labelledby="パスワード"
              editable={!isSubmitting && !isPending && !disabled}
              error={error?.message}
              label="パスワード"
              onBlur={onBlur}
              onChangeText={onChange}
              selectTextOnFocus={!isSubmitting && !isPending && !disabled}
              value={value}
            />
          )}
        />
        <CognitoErrorMessage errors={errors} />
      </View>

      <View className="mx-auto mt-32 gap-3 md:gap-2">
        <Controller
          control={control}
          name="terms"
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => (
            <View className="gap-x-2">
              <View className="flex-row gap-x-1">
                <Checkbox
                  checked={value}
                  onBlur={onBlur}
                  onCheckedChange={onChange}
                />
                <Link href="/terms">利用規約に同意する</Link>
              </View>
              <ErrorMessage error={error} />
            </View>
          )}
        />
        <Controller
          control={control}
          name="privacyPolicy"
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => (
            <View className="gap-x-2">
              <View className="flex-row gap-x-1">
                <Checkbox
                  checked={value}
                  onBlur={onBlur}
                  onCheckedChange={onChange}
                />
                <Link href="/privacy_policy">
                  プライバシーポリシーに同意する
                </Link>
              </View>
              <ErrorMessage error={error} />
            </View>
          )}
        />
      </View>

      <Button
        className="mt-8"
        disabled={disabled}
        onPress={handleSubmit(onSubmit)}
      >
        <Text>次へ</Text>
      </Button>
    </View>
  );
}
