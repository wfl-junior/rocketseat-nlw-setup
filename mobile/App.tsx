import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/inter";
import NetInfo from "@react-native-community/netinfo";
import { Fragment, useEffect } from "react";
import {
  AppState,
  AppStateStatus,
  Platform,
  StatusBar,
  View,
} from "react-native";
import { focusManager, onlineManager, QueryClientProvider } from "react-query";
import { Loading } from "~/components/Loading";
import "~/lib/dayjs";
import { queryClient } from "~/lib/react-query";
import { Routes } from "~/routes";

onlineManager.setEventListener(setOnline => {
  return NetInfo.addEventListener(state => {
    setOnline(Boolean(state.isConnected));
  });
});

function handleAppStateChange(status: AppStateStatus) {
  if (Platform.OS === "web") return;
  focusManager.setFocused(status === "active");
}

const App: React.FC = () => {
  const [areFontsReady] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange,
    );

    return () => subscription.remove();
  }, []);

  return (
    <Fragment>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />

      <QueryClientProvider client={queryClient}>
        {areFontsReady ? (
          <Routes />
        ) : (
          <View className="flex-1 bg-background justify-center items-center">
            <Loading />
          </View>
        )}
      </QueryClientProvider>
    </Fragment>
  );
};

export default App;
