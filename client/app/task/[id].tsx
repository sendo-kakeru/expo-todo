import type { Task } from "@repo/db";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import useSWR from "swr";
import { Text } from "~/components/ui/text";
import { TaskForm } from "~/features/task/_components/TaskForm";
import { client } from "~/lib/honoClient";
import type { SerializeDates } from "~/types/utils";

export default function TaskDetail() {
  const { id } = useLocalSearchParams();
  const taskId = Array.isArray(id) ? id[0] : id;
  const [isNotFound, setIsNotFound] = useState(false);

  const { data, isLoading, error } = useSWR<SerializeDates<Task | null>>(
    `/tasks/${taskId}`,
    async () => {
      const res = await client.tasks[":id"].$get({ param: { id: taskId } });
      if (res.status === 404) {
        setIsNotFound(true);
      }
      if (!res.ok) {
        throw new Error("Failed to fetch");
      }
      const json = await res.json();
      return json.task;
    },
  );

  if (isLoading) {
    return (
      <View className="items-center justify-center p-6">
        <Text>取得中です…</Text>
      </View>
    );
  }

  if (!data || isNotFound) {
    return (
      <View className="items-center justify-center p-6">
        <Text>タスクがありませんでした。</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="items-center justify-center p-6">
        <Text>タスクの取得に失敗しました</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <Stack.Screen options={{ title: data.title }} />
      <TaskForm
        onNotFound={() => setIsNotFound(true)}
        task={data}
        taskId={taskId}
        type="update"
      />
    </View>
  );
}
