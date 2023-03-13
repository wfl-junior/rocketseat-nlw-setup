import dayjs from "dayjs";
import { Fragment } from "react";
import { useQuery } from "react-query";
import { api } from "~/lib/axios";
import { generateDatesFromYearBeginning } from "~/utils/generate-dates-from-year-beginning";
import { sleep } from "~/utils/sleep";
import { HabitDay } from "./HabitDay";

const summaryDates = generateDatesFromYearBeginning();
const minimumSummaryDatesSize = 18 * 7; // 18 weeks

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

interface SummaryTableHabitsProps {}

export const SummaryTableHabits: React.FC<SummaryTableHabitsProps> = () => {
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

  return (
    <Fragment>
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
          />
        );
      })}

      {amountOfDaysToFill.map(number => (
        <div
          key={number}
          className="aspect-square w-9 sm:w-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg cursor-not-allowed opacity-40"
        />
      ))}
    </Fragment>
  );
};
