import clsx from "clsx";
import type * as React from "react";
import { Text, type TextProps, View, type ViewProps } from "react-native";
import { TextClassContext } from "~/components/ui/text";

function Card({
  className,
  ...props
}: ViewProps & {
  ref?: React.RefObject<View>;
}) {
  return (
    <View
      className={clsx(
        "rounded-lg border border-border bg-card shadow-foreground/10 shadow-sm",
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({
  className,
  ...props
}: ViewProps & {
  ref?: React.RefObject<View>;
}) {
  return (
    <View
      className={clsx("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  );
}

function CardTitle({
  className,
  ...props
}: TextProps & {
  ref?: React.RefObject<Text>;
}) {
  return (
    <Text
      aria-level={3}
      className={clsx(
        "font-semibold text-2xl text-card-foreground leading-none tracking-tight",
        className,
      )}
      role="heading"
      {...props}
    />
  );
}

function CardDescription({
  className,
  ...props
}: TextProps & {
  ref?: React.RefObject<Text>;
}) {
  return (
    <Text
      className={clsx("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function CardContent({
  className,
  ...props
}: ViewProps & {
  ref?: React.RefObject<View>;
}) {
  return (
    <TextClassContext.Provider value="text-card-foreground">
      <View className={clsx("p-6 pt-0", className)} {...props} />
    </TextClassContext.Provider>
  );
}

function CardFooter({
  className,
  ...props
}: ViewProps & {
  ref?: React.RefObject<View>;
}) {
  return (
    <View
      className={clsx("flex flex-row items-center p-6 pt-0", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};
