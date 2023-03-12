import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";

interface CheckboxProps extends RadixCheckbox.CheckboxProps {}

export const Checkbox: React.FC<CheckboxProps> = ({ children, ...props }) => (
  <RadixCheckbox.Root
    {...props}
    className="flex items-center text-white gap-3 group"
  >
    <div className="w-8 aspect-square rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 transition-colors group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
      <RadixCheckbox.Indicator>
        <Check size={20} />
      </RadixCheckbox.Indicator>
    </div>

    {children}
  </RadixCheckbox.Root>
);
