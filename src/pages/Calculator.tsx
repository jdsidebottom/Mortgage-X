import { motion } from 'framer-motion';
import MortgageForm from '../components/MortgageForm';
import MortgageSummary from '../components/MortgageSummary';
import AffordabilityCalculator from '../components/AffordabilityCalculator';

const Calculator = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Mortgage Calculator</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Calculate your monthly mortgage payment, view amortization schedules, and explore different loan scenarios.
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MortgageForm />
        <MortgageSummary />
      </div>
      
      <AffordabilityCalculator />
    </div>
  );
};

export default Calculator;
