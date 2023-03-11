import { ScrollView, Text, View } from "react-native";
import { daySize, HabitDay } from "~/components/HabitDay";
import { Header } from "~/components/Header";
import { generateDatesFromYearBeginning } from "~/utils/generate-dates-from-year-beginning";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
const summaryDates = generateDatesFromYearBeginning();

const minimumSummaryDatesSize = 12 * 7; // 12 weeks

const amountOfDaysToFill = Array.from(
  { length: minimumSummaryDatesSize - summaryDates.length },
  (_, index) => index + 1,
);

interface HomeProps {}

export const Home: React.FC<HomeProps> = () => (
  <View className="bg-background flex-1 px-8 pt-16">
    <Header />

    <View className="flex-row mt-6 mb-2">
      {weekDays.map((weekDay, index) => (
        <Text
          key={index}
          style={{ width: daySize }}
          className="text-zinc-400 text-xl font-bold text-center mx-1"
        >
          {weekDay}
        </Text>
      ))}
    </View>

    <ScrollView>
      <View className="flex-row flex-wrap pb-8">
        {summaryDates.map(date => (
          <HabitDay key={date.toISOString()} />
        ))}

        {amountOfDaysToFill.map(number => (
          <View
            key={number}
            style={{ width: daySize, height: daySize }}
            className="bg-zinc-900 border-2 border-zinc-800 rounded-lg m-1 opacity-40"
          />
        ))}
      </View>
    </ScrollView>
  </View>
);
