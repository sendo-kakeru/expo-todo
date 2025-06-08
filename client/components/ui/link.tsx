import { Link as ExpoLink } from "expo-router";
import { type ComponentProps } from "react";
import { Text, View } from "react-native";
import { ChevronLeft } from "~/lib/icons/ChevronLeft";
import { ChevronRight } from "~/lib/icons/ChevronRight";
import { cn } from "~/lib/utils";

const iconClassName = cn("h-2 w-2 text-sky-500");

export function Link({
  children,
  icon,
  className,
  ...props
}: ComponentProps<typeof ExpoLink> & { icon?: "right" | "left" }) {
  return (
    <ExpoLink className={cn("w-fit", className)} {...props}>
      <View className="flex-row items-center gap-x-1">
        {icon === "left" && <ChevronLeft className={iconClassName} />}
        <Text className="text-sky-500 underline">{children}</Text>
        {icon === "right" && <ChevronRight className={iconClassName} />}
      </View>
    </ExpoLink>
  );
}
