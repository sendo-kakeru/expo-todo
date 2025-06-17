import * as Slot from "@rn-primitives/slot";
import clsx from "clsx";
import * as React from "react";
import { Text as RNText } from "react-native";

const TextClassContext = React.createContext<string | undefined>(undefined);

function Text({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<typeof RNText> & {
  ref?: React.RefObject<RNText>;
  asChild?: boolean;
}) {
  const textClass = React.useContext(TextClassContext);
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component
      className={clsx(
        "web:select-text text-base text-foreground",
        textClass,
        className,
      )}
      {...props}
    />
  );
}

export { Text, TextClassContext };
