import type { Task } from "@repo/db";
import { Stack, useRouter } from "expo-router";
import { PlusIcon } from "lucide-react-native";
import { FlatList, Pressable, View } from "react-native";
import useSWR from "swr";
import { Text } from "~/components/ui/text";
import TaskListItem from "~/features/task/components/TaskListItem";
import { client } from "~/lib/honoClient";
import type { SerializeDates } from "~/types/utils";

async function fetcher() {
  const res = await client.tasks.$get();
  if (!res.ok) {
    throw new Error("Failed to fetch");
  }
  const json = await res.json();
  return json.tasks;
}

export default function Screen() {
  const { data, error, isLoading } = useSWR<SerializeDates<Task>[]>(
    "/tasks",
    fetcher,
  );
  const router = useRouter();

  return (
    <View className="relative flex-1 items-center justify-center gap-y-6 p-6">
      <Stack.Screen options={{ title: "タスク一覧" }} />
      {isLoading ? (
        <Text>タスクを取得中です…</Text>
      ) : error || !data ? (
        <Text>タスクの取得中に失敗しました</Text>
      ) : data.length === 0 ? (
        <Text>タスクはありません</Text>
      ) : (
        <FlatList
          className="w-full"
          contentContainerClassName="gap-y-2"
          data={data}
          keyExtractor={(task) => task.id}
          renderItem={({ item }) => <TaskListItem task={item} />}
        />
      )}
      <Pressable
        accessibilityLabel="新規作成"
        accessibilityRole="button"
        accessible={true}
        className="absolute right-10 bottom-10 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 shadow-lg"
        onPress={() => router.navigate("/task/new")}
      >
        <PlusIcon color="#fff" size={28} />
      </Pressable>
    </View>
  );
}
