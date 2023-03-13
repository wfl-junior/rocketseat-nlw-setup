import { Feather } from "@expo/vector-icons";
import classNames from "classnames";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";
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
  disabled,
  ...props
}) => (
  <TouchableOpacity
    activeOpacity={0.7}
    className="flex-row items-center"
    disabled={disabled}
    {...props}
  >
    <View className="aspect-square w-8 bg-zinc-900 rounded-lg">
      {isChecked && (
        <Animated.View
          entering={ZoomIn}
          exiting={ZoomOut}
          className="aspect-square w-8 bg-green-500 rounded-lg items-center justify-center"
        >
          <Feather name="check" size={20} color={colors.white} />
        </Animated.View>
      )}
    </View>

    <Text
      className={classNames(
        "text-base ml-3",
        disabled ? "text-zinc-500" : "text-white",
        {
          "font-semibold": isBold,
        },
      )}
    >
      {title}
    </Text>
  </TouchableOpacity>
);
