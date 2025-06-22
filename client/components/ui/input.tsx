import clsx from "clsx";
import { TextInput, type TextInputProps, View } from "react-native";
import { ErrorMessage } from "../ErrorMessage";
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
    <View className={clsx("gap-y-1", className)}>
      {label && <Text className="font-bold text-sm">{label}</Text>}
      <TextInput
        className={clsx(
          "web:flex h-10 native:h-12 web:w-full rounded-md border bg-background px-3 web:py-2 native:text-lg text-base text-foreground native:leading-tight web:ring-offset-background file:border-0 file:bg-transparent file:font-medium placeholder:text-muted-foreground web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 lg:text-sm",
          props.editable === false && "web:cursor-not-allowed opacity-50",
          error ? "border-red-500" : "border-input",
        )}
        placeholderClassName={clsx(
          "text-muted-foreground",
          placeholderClassName,
        )}
        {...props}
      />
      {error && (
        <ErrorMessage className="text-red-500 text-xs">{error}</ErrorMessage>
      )}
    </View>
  );
}

export { Input };
