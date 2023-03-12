import * as Dialog from "@radix-ui/react-dialog";
import { Plus, X } from "phosphor-react";
import { Logo } from "./Logo";
import { NewHabitForm } from "./NewHabitForm";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => (
  <header className="w-full max-w-3xl mx-auto flex items-center justify-between">
    <Logo />

    <Dialog.Root>
      <Dialog.Trigger
        type="button"
        className="border border-violet-500 font-semibold rounded-lg px-6 py-4 flex items-center gap-3 hover:border-violet-300 transition-colors group"
      >
        <Plus
          size={20}
          className="text-violet-500 group-hover:text-violet-300 transition-colors"
        />
        Novo hábito
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-xs" />

        <Dialog.Content className="fixed p-10 bg-zinc-900 rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-6">
          <Dialog.Close
            title="Fechar"
            className="absolute right-6 top-6 text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            <X size={24} />
          </Dialog.Close>

          <Dialog.Title className="text-3xl leading-tight font-extrabold">
            Criar hábito
          </Dialog.Title>

          <NewHabitForm />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  </header>
);
