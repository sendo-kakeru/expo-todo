import * as LabelPrimitive from "@rn-primitives/label";
import clsx from "clsx";
import type * as React from "react";

function Label({
  className,
  onPress,
  onLongPress,
  onPressIn,
  onPressOut,
  ...props
}: LabelPrimitive.TextProps & {
  ref?: React.RefObject<LabelPrimitive.TextRef>;
}) {
  return (
    <LabelPrimitive.Root
      className="web:cursor-default"
      onLongPress={onLongPress}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <LabelPrimitive.Text
        className={clsx(
          "font-medium native:text-base text-foreground text-sm leading-none web:peer-disabled:cursor-not-allowed web:peer-disabled:opacity-70",
          className,
        )}
        {...props}
      />
    </LabelPrimitive.Root>
  );
}

export { Label };
