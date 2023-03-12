import { Check } from "phosphor-react";

interface NewHabitFormProps {}

export const NewHabitForm: React.FC<NewHabitFormProps> = () => {
  return (
    <form className="w-full flex flex-col">
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual seu comprometimento?
      </label>

      <input
        autoFocus
        id="title"
        type="text"
        name="title"
        placeholder="Ex.: Exercícios, dormir bem, etc..."
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 border-2 focus:outline-none focus:border-green-600 border-zinc-800"
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Qual a recorrência?
      </label>

      <button
        type="submit"
        className="mt-6 rounded-lg p-4 gap-3 flex items-center font-semibold bg-green-600 hover:bg-green-700 transition-colors justify-center"
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  );
};
