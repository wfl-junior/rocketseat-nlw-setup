import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface ProgressBarProps {
  progress: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const sharedProgress = useSharedValue(progress);

  useEffect(() => {
    sharedProgress.value = withTiming(progress);
  }, [progress]);

  const style = useAnimatedStyle(
    () => ({ width: `${sharedProgress.value}%` }),
    [sharedProgress],
  );

  return (
    <View className="w-full h-3 rounded-xl bg-zinc-700">
      <Animated.View
        style={style}
        className="h-full rounded-xl bg-violet-600"
      />
    </View>
  );
};
