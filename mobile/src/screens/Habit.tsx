import { useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import { ScrollView, Text, View } from "react-native";
import { BackButton } from "~/components/BackButton";
import { Checkbox } from "~/components/Checkbox";
import { ProgressBar } from "~/components/ProgressBar";

export interface HabitParams {
  date: string;
}

interface HabitProps {}

export const Habit: React.FC<HabitProps> = () => {
  const { params } = useRoute();

  const { date } = params as HabitParams;
  const parsedDate = dayjs(date);
  const dayOfTheWeek = parsedDate.format("dddd");
  const dayAndMonth = parsedDate.format("DD/MM");

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        <BackButton />

        <Text className="mt-6 text-zinc-400 font-semibold text-base">
          {dayOfTheWeek}
        </Text>

        <Text className="text-white font-extrabold text-3xl mb-4">
          {dayAndMonth}
        </Text>

        <ProgressBar progress={75} />

        <View className="mt-6">
          <Checkbox title="Beber 2L de água" isBold />
          <Checkbox title="Caminhar 5Km" isChecked isBold />
        </View>
      </ScrollView>
    </View>
  );
};
