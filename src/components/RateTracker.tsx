import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMortgage } from '../context/MortgageContext';
import { formatPercent } from '../utils/mortgageCalculations';

interface RateHistory {
  date: string;
  thirtyYearFixed: number;
  fifteenYearFixed: number;
  fiveOneArm: number;
}

const RateTracker = () => {
  const { currentRates, isLoading } = useMortgage();
  const [rateHistory, setRateHistory] = useState<RateHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // Generate some historical data for demonstration
  useEffect(() => {
    const generateHistoricalRates = () => {
      const today = new Date();
      const history: RateHistory[] = [];
      
      // Generate data for the past 7 days
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        
        // Base rates with small random variations
        const baseThirty = 6.5 + (Math.random() * 0.4 - 0.2);
        const baseFifteen = baseThirty - 0.75 + (Math.random() * 0.2 - 0.1);
        const baseFiveOne = baseThirty - 1.25 + (Math.random() * 0.3 - 0.15);
        
        history.push({
          date: date.toISOString().split('T')[0],
          thirtyYearFixed: parseFloat(baseThirty.toFixed(2)),
          fifteenYearFixed: parseFloat(baseFifteen.toFixed(2)),
          fiveOneArm: parseFloat(baseFiveOne.toFixed(2))
        });
      }
      
      setRateHistory(history);
    };
    
    generateHistoricalRates();
  }, []);

  // Add current rates to history when they update
  useEffect(() => {
    if (!isLoading && currentRates.lastUpdated) {
      const today = new Date().toISOString().split('T')[0];
      const existingToday = rateHistory.find(item => item.date === today);
      
      if (!existingToday) {
        setRateHistory(prev => [
          ...prev, 
          {
            date: today,
            thirtyYearFixed: currentRates.thirtyYearFixed,
            fifteenYearFixed: currentRates.fifteenYearFixed,
            fiveOneArm: currentRates.fiveOneArm
          }
        ]);
      }
    }
  }, [currentRates, isLoading, rateHistory]);

  // Calculate rate changes
  const getRateChange = (_: number, history: RateHistory[]) => {
    if (history.length < 2) return { value: 0, direction: 'neutral' };
    
    const yesterday = history[history.length - 2];
    const today = history[history.length - 1];
    
    if (!yesterday || !today) return { value: 0, direction: 'neutral' };
    
    // Compare with 30-year fixed rate
    const change = today.thirtyYearFixed - yesterday.thirtyYearFixed;
    const direction = change > 0 ? 'up' : change < 0 ? 'down' : 'neutral';
    
    return { value: Math.abs(change), direction };
  };

  const rateChange = getRateChange(currentRates.thirtyYearFixed, rateHistory);

  return (
    <div className="card">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Real-Time Rate Tracker
      </h2>
      
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Last updated: {new Date(currentRates.lastUpdated).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center">
                {rateChange.direction !== 'neutral' && (
                  <div className={`flex items-center mr-2 ${
                    rateChange.direction === 'up' 
                      ? 'text-red-500 dark:text-red-400' 
                      : 'text-green-500 dark:text-green-400'
                  }`}>
                    {rateChange.direction === 'up' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1v-5a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" />
                      </svg>
                    )}
                    <span className="text-xs ml-1">{rateChange.value.toFixed(2)}%</span>
                  </div>
                )}
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="text-xs text-primary-600 dark:text-primary-400 hover:underline"
                >
                  {showHistory ? 'Hide History' : 'Show History'}
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <motion.div 
                className="bg-gray-50 dark:bg-dark-200 p-4 rounded-lg"
                whileHover={{ y: -2, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="text-sm text-gray-500 dark:text-gray-400">30-Year Fixed</div>
                <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  {formatPercent(currentRates.thirtyYearFixed)}
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-gray-50 dark:bg-dark-200 p-4 rounded-lg"
                whileHover={{ y: -2, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="text-sm text-gray-500 dark:text-gray-400">15-Year Fixed</div>
                <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  {formatPercent(currentRates.fifteenYearFixed)}
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-gray-50 dark:bg-dark-200 p-4 rounded-lg"
                whileHover={{ y: -2, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="text-sm text-gray-500 dark:text-gray-400">5/1 ARM</div>
                <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  {formatPercent(currentRates.fiveOneArm)}
                </div>
              </motion.div>
            </div>
            
            {showHistory && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4"
              >
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">7-Day Rate History</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-dark-200">
                      <tr>
                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          30-Year Fixed
                        </th>
                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          15-Year Fixed
                        </th>
                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          5/1 ARM
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-dark-100 divide-y divide-gray-200 dark:divide-gray-700">
                      {rateHistory.map((item) => (
                        <tr key={item.date} className="hover:bg-gray-50 dark:hover:bg-dark-200">
                          <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-600 dark:text-gray-400">
                            {new Date(item.date).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-800 dark:text-gray-200">
                            {formatPercent(item.thirtyYearFixed)}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-800 dark:text-gray-200">
                            {formatPercent(item.fifteenYearFixed)}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-800 dark:text-gray-200">
                            {formatPercent(item.fiveOneArm)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RateTracker;
