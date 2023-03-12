import classNames from "classnames";
import { useEffect } from "react";
import { ViewProps } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

interface SkeletonProps extends ViewProps {}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  style,
  ...props
}) => {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0.5, {
        duration: 1000,
        easing: Easing.bezier(0.4, 0, 0.6, 1),
      }),
      -1,
      true,
    );
  }, []);

  const rStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      {...props}
      role="alert"
      aria-live="polite"
      style={[style, rStyle]}
      className={classNames(
        "bg-zinc-900 border-zinc-800 overflow-hidden border-2",
        className,
      )}
    />
  );
};
