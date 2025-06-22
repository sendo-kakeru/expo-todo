import { valibotResolver } from "@hookform/resolvers/valibot";
import {
  autoSignIn,
  confirmSignUp,
  resendSignUpCode,
  signIn,
} from "aws-amplify/auth";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import * as v from "valibot";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import { useIsPending } from "~/hooks/useIsPending";
import {
  SIGNUP_ERROR_KEY,
  USERNAME_EXISTS_ERROR,
} from "../_constants/errorCode";
import { autoSignInCatchHandler } from "../_libs/error/autoSignIn";
import {
  CognitoErrorMessage,
  setCognitoError,
} from "../_libs/error/CognitoErrorMessage";
import {
  CURRENT_STATUS_IS_CONFIRMED_ERROR,
  confirmSignUpCatchHandler,
} from "../_libs/error/confirmSignUp";
import {
  ALREADY_CONFIRMED_ERROR,
  resendSignUpCodeCatchHandler,
} from "../_libs/error/resendSignUpCode";
import { signInCatchHandler } from "../_libs/error/signIn";
import { confirmationCodeSchema } from "../_validations/confirmationCodeValidation";

const signupFormConfirmSchema = v.object({
  confirmationCode: confirmationCodeSchema,
});

type SignupFormConfirmSchema = v.InferOutput<typeof signupFormConfirmSchema>;

export function SignupConfirmForm({
  // onSuccess,
  // onResendSuccess,
  // onAlreadyConfirmedError,
  username,
  password,
}: {
  // onSuccess: () => void;
  // onResendSuccess: () => void;
  // onAlreadyConfirmedError: () => void;
  username: string;
  password: string;
}) {
  const router = useRouter();
  const { isPending, startPending, stopPending } = useIsPending();
  const {
    isPending: isResendPending,
    startPending: startResendPending,
    stopPending: stopResendPending,
  } = useIsPending();
  // 処理が正常に完了したらlocation.hrefで画面遷移するまでボタンを非活性状態のままにするためのフラグ
  const [isSuccessfulSignup, setIsSuccessfulSignup] = useState(false);

  const {
    formState: { isSubmitting, errors },
    handleSubmit,
    control,
    setError,
  } = useForm<SignupFormConfirmSchema>({
    defaultValues: {
      confirmationCode: "",
    },
    mode: "onTouched",
    resolver: valibotResolver(signupFormConfirmSchema),
  });

  async function onSubmit({
    confirmationCode,
  }: v.InferOutput<typeof signupFormConfirmSchema>) {
    try {
      startPending();
      const confirmSignUpResult = await confirmSignUp({
        username,
        confirmationCode,
      }).catch(confirmSignUpCatchHandler);
      if ("error" in confirmSignUpResult) {
        if (confirmSignUpResult.error === CURRENT_STATUS_IS_CONFIRMED_ERROR) {
          Toast.show({
            type: "error",
            text1: "ユーザーが既に存在しています",
          });
          return;
        }
        setCognitoError(setError, "confirmSignUp", confirmSignUpResult);
        return;
      }

      switch (confirmSignUpResult.nextStep.signUpStep) {
        case "DONE": {
          // autoSignIn できない場合はログインさせる
          const signInResult = await signIn({
            username,
            password,
          }).catch(signInCatchHandler);
          if ("error" in signInResult) {
            setCognitoError(setError, "signIn", signInResult);
            return;
          }

          switch (signInResult.nextStep.signInStep) {
            case "DONE": {
              setIsSuccessfulSignup(true);
              router.navigate(
                `/signup?${SIGNUP_ERROR_KEY}=${USERNAME_EXISTS_ERROR}`,
              );
              return;
            }
            default: {
              // TODO: 処理追加
            }
          }

          break;
        }

        case "COMPLETE_AUTO_SIGN_IN": {
          const autoSignInResult = await autoSignIn().catch(
            autoSignInCatchHandler,
          );
          if ("error" in autoSignInResult) {
            setCognitoError(setError, "autoSignIn", autoSignInResult);
            return;
          }
          switch (autoSignInResult.nextStep.signInStep) {
            case "DONE": {
              setIsSuccessfulSignup(true);
              router.navigate(
                `/signup?${SIGNUP_ERROR_KEY}=${USERNAME_EXISTS_ERROR}`,
              );
              return;
            }
            default: {
              // TODO: 処理追加
            }
          }

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

  async function handleResendConfirmationCode() {
    startResendPending();
    try {
      const resendSignUpCodeResult = await resendSignUpCode({
        username,
      }).catch(resendSignUpCodeCatchHandler);
      if ("error" in resendSignUpCodeResult) {
        if (resendSignUpCodeResult.error === ALREADY_CONFIRMED_ERROR) {
          Toast.show({
            type: "error",
            text1: "ユーザーが既に存在しています",
          });
          return;
        }
        setCognitoError(setError, "resendSignUpCode", resendSignUpCodeResult);
        return;
      }
      Toast.show({
        type: "success",
        text1: "確認コードを再送信しました",
      });
    } finally {
      stopResendPending();
    }
  }

  return (
    <View className="justify-center">
      <View
        className={
          "gap-y-4 rounded-b-lg border-slate-500 border-x border-b bg-white px-6 pt-8 pb-10 md:px-16 md:py-10"
        }
      >
        <View className="text-sm">
          <Text>
            先ほどご入力いただいたメールアドレスに、確認コードを送信いたしました。
          </Text>
          <Text>
            メールボックスをご確認いただき、コードを入力してください。
          </Text>
        </View>
        <Controller
          control={control}
          name="confirmationCode"
          render={({
            field: { value, disabled, onChange, onBlur },
            fieldState: { error },
          }) => (
            <Input
              aria-labelledby="確認コード"
              editable={!isSubmitting && !isPending && !disabled}
              error={error?.message}
              label="確認コード"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <Button
          className="justify-self-start"
          disabled={isSubmitting || isResendPending}
          onPress={handleResendConfirmationCode}
        >
          <Text>{`${username}に確認コードを再送する`}</Text>
        </Button>
        <CognitoErrorMessage errors={errors} />
      </View>

      <Button
        className="mt-32"
        disabled={isSubmitting || isPending || isSuccessfulSignup}
        onPress={handleSubmit(onSubmit)}
      >
        <Text>次へ</Text>
      </Button>
    </View>
  );
}
