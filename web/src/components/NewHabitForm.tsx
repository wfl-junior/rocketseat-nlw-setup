import { Check, CircleNotch } from "phosphor-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { api } from "~/lib/axios";
import { Checkbox } from "./Checkbox";

const availableWeekDays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

interface NewHabitFormProps {}

export const NewHabitForm: React.FC<NewHabitFormProps> = () => {
  const [title, setTitle] = useState("");
  const [weekDays, setWeekDays] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleCreateNewHabit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newTitle = title.trim();

    if (!newTitle) {
      return toast("O título é obrigatório.", { type: "error" });
    }

    if (weekDays.length === 0) {
      return toast("É obrigatório preencher pelo menos um dia da semana.", {
        type: "error",
      });
    }

    setIsSubmitting(true);

    try {
      await api.post("/habits", {
        title: newTitle,
        weekDays,
      });

      toast("Novo hábito cadastrado com sucesso.", { type: "success" });
      setTitle("");
      setWeekDays([]);
    } catch {
      toast("Ocorreu um erro ao cadastrar o novo hábito.", { type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleToggleWeekDay(weekDayIndex: number) {
    return () => {
      setWeekDays(currentWeekDays => {
        if (currentWeekDays.includes(weekDayIndex)) {
          return currentWeekDays.filter(weekDay => weekDay !== weekDayIndex);
        }

        return [...currentWeekDays, weekDayIndex];
      });
    };
  }

  return (
    <form onSubmit={handleCreateNewHabit} className="w-full flex flex-col">
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual seu comprometimento?
      </label>

      <input
        autoFocus
        id="title"
        type="text"
        name="title"
        value={title}
        onChange={event => setTitle(event.target.value)}
        placeholder="Ex.: Exercícios, dormir bem, etc..."
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 border-2 focus-visible:outline-none focus:border-violet-500 border-zinc-800"
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Qual a recorrência?
      </label>

      <div className="mt-3 flex flex-col gap-2">
        {availableWeekDays.map((weekDay, index) => (
          <Checkbox
            key={weekDay}
            checked={weekDays.includes(index)}
            onCheckedChange={handleToggleWeekDay(index)}
          >
            <span className="leading-tight">{weekDay}</span>
          </Checkbox>
        ))}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 rounded-lg p-4 gap-3 flex items-center font-semibold bg-green-600 hover:enabled:bg-green-700 transition-colors justify-center disabled:bg-zinc-600 disabled:cursor-not-allowed focus-visible:ring-offset-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-green-600"
      >
        {isSubmitting ? (
          <CircleNotch size={20} weight="bold" className="animate-spin" />
        ) : (
          <Check size={20} weight="bold" />
        )}
        Confirmar
      </button>
    </form>
  );
};
