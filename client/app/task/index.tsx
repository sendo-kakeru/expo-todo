import { type TaskEndpoints } from "@app/api";
import { type Task } from "@repo/db";
import { Link, useRouter } from "expo-router";
import { hc } from "hono/client";
import { PlusCircleIcon } from "lucide-react-native";
import { FlatList, View } from "react-native";
import useSWR from "swr";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { API_BASE_URL } from "~/constants/url";
import { type SerializeDates } from "~/types/utils";

const client = hc<TaskEndpoints>(API_BASE_URL);

export default function Screen() {
  const router = useRouter();
  const { data, error, isLoading } = useSWR<SerializeDates<Task>[]>(
    "/tasks",
    async () => {
      const res = await client.tasks.$get();
      if (!res.ok) {
        // const contentType = res.headers.get("content-type");
        // if (contentType?.includes("json")) {
        //   const error = await res.json();
        //   throw error;
        // }
        throw new Error("Failed to fetch");
      }
      const json = await res.json();
      return json.tasks;
    },
  );

  return (
    <View className="relative flex-1 items-center justify-center gap-y-6 p-6">
      <Text className="text-2xl font-bold">タスク一覧</Text>
      {isLoading ? (
        <Text>タスクを取得中です…</Text>
      ) : error || !data ? (
        <Text>タスクの取得中に失敗しました</Text>
      ) : (
        <>
          {data.length === 0 ? (
            <Text>タスクはありません</Text>
          ) : (
            <FlatList
              data={data}
              keyExtractor={(post) => post.id}
              renderItem={({ item }) => (
                <Button onPress={() => router.navigate(`/task/${item.id}`)}>
                  <Text>{item.title}</Text>
                </Button>
              )}
              contentContainerClassName=""
              className="w-full"
            />
          )}
        </>
      )}
      <View className="absolute bottom-10 right-10 flex h-fit w-fit p-0">
        <Link href="/task/new">
          <PlusCircleIcon size={40} />
        </Link>
      </View>
    </View>
  );
}
