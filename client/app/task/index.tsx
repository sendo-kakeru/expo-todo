import { type Task } from "@repo/db";
import { Link, Stack, useRouter } from "expo-router";
import {
  CheckCircleIcon,
  CircleIcon,
  PlusIcon,
  TrashIcon,
} from "lucide-react-native";
import { FlatList, Pressable, View } from "react-native";
import useSWR from "swr";
import { Text } from "~/components/ui/text";
import { client } from "~/lib/honoClient";
import { type SerializeDates } from "~/types/utils";

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
      ) : (
        <>
          {data.length === 0 ? (
            <Text>タスクはありません</Text>
          ) : (
            // TODO: 各種アクション
            <FlatList
              data={data}
              keyExtractor={(task) => task.id}
              renderItem={({ item }) => (
                <Link
                  href={`/task/${item.id}`}
                  onPress={(e) => e.stopPropagation()}
                  accessible={true}
                  accessibilityRole="button"
                >
                  <View className="w-full flex-row gap-x-4">
                    <Pressable
                      className="h-8 w-8 items-center justify-center rounded-full"
                      onPress={() => {
                        console.log("チェックする");
                      }}
                      accessible={true}
                      accessibilityRole="button"
                      accessibilityLabel={
                        item.done ? "未完了にする" : "完了にする"
                      }
                    >
                      {item.done ? (
                        <CheckCircleIcon className="text-sky-500" />
                      ) : (
                        <CircleIcon />
                      )}
                    </Pressable>
                    <View className="flex-1">
                      <Text className="text-xl">{item.title}</Text>
                      {item.content && (
                        <Text className="line-clamp-2 text-xs">
                          {item.content}
                        </Text>
                      )}
                    </View>
                    <Pressable
                      className="h-8 w-8 items-center justify-center"
                      onPress={() => {
                        console.log("削除モーダルを開く");
                      }}
                      accessible={true}
                      accessibilityRole="button"
                      accessibilityLabel="削除する"
                    >
                      <TrashIcon />
                    </Pressable>
                  </View>
                </Link>
              )}
              contentContainerClassName="gap-y-2"
              className="w-full"
            />
          )}
        </>
      )}
      <Pressable
        onPress={() => router.navigate("/task/new")}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="新規作成"
        className="absolute bottom-10 right-10 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 shadow-lg"
      >
        <PlusIcon size={28} color="#fff" />
      </Pressable>
    </View>
  );
}
