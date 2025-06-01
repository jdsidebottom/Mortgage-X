import { motion } from 'framer-motion';
import MortgageForm from '../components/MortgageForm';
import MortgageSummary from '../components/MortgageSummary';
import AmortizationTable from '../components/AmortizationTable';
import RateTracker from '../components/RateTracker';

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1 
        className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Mortgage Calculator
      </motion.h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          className="lg:col-span-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <MortgageForm />
          <div className="mt-6">
            <RateTracker />
          </div>
        </motion.div>
        
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <MortgageSummary />
          <div className="mt-6">
            <AmortizationTable />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
