import { Plus } from "phosphor-react";
import logo from "~/assets/logo.svg";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => (
  <div className="w-full max-w-3xl mx-auto flex items-center justify-between">
    <img src={logo} alt="Habits" />

    <button
      type="button"
      className="border border-violet-500 font-semibold rounded-lg px-6 py-4 flex items-center gap-3 hover:border-violet-300 transition-colors group"
    >
      <Plus
        size={20}
        className="text-violet-500 group-hover:text-violet-300 transition-colors"
      />
      Novo hábito
    </button>
  </div>
);
