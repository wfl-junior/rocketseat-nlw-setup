import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import { View } from "react-native";
import { useQuery } from "react-query";
import { api } from "~/lib/axios";
import { generateDatesFromYearBeginning } from "~/utils/generate-dates-from-year-beginning";
import { sleep } from "~/utils/sleep";
import { daySize, HabitDay } from "./HabitDay";

const summaryDates = generateDatesFromYearBeginning();
const minimumSummaryDatesSize = 12 * 7; // 12 weeks

const amountOfDaysToFill = Array.from(
  { length: minimumSummaryDatesSize - summaryDates.length },
  (_, index) => index + 1,
);

export interface SummaryItem {
  id: string;
  date: string;
  amount: number;
  completed: number;
}

interface SummaryTableProps {}

export const SummaryTable: React.FC<SummaryTableProps> = () => {
  const { navigate } = useNavigation();
  const { data: summary } = useQuery(
    ["summary"],
    async ({ signal }) => {
      const [response] = await Promise.all([
        api.get<{ summary: SummaryItem[] }>("/summary", { signal }),
        sleep(1000),
      ]);

      return response.data.summary;
    },
    { suspense: true },
  );

  function handleNavigateToHabit(date: string) {
    return () => {
      navigate("habit", { date });
    };
  }

  return (
    <View className="flex-row flex-wrap">
      {summaryDates.map(date => {
        const dayInSummary = summary?.find(day => {
          return dayjs(date).isSame(day.date, "day");
        });

        return (
          <HabitDay
            key={date.toISOString()}
            date={date}
            amount={dayInSummary?.amount}
            completed={dayInSummary?.completed}
            onPress={handleNavigateToHabit(date.toISOString())}
          />
        );
      })}

      {amountOfDaysToFill.map(number => (
        <View
          key={number}
          style={{ width: daySize, height: daySize }}
          className="bg-zinc-900 border-2 border-zinc-800 rounded-lg m-1 opacity-40"
        />
      ))}
    </View>
  );
};
