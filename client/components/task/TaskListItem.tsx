import { type Task } from "@repo/db";
import { Link } from "expo-router";
import { CheckCircleIcon, CircleIcon, TrashIcon } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { Text } from "~/components/ui/text";
import { type SerializeDates } from "~/types/utils";
export default function TaskListItem({ task }: { task: SerializeDates<Task> }) {
  // TODO: 各種アクション
  return (
    <Link
      href={`/task/${task.id}`}
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
          accessibilityLabel={task.done ? "未完了にする" : "完了にする"}
        >
          {task.done ? (
            <CheckCircleIcon className="text-sky-500" />
          ) : (
            <CircleIcon />
          )}
        </Pressable>
        <View className="flex-1">
          <Text className="text-xl">{task.title}</Text>
          {task.content && (
            <Text className="line-clamp-2 text-xs">{task.content}</Text>
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
  );
}
