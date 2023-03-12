import { Feather } from "@expo/vector-icons";
import classNames from "classnames";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "tailwindcss/colors";
import { BackButton } from "~/components/BackButton";
import { Checkbox } from "~/components/Checkbox";
import { api } from "~/lib/axios";

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
  const [title, setTitle] = useState("");
  const [weekDays, setWeekDays] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleCreateNewHabit() {
    const newTitle = title.trim();

    if (!newTitle) {
      return Alert.alert("Novo hábito", "O título é obrigatório.");
    }

    if (weekDays.length === 0) {
      return Alert.alert(
        "Novo hábito",
        "É obrigatório preencher pelo menos um dia da semana.",
      );
    }

    setIsSubmitting(true);

    try {
      await api.post("/habits", {
        title: newTitle,
        weekDays,
      });

      Alert.alert("Novo hábito", "Novo hábito cadastrado com sucesso.");
      setTitle("");
      setWeekDays([]);
    } catch {
      Alert.alert("Novo hábito", "Ocorreu um erro ao cadastrar o novo hábito.");
    } finally {
      setIsSubmitting(false);
    }
  }

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
          value={title}
          onChangeText={setTitle}
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
          disabled={isSubmitting}
          onPress={handleCreateNewHabit}
          className={classNames(
            "flex-row w-full h-14 items-center justify-center rounded-md mt-6",
            isSubmitting ? "bg-zinc-600" : "bg-green-600",
          )}
        >
          {isSubmitting ? (
            <ActivityIndicator color={colors.white} size={20} />
          ) : (
            <Feather name="check" size={20} color={colors.white} />
          )}

          <Text className="font-semibold text-base text-white ml-3">
            Confirmar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
