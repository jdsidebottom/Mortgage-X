import { motion } from 'framer-motion';
import { useMortgage } from '../context/MortgageContext';
import { formatPercent } from '../utils/mortgageCalculations';

const RateDisplay = () => {
  const { currentRates, isLoading } = useMortgage();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: -10, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-dark-100 rounded-xl shadow-md p-4 flex justify-center items-center h-20">
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <motion.div 
      className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl shadow-md p-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <div className="mb-3 sm:mb-0">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Current Mortgage Rates
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Last updated: {new Date(currentRates.lastUpdated).toLocaleString()}
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center sm:justify-end gap-4">
          <motion.div 
            className="bg-white dark:bg-dark-200 px-5 py-3 rounded-lg shadow-sm border-l-4 border-primary-500"
            variants={itemVariants}
            whileHover={{ y: -2, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
          >
            <div className="text-xs font-medium text-gray-500 dark:text-gray-400">30-Year Fixed</div>
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              {formatPercent(currentRates.thirtyYearFixed)}
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-white dark:bg-dark-200 px-5 py-3 rounded-lg shadow-sm border-l-4 border-secondary-500"
            variants={itemVariants}
            whileHover={{ y: -2, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
          >
            <div className="text-xs font-medium text-gray-500 dark:text-gray-400">15-Year Fixed</div>
            <div className="text-2xl font-bold text-secondary-600 dark:text-secondary-400">
              {formatPercent(currentRates.fifteenYearFixed)}
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-white dark:bg-dark-200 px-5 py-3 rounded-lg shadow-sm border-l-4 border-tertiary-500"
            variants={itemVariants}
            whileHover={{ y: -2, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
          >
            <div className="text-xs font-medium text-gray-500 dark:text-gray-400">5/1 ARM</div>
            <div className="text-2xl font-bold text-tertiary-600 dark:text-tertiary-400">
              {formatPercent(currentRates.fiveOneArm)}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default RateDisplay;
