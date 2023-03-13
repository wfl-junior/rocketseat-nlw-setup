import * as RadixCheckbox from "@radix-ui/react-checkbox";
import classNames from "classnames";
import { AnimatedCheck } from "./icons/AnimatedCheck";

interface CheckboxProps extends RadixCheckbox.CheckboxProps {}

export const Checkbox: React.FC<CheckboxProps> = ({
  children,
  className,
  ...props
}) => (
  <RadixCheckbox.Root
    {...props}
    className={classNames(
      "flex items-center text-white gap-3 group disabled:cursor-not-allowed focus-visible:outline-none",
    )}
  >
    <div className="w-7 sm:w-7 aspect-square rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-hover:enabled:border-zinc-700 group-focus-visible:ring-2 group-focus-visible:ring-violet-500 group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-zinc-900">
      <RadixCheckbox.Indicator>
        <AnimatedCheck size={20} />
      </RadixCheckbox.Indicator>
    </div>

    {children}
  </RadixCheckbox.Root>
);
