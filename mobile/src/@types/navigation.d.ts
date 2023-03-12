import type { HabitParams } from "~/screens/Habit";

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      habit: HabitParams;
      new: undefined;
    }
  }
}
