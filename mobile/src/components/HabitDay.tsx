import classNames from "classnames";
import dayjs from "dayjs";
import {
  Dimensions,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

const weekDays = 7;
const screenHorizontalPadding = (32 * 2) / 5;

export const dayMarginBetween = 8;
export const daySize =
  Dimensions.get("screen").width / weekDays - (screenHorizontalPadding + 5);

interface HabitDayProps extends TouchableOpacityProps {
  date: Date;
  amount?: number;
  completed?: number;
}

export const HabitDay: React.FC<HabitDayProps> = ({
  date,
  amount = 0,
  completed = 0,
  ...props
}) => {
  const isToday = dayjs().isSame(date, "day");
  const completedPercentage =
    amount > 0 ? Math.round((completed / amount) * 100) : 0;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{ width: daySize, height: daySize }}
      className={classNames("m-1 border-2 rounded-lg", {
        "bg-violet-500 border-violet-400": completedPercentage >= 80,
        "bg-violet-600 border-violet-500":
          completedPercentage >= 60 && completedPercentage < 80,
        "bg-violet-700 border-violet-600":
          completedPercentage >= 40 && completedPercentage < 60,
        "bg-violet-800 border-violet-700":
          completedPercentage >= 20 && completedPercentage < 40,
        "bg-violet-900 border-violet-800":
          completedPercentage > 0 && completedPercentage < 20,
        "bg-zinc-900 border-zinc-800": completedPercentage === 0,
        "border-violet-600": isToday,
      })}
      {...props}
    />
  );
};
