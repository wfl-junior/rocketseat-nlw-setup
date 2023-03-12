import classNames from "classnames";

interface SkeletonProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "children"> {}

export const Skeleton: React.FC<SkeletonProps> = ({ className, ...props }) => (
  <div
    {...props}
    role="alert"
    aria-busy="true"
    aria-live="polite"
    className={classNames(
      "animate-pulse bg-zinc-900 border-zinc-800 border-2",
      className,
    )}
  >
    <span className="sr-only">Carregando...</span>
  </div>
);
