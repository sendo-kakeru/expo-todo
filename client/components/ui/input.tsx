import { TextInput, View, type TextInputProps } from "react-native";
import { cn } from "~/lib/utils";
import { Text } from "./text";

function Input({
  className,
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
          "native:h-12 native:text-lg native:leading-tight bg-background text-foreground placeholder:text-muted-foreground web:flex web:w-full web:py-2 web:ring-offset-background web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 h-10 rounded-md border px-3 text-base file:border-0 file:bg-transparent file:font-medium lg:text-sm",
          props.editable === false && "web:cursor-not-allowed opacity-50",
          error ? "border-red-500" : "border-input",
        )}
        placeholderClassName={cn("text-muted-foreground", placeholderClassName)}
        {...props}
      />
      {error && <Text className="text-xs text-red-500">{error}</Text>}
    </View>
  );
}

export { Input };
