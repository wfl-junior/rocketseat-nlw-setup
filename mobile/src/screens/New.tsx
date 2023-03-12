import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "tailwindcss/colors";
import { BackButton } from "~/components/BackButton";
import { Checkbox } from "~/components/Checkbox";

const availableWeekDays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

interface NewProps {}

export const New: React.FC<NewProps> = () => {
  const [weekDays, setWeekDays] = useState<number[]>([]);

  function handleToggleWeekDay(weekDayIndex: number) {
    return () => {
      setWeekDays(currentWeekDays => {
        if (currentWeekDays.includes(weekDayIndex)) {
          return currentWeekDays.filter(weekDay => weekDay !== weekDayIndex);
        }

        return [...currentWeekDays, weekDayIndex];
      });
    };
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        <BackButton />

        <Text className="text-3xl mt-6 text-white font-extrabold">
          Criar hábito
        </Text>

        <Text className="text-base mt-6 text-white font-semibold">
          Qual seu comprometimento?
        </Text>

        <TextInput
          placeholderTextColor={colors.zinc[400]}
          placeholder="Ex.: Exercícios, dormir bem, etc..."
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 focus:border-green-600 border-zinc-800"
        />

        <Text className="font-semibold mt-4 mb-3 text-white text-base">
          Qual a recorrência?
        </Text>

        {availableWeekDays.map((weekDay, index) => (
          <Checkbox
            key={weekDay}
            title={weekDay}
            isChecked={weekDays.includes(index)}
            onPress={handleToggleWeekDay(index)}
          />
        ))}

        <TouchableOpacity
          activeOpacity={0.7}
          className="flex-row bg-green-600 w-full h-14 items-center justify-center rounded-md mt-6"
        >
          <Feather name="check" size={20} color={colors.white} />

          <Text className="font-semibold text-base text-white ml-3">
            Confirmar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
