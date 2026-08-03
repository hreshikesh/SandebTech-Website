import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import "./SuccessModal.css";

function SuccessModal({
  open,
  userName = "User",
  onFinish,
}) {

  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      onFinish();
    }, 2500);

    return () => clearTimeout(timer);
  }, [open, onFinish]);

  return (
    /* AnimatePresence must surround the conditional logic block natively */
    <AnimatePresence>
      {open && (
        <motion.div
          className="success-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="success-modal"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="success-icon-wrapper"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.2,
                type: "spring",
                stiffness: 250
              }}
            >
              <Check
                size={90}
                className="success-icon"
              />
            </motion.div>

            <h2>
              Welcome,
              <br />
              {userName}
            </h2>

            <p>Authentication Successful</p>

            <span>Redirecting...</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SuccessModal;