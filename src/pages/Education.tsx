import { motion } from 'framer-motion';
import EducationalContent from '../components/EducationalContent';

const Education = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Mortgage Education</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Learn about mortgages, interest rates, refinancing, and strategies to save money on your home loan.
        </p>
      </motion.div>
      
      <EducationalContent />
    </div>
  );
};

export default Education;
