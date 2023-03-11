import { Dimensions, TouchableOpacity } from "react-native";

const weekDays = 7;
const screenHorizontalPadding = (32 * 2) / 5;

export const dayMarginBetween = 8;
export const daySize =
  Dimensions.get("screen").width / weekDays - (screenHorizontalPadding + 5);

interface HabitDayProps {}

export const HabitDay: React.FC<HabitDayProps> = () => (
  <TouchableOpacity
    activeOpacity={0.7}
    style={{ width: daySize, height: daySize }}
    className="bg-zinc-900 border-2 border-zinc-800 rounded-lg m-1"
  />
);
