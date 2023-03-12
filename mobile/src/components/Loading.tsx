import { ActivityIndicator } from "react-native";
import colors from "tailwindcss/colors";

interface LoadingProps {
  size?: number;
}

export const Loading: React.FC<LoadingProps> = ({ size = 48 }) => (
  <ActivityIndicator color={colors.violet[600]} size={size} />
);
