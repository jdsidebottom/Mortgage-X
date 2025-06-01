import { motion } from 'framer-motion';
import LoanComparisonChart from '../components/LoanComparisonChart';

const Comparison = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Loan Comparison</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Compare different loan options to find the best mortgage for your needs.
        </p>
      </motion.div>
      
      <LoanComparisonChart />
    </div>
  );
};

export default Comparison;
