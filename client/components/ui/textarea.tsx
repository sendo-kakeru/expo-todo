import clsx from "clsx";
import type * as React from "react";
import { TextInput, type TextInputProps, View } from "react-native";
import { Text } from "./text";

function Textarea({
  className,
  multiline = true,
  numberOfLines = 4,
  placeholderClassName,
  label,
  error,
  ...props
}: TextInputProps & {
  ref?: React.RefObject<TextInput>;
  label?: string;
  error?: string;
}) {
  return (
    <View className={clsx("gap-y-1", className)}>
      {label && <Text className="font-bold text-sm">{label}</Text>}
      <TextInput
        className={clsx(
          "web:flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 native:text-lg text-base text-foreground native:leading-tight web:ring-offset-background placeholder:text-muted-foreground web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 lg:text-sm",
          props.editable === false && "web:cursor-not-allowed opacity-50",
        )}
        multiline={multiline}
        numberOfLines={numberOfLines}
        placeholderClassName={clsx(
          "text-muted-foreground",
          placeholderClassName,
        )}
        textAlignVertical="top"
        {...props}
      />
      {error && <Text className="text-red-500 text-xs">{error}</Text>}
    </View>
  );
}

export { Textarea };
