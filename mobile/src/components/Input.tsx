import classNames from "classnames";
import { useState } from "react";
import { TextInput, TextInputProps } from "react-native";
import colors from "tailwindcss/colors";

interface InputProps extends TextInputProps {}

export const Input: React.FC<InputProps> = ({ className, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  function handleFocus() {
    setIsFocused(true);
  }

  function handleBlur() {
    setIsFocused(false);
  }

  return (
    <TextInput
      placeholderTextColor={colors.zinc[400]}
      {...props}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={classNames(
        "h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2",
        isFocused ? "border-violet-500" : "border-zinc-800",
      )}
    />
  );
};
