import { ActivityIndicator } from "react-native";

interface LoadingProps {}

export const Loading: React.FC<LoadingProps> = () => (
  <ActivityIndicator color="#7C3AED" size={48} />
);
