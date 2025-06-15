import { Stack } from "expo-router";
import { View } from "react-native";
import { TaskForm } from "~/components/task/TaskForm";

export default function NewTask() {
  return (
    <View className="flex-1">
      <Stack.Screen options={{ title: "新規作成" }} />
      <TaskForm type="create" />
    </View>
  );
}
