import clsx from "clsx";
import { AlertCircleIcon } from "lucide-react-native";
import type { FieldError } from "react-hook-form";
import { View } from "react-native";
import { Text } from "./ui/text";

type Props =
  | {
      /** 通常は react-hook-form の `errors.[KEY]` を渡す */
      error: FieldError | undefined;
      className?: string;
    }
  | {
      /** react-hook-form の管理外の場合などで、直接メッセージを与えたい場合はこうする */
      children: React.ReactNode;
      className?: string;
    };

export function ErrorMessage({ className, ...props }: Props) {
  const content = "error" in props ? props.error?.message : props.children;
  if ("error" in props && !props.error?.message) {
    return null;
  }

  const message = "error" in props ? props.error?.message : content;
  return (
    <View className={clsx("flex items-center gap-x-1 text-red-500", className)}>
      <AlertCircleIcon size={16} />
      <Text className="text-xs">{message}</Text>
    </View>
  );
}
