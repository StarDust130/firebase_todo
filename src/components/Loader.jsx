
import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <motion.div
        className="p-4 rounded-lg text-6xl"
        animate={{ scale: [1, 2, 1], rotate: [0, 360, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        🚀
      </motion.div>
    </div>
  );
};

export default Loader;
