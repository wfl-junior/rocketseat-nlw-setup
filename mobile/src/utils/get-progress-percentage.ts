import { clamp } from "./clamp";

export function getProgressPercentage(amount: number, completed: number) {
  if (amount <= 0) {
    return 0;
  }

  return clamp(0, Math.round((completed / amount) * 100), 100);
}
