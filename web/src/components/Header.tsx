import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, X } from "phosphor-react";
import { useState } from "react";
import { Button } from "./Button";
import { Logo } from "./Logo";
import { NewHabitForm } from "./NewHabitForm";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <header className="w-full max-w-3xl mx-auto flex items-center justify-between flex-col xs:flex-row gap-6">
      <Logo />

      <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
        <Dialog.Trigger asChild>
          <Button className="group w-full xs:w-max focus-visible:ring-offset-background">
            <Plus
              size={20}
              className="text-violet-500 group-hover:text-violet-300 transition-colors"
            />
            Novo hábito
          </Button>
        </Dialog.Trigger>

        <AnimatePresence>
          {isModalOpen && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay forceMount asChild>
                <motion.div
                  className="fixed inset-0 bg-black/30 backdrop-blur-xs"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ ease: "easeInOut", duration: 0.3 }}
                />
              </Dialog.Overlay>

              <Dialog.Content forceMount asChild>
                <div className="max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full fixed">
                  <motion.div
                    className="p-10 bg-zinc-900 rounded-2xl flex flex-col gap-6"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.35 },
                    }}
                    exit={{ opacity: 0, y: -25, transition: { duration: 0.2 } }}
                    transition={{ ease: "easeInOut" }}
                  >
                    <Dialog.Close
                      title="Fechar"
                      className="absolute right-6 top-6 text-zinc-400 hover:text-zinc-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 rounded-full"
                    >
                      <X size={24} />
                    </Dialog.Close>

                    <Dialog.Title className="text-2xl sm:text-2xl leading-tight font-extrabold">
                      Criar hábito
                    </Dialog.Title>

                    <NewHabitForm />
                  </motion.div>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </header>
  );
};
