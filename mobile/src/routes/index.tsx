import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";
import { AppRoutes } from "./app.routes";

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = () => (
  <View className="flex-1 bg-background">
    <NavigationContainer>
      <AppRoutes />
    </NavigationContainer>
  </View>
);
