import * as Popover from "@radix-ui/react-popover";
import classNames from "classnames";
import { ProgressBar } from "./ProgressBar";

interface HabitDayProps {
  amount: number;
  completed: number;
}

export const HabitDay: React.FC<HabitDayProps> = ({ amount, completed }) => {
  const completedPercentage = Math.round((completed / amount) * 100);

  return (
    <Popover.Root>
      <Popover.Trigger
        className={classNames("aspect-square w-10 border-2 rounded-lg", {
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
        })}
      />

      <Popover.Portal>
        <Popover.Content className="min-w-[20rem] rounded-2xl p-6 bg-zinc-900 flex flex-col">
          <Popover.Arrow className="fill-zinc-900 h-2 w-4" />
          <span className="font-semibold text-zinc-400">Terça-feira</span>

          <span className="mt-1 font-extrabold leading-tight text-3xl">
            17/01
          </span>

          <ProgressBar
            progress={completedPercentage}
            label="Progresso de hábitos completados neste dia"
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
