import classNames from "classnames";
import { forwardRef } from "react";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      {...props}
      className={classNames(
        "border border-violet-500 font-semibold rounded-lg px-6 py-4 flex items-center justify-center gap-3 hover:border-violet-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-4",
        className,
      )}
    />
  ),
);
