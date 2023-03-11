import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/inter";
import { Fragment } from "react";
import { StatusBar } from "react-native";
import { Loading } from "~/components/Loading";
import "~/lib/dayjs";
import { Home } from "~/screens/Home";

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

      {areFontsReady ? <Home /> : <Loading />}
    </Fragment>
  );
};

export default App;
