import type * as React from "react";
import { TextInput, View, type TextInputProps } from "react-native";
import { cn } from "~/lib/utils";
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
    <View className={cn("gap-y-1", className)}>
      {label && <Text className="text-sm font-bold">{label}</Text>}
      <TextInput
        className={cn(
          "native:text-lg native:leading-tight border-input bg-background text-foreground placeholder:text-muted-foreground web:flex web:ring-offset-background web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 min-h-[80px] w-full rounded-md border px-3 py-2 text-base lg:text-sm",
          props.editable === false && "web:cursor-not-allowed opacity-50",
        )}
        placeholderClassName={cn("text-muted-foreground", placeholderClassName)}
        multiline={multiline}
        numberOfLines={numberOfLines}
        textAlignVertical="top"
        {...props}
      />
      {error && <Text className="text-xs text-red-500">{error}</Text>}
    </View>
  );
}

export { Textarea };
