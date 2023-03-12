import { View } from "react-native";

interface ProgressBarProps {
  progress: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => (
  <View className="w-full h-3 rounded-xl bg-zinc-700">
    <View
      style={{ width: `${progress}%` }}
      className="h-full rounded-xl bg-violet-600"
    />
  </View>
);
