interface ProgressBarProps {
  progress: number;
  label: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  label,
}) => (
  <div className="h-3 rounded-xl w-full bg-zinc-700 mt-4">
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuenow={progress}
      aria-valuemax={100}
      className="h-full rounded-xl bg-violet-600"
      style={{ width: `${progress}%` }}
    />
  </div>
);
