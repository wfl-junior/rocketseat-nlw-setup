import { motion } from "framer-motion";

interface AnimatedCheckProps extends React.ComponentPropsWithoutRef<"svg"> {
  size?: number;
}

export const AnimatedCheck: React.FC<AnimatedCheckProps> = ({
  size = 32,
  ...props
}) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={3}
    stroke="currentColor"
    width={size}
    height={size}
    {...props}
  >
    <motion.path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 13l4 4L19 7"
      initial={{ pathLength: 0 }}
      animate={{
        pathLength: 1,
        transition: {
          duration: 0.3,
          type: "tween",
          ease: "easeOut",
          delay: 0.1,
        },
      }}
      exit={{
        pathLength: 0,
        transition: {
          duration: 0.15,
          type: "tween",
          ease: "easeIn",
        },
      }}
    />
  </svg>
);
