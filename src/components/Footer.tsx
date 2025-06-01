import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer 
      className="py-4 px-6 text-center text-sm text-gray-600 dark:text-gray-400 mt-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      Copyright 2025 Jeff Sidebottom
    </motion.footer>
  );
};

export default Footer;
