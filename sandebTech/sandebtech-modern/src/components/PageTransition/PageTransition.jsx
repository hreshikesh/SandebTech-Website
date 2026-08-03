import { motion } from "framer-motion";

function PageTransition({ children }) {
  return (
    <motion.main
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: -20,
      }}
      transition={{
        duration: 0.45,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.main>
  );
}

export default PageTransition;