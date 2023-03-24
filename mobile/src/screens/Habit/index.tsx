import { useRoute } from "@react-navigation/native";
import classNames from "classnames";
import dayjs from "dayjs";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { QueryErrorResetBoundary, useQuery } from "react-query";
import { BackButton } from "~/components/BackButton";
import { ProgressBar } from "~/components/ProgressBar";
import { SummaryItem } from "~/components/SummaryTable";
import { api } from "~/lib/axios";
import { getProgressPercentage } from "~/utils/get-progress-percentage";
import { HabitsList } from "./HabitsList";
import { HabitsListSkeleton } from "./HabitsListSkeleton";

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

  const { data: summary } = useQuery(
    ["summary"],
    async ({ signal }) => {
      const { data } = await api.get<{ summary: SummaryItem[] }>("/summary", {
        signal,
      });

      return data.summary;
    },
    {
      refetchOnMount: false,
    },
  );

  const dayInSummary = summary?.find(day => {
    return parsedDate.isSame(day.date, "day");
  });

  const amount = dayInSummary?.amount ?? 0;
  const completed = dayInSummary?.completed ?? 0;

  const isDateInPast = parsedDate.endOf("day").isBefore(new Date());
  const completedPercentage = getProgressPercentage(amount, completed);

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

        <ProgressBar progress={completedPercentage} />

        <View className={classNames("mt-6", { "opacity-50": isDateInPast })}>
          <QueryErrorResetBoundary>
            {({ reset }) => (
              <ErrorBoundary
                onReset={reset}
                fallbackRender={({ resetErrorBoundary }) => (
                  <View className="flex items-center">
                    <Text className="text-red-500 text-base font-medium">
                      Ocorreu um erro inesperado 😰
                    </Text>

                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => resetErrorBoundary()}
                      className="border border-violet-500 active:border-violet-600 rounded-lg px-6 py-4 flex items-center justify-center mt-4"
                    >
                      <Text className="text-white text-base font-semibold">
                        Tentar novamente
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              >
                <Suspense fallback={<HabitsListSkeleton />}>
                  <HabitsList date={date} />
                </Suspense>
              </ErrorBoundary>
            )}
          </QueryErrorResetBoundary>
        </View>

        {isDateInPast && (
          <Text className="text-violet-500 text-sm text-center mt-6">
            Você não pode editar hábitos de dias que já se passaram.
          </Text>
        )}
      </ScrollView>
    </View>
  );
};
