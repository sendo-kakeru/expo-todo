import * as Slot from "@rn-primitives/slot";
import clsx from "clsx";
import type * as React from "react";
import { Text as RNText } from "react-native";

type TypographyProps = React.ComponentProps<typeof RNText> & {
  ref?: React.RefObject<RNText>;
  asChild?: boolean;
};

function H1({ className, asChild = false, ...props }: TypographyProps) {
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component
      aria-level="1"
      className={clsx(
        "web:select-text web:scroll-m-20 font-extrabold text-4xl text-foreground tracking-tight lg:text-5xl",
        className,
      )}
      role="heading"
      {...props}
    />
  );
}

function H2({ className, asChild = false, ...props }: TypographyProps) {
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component
      aria-level="2"
      className={clsx(
        "web:select-text web:scroll-m-20 border-border border-b pb-2 font-semibold text-3xl text-foreground tracking-tight first:mt-0",
        className,
      )}
      role="heading"
      {...props}
    />
  );
}

function H3({ className, asChild = false, ...props }: TypographyProps) {
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component
      aria-level="3"
      className={clsx(
        "web:select-text web:scroll-m-20 font-semibold text-2xl text-foreground tracking-tight",
        className,
      )}
      role="heading"
      {...props}
    />
  );
}

function H4({ className, asChild = false, ...props }: TypographyProps) {
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component
      aria-level="4"
      className={clsx(
        "web:select-text web:scroll-m-20 font-semibold text-foreground text-xl tracking-tight",
        className,
      )}
      role="heading"
      {...props}
    />
  );
}

function P({ className, asChild = false, ...props }: TypographyProps) {
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component
      className={clsx("web:select-text text-base text-foreground", className)}
      {...props}
    />
  );
}

function BlockQuote({ className, asChild = false, ...props }: TypographyProps) {
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component
      // @ts-ignore - role of blockquote renders blockquote element on the web
      className={clsx(
        "mt-6 native:mt-4 web:select-text border-border border-l-2 native:pl-3 pl-6 text-base text-foreground italic",
        className,
      )}
      {...props}
    />
  );
}

function Code({ className, asChild = false, ...props }: TypographyProps) {
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component
      // @ts-ignore - role of code renders code element on the web
      className={clsx(
        "relative web:select-text rounded-md bg-muted px-[0.3rem] py-[0.2rem] font-semibold text-foreground text-sm",
        className,
      )}
      {...props}
    />
  );
}

function Lead({ className, asChild = false, ...props }: TypographyProps) {
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component
      className={clsx(
        "web:select-text text-muted-foreground text-xl",
        className,
      )}
      {...props}
    />
  );
}

function Large({ className, asChild = false, ...props }: TypographyProps) {
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component
      className={clsx(
        "web:select-text font-semibold text-foreground text-xl",
        className,
      )}
      {...props}
    />
  );
}

function Small({ className, asChild = false, ...props }: TypographyProps) {
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component
      className={clsx(
        "web:select-text font-medium text-foreground text-sm leading-none",
        className,
      )}
      {...props}
    />
  );
}

function Muted({ className, asChild = false, ...props }: TypographyProps) {
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component
      className={clsx(
        "web:select-text text-muted-foreground text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { BlockQuote, Code, H1, H2, H3, H4, Large, Lead, Muted, P, Small };
