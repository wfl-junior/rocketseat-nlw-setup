import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { QueryErrorResetBoundary } from "react-query";
import { daySize } from "~/components/HabitDay";
import { Header } from "~/components/Header";
import { SummaryTable } from "~/components/SummaryTable";
import { SummaryTableSkeleton } from "~/components/SummaryTableSkeleton";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
  return (
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

      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
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
                    className="border border-violet-500 rounded-lg px-6 py-4 flex items-center justify-center mt-4"
                  >
                    <Text className="text-white text-base font-semibold">
                      Tentar novamente
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            >
              <Suspense fallback={<SummaryTableSkeleton />}>
                <SummaryTable />
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </ScrollView>
    </View>
  );
};
