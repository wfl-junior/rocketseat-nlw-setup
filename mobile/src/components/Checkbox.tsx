import { Feather } from "@expo/vector-icons";
import classNames from "classnames";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import colors from "tailwindcss/colors";

interface CheckboxProps extends TouchableOpacityProps {
  title: string;
  isChecked?: boolean;
  isBold?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  title,
  isChecked = false,
  isBold = false,
  ...props
}) => (
  <TouchableOpacity
    activeOpacity={0.7}
    className="flex-row mb-2 items-center"
    {...props}
  >
    {isChecked ? (
      <View className="aspect-square w-8 bg-green-500 rounded-lg items-center justify-center">
        <Feather name="check" size={20} color={colors.white} />
      </View>
    ) : (
      <View className="aspect-square w-8 bg-zinc-900 rounded-lg" />
    )}

    <Text
      className={classNames("text-white text-base ml-3", {
        "font-semibold": isBold,
      })}
    >
      {title}
    </Text>
  </TouchableOpacity>
);
