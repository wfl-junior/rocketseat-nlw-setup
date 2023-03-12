import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import colors from "tailwindcss/colors";
import Logo from "~/assets/logo.svg";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const { navigate } = useNavigation();

  function handleNavigateToNew() {
    navigate("new");
  }

  return (
    <View className="w-full flex-row items-center justify-between">
      <Logo />

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleNavigateToNew}
        className="flex-row h-11 px-4 border border-violet-500 rounded-lg items-center"
      >
        <Feather name="plus" color={colors.violet[500]} size={20} />
        <Text className="text-white ml-3 font-semibold text-base">Novo</Text>
      </TouchableOpacity>
    </View>
  );
};
