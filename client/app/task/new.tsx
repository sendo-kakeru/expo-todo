import { valibotResolver } from "@hookform/resolvers/valibot";
import { type Task } from "@repo/db";
import { CreateTaskRequestSchema, type CreateTaskRequest } from "@repo/shared";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import { mutate } from "swr";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import { Textarea } from "~/components/ui/textarea";
import { useIsPending } from "~/hooks/useIsPending";
import { client } from "~/lib/honoClient";
import { type SerializeDates } from "~/types/utils";

export default function NewTask() {
  const { isPending, startPending, stopPending } = useIsPending();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTaskRequest>({
    resolver: valibotResolver(CreateTaskRequestSchema),
  });

  async function onSubmit(dto: CreateTaskRequest) {
    startPending();
    try {
      const res = await client.tasks.$post({ json: dto });
      if (res.status === 400) {
        Toast.show({
          type: "error",
          text1: "入力値が無効です。",
        });
        return;
      }
      if (!res.ok) {
        const contentType = res.headers.get("content-type");
        if (contentType?.includes("json")) {
          const error = await res.json();
          throw error;
        }
        throw new Error("Failed task create");
      }
      const { task } = await res.json();
      void mutate<SerializeDates<Task[]>>(
        "/tasks",
        (tasks) => (tasks ? [task, ...tasks] : [task]),
        false,
      );
      router.navigate("/task");
    } catch (error) {
      console.log("Failed task create", error);
      Toast.show({
        type: "error",
        text1: "タスクの作成に失敗しました。",
      });
    } finally {
      stopPending();
    }
  }

  return (
    <View className="gap-y-4 p-6">
      <Text className="text-xl font-bold">タスク作成</Text>
      <Controller
        control={control}
        name="title"
        render={({ field: { value, disabled, onChange, onBlur } }) => (
          <Input
            value={value}
            editable={!isPending && !disabled}
            selectTextOnFocus={!isPending && !disabled}
            placeholder="xxさんに連絡する"
            onChangeText={onChange}
            onBlur={onBlur}
            label="タイトル"
            aria-labelledby="タイトル"
            error={errors.title?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="content"
        render={({ field: { value, disabled, onChange, onBlur } }) => (
          <Textarea
            value={value}
            editable={!isPending && !disabled}
            selectTextOnFocus={!isPending && !disabled}
            placeholder="xxの件も連絡する"
            onChangeText={onChange}
            onBlur={onBlur}
            label="概要"
            aria-labelledby="概要"
            error={errors.content?.message}
          />
        )}
      />
      <Button
        variant="default"
        className="mx-auto min-w-[160px] rounded-full bg-sky-600 text-white disabled:bg-slate-500"
        disabled={!!errors.root?.message || isPending}
        onPress={() => void handleSubmit(onSubmit)}
      >
        <Text>{isPending ? "作成中です…" : "作成する"}</Text>
      </Button>
      <Toast />
    </View>
  );
}
