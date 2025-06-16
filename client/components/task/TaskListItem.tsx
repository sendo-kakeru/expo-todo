import type { Task } from "@repo/db";
import clsx from "clsx";
import { Link } from "expo-router";
import { CheckCircleIcon, CircleIcon, TrashIcon } from "lucide-react-native";
import { type GestureResponderEvent, Pressable, View } from "react-native";
import Toast from "react-native-toast-message";
import { mutate } from "swr";
import { Text } from "~/components/ui/text";
import { useIsPending } from "~/hooks/useIsPending";
import { client } from "~/lib/honoClient";
import type { SerializeDates } from "~/types/utils";
export default function TaskListItem({ task }: { task: SerializeDates<Task> }) {
  return (
    <Link
      href={`/task/${task.id}`}
      onPress={(e) => e.stopPropagation()}
      accessible={true}
      accessibilityRole="button"
    >
      <View className="w-full flex-row gap-x-4">
        <StatusButton task={task} />
        <View className="flex-1">
          <Text className={clsx("text-xl", task.done && "line-through")}>
            {task.title}
          </Text>
          {task.content && (
            <Text className="line-clamp-2 text-xs">{task.content}</Text>
          )}
        </View>
        <TrashButton task={task} />
      </View>
    </Link>
  );
}

function StatusButton({ task }: { task: SerializeDates<Task> }) {
  const { isPending, startPending, stopPending } = useIsPending();
  async function handlePress(event: GestureResponderEvent) {
    event.stopPropagation();
    startPending();
    try {
      const res = await client.tasks[":id"].$patch({
        param: { id: task.id },
        json: { done: !task.done },
      });
      if (!res.ok) throw new Error("Failed change task status");
      const { task: updatedTask } = await res.json();
      void mutate<SerializeDates<Task[]>>(
        "/tasks",
        (tasks) =>
          tasks?.map((t) =>
            t.id === updatedTask.id ? { ...t, done: updatedTask.done } : t,
          ),
        false,
      );
      void mutate<SerializeDates<Task>>(`/task/${task.id}`, updatedTask, false);
    } catch (error) {
      console.log("Failed task update", error);
      Toast.show({
        type: "error",
        text1: "タスクの更新に失敗しました。",
      });
    } finally {
      stopPending();
    }
  }

  return (
    <Pressable
      className="h-8 w-8 items-center justify-center rounded-full"
      onPress={(e) => void handlePress(e)}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={task.done ? "未完了にする" : "完了にする"}
      disabled={isPending}
    >
      {isPending ? (
        <CircleIcon color="#17c964" fill="#17c964" />
      ) : task.done ? (
        <CheckCircleIcon color="#006fee" />
      ) : (
        <CircleIcon color="#000" />
      )}
    </Pressable>
  );
}

function TrashButton({ task }: { task: SerializeDates<Task> }) {
  const { isPending, startPending, stopPending } = useIsPending();
  async function handlePress(event: GestureResponderEvent) {
    event.stopPropagation();
    startPending();
    try {
      const res = await client.tasks[":id"].$delete({
        param: { id: task.id },
      });
      if (!res.ok) throw new Error("Failed task delete");
      const { taskId: deletedTaskId } = await res.json();
      void mutate<SerializeDates<Task[]>>(
        "/tasks",
        (tasks) => tasks?.filter(({ id }) => id !== deletedTaskId),
        false,
      );
      void mutate<SerializeDates<Task>>(`/task/${task.id}`, undefined, false);
    } catch (error) {
      console.log("Failed task delete", error);
      Toast.show({
        type: "error",
        text1: "タスクの削除に失敗しました。",
      });
    } finally {
      stopPending();
    }
  }
  return (
    <Pressable
      className="h-8 w-8 items-center justify-center"
      onPress={(e) => void handlePress(e)}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel="削除する"
      disabled={isPending}
    >
      {isPending ? <CircleIcon color="#ccc" fill="#ccc" /> : <TrashIcon />}
    </Pressable>
  );
}
