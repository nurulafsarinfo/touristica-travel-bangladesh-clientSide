import { Link } from "react-router";
import { FaLock } from "react-icons/fa";
import { motion } from "framer-motion";

const Forbidden = () => {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-base-100 text-center p-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-md w-full flex flex-col items-center space-y-4">
        <motion.div
          className="bg-error/10 p-6 rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        >
          <FaLock className="text-6xl text-error animate-pulse" />
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-bold text-error">403 Forbidden</h1>
        <p className="text-base-content text-lg">
          Oops! You don't have permission to access this page.
        </p>

        <Link to="/" className="btn btn-primary btn-wide mt-4">
          Back to Home
        </Link>
      </div>

    </motion.div>
  );
};

export default Forbidden;
