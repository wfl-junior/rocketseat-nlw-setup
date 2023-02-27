import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/inter";
import { Fragment } from "react";
import { StatusBar, Text, View } from "react-native";
import { Loading } from "~/components/Loading";

const App: React.FC = () => {
  const [areFontsReady] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  return (
    <Fragment>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />

      <View
        style={{
          flex: 1,
          backgroundColor: "#09090A",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {areFontsReady ? (
          <Text style={{ color: "#A1A1AA", fontFamily: "Inter_800ExtraBold" }}>
            Open up App.tsx to start working on your app!
          </Text>
        ) : (
          <Loading />
        )}
      </View>
    </Fragment>
  );
};

export default App;
