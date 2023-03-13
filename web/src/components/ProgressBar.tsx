import { motion } from "framer-motion";

interface ProgressBarProps {
  progress: number;
  label: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  label,
}) => (
  <div className="h-3 rounded-xl w-full bg-zinc-700 mt-4">
    <motion.div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuenow={progress}
      aria-valuemax={100}
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ delay: 0.05, ease: "easeOut", duration: 0.4 }}
      className="h-full rounded-xl bg-violet-600"
    />
  </div>
);
