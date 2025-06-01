import { useState } from 'react';
import { motion } from 'framer-motion';
import { calculateAffordability, formatCurrency } from '../utils/mortgageCalculations';

const AffordabilityCalculator = () => {
  const [monthlyIncome, setMonthlyIncome] = useState(8000);
  const [monthlyDebts, setMonthlyDebts] = useState(1000);
  const [interestRate, setInterestRate] = useState(4.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [downPayment, setDownPayment] = useState(60000);
  const [propertyTax, setPropertyTax] = useState(3000);
  const [homeInsurance, setHomeInsurance] = useState(1200);
  
  const { maxMonthlyPayment, maxLoanAmount, maxHomePrice } = calculateAffordability(
    monthlyIncome,
    monthlyDebts,
    interestRate,
    loanTerm,
    downPayment,
    propertyTax,
    homeInsurance
  );

  return (
    <motion.div 
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Affordability Calculator</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="monthlyIncome" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Monthly Household Income
            </label>
            <input
              type="number"
              id="monthlyIncome"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(Number(e.target.value))}
              className="input-field"
            />
          </div>
          
          <div>
            <label htmlFor="monthlyDebts" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Monthly Debt Payments
            </label>
            <input
              type="number"
              id="monthlyDebts"
              value={monthlyDebts}
              onChange={(e) => setMonthlyDebts(Number(e.target.value))}
              className="input-field"
            />
          </div>
          
          <div>
            <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Interest Rate (%)
            </label>
            <input
              type="number"
              id="interestRate"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="input-field"
              step="0.125"
            />
          </div>
          
          <div>
            <label htmlFor="loanTerm" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Loan Term (Years)
            </label>
            <select
              id="loanTerm"
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
              className="input-field"
            >
              <option value={30}>30 Years</option>
              <option value={20}>20 Years</option>
              <option value={15}>15 Years</option>
              <option value={10}>10 Years</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="downPayment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Down Payment
            </label>
            <input
              type="number"
              id="downPayment"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="input-field"
            />
          </div>
          
          <div>
            <label htmlFor="propertyTax" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Annual Property Tax
            </label>
            <input
              type="number"
              id="propertyTax"
              value={propertyTax}
              onChange={(e) => setPropertyTax(Number(e.target.value))}
              className="input-field"
            />
          </div>
          
          <div>
            <label htmlFor="homeInsurance" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Annual Home Insurance
            </label>
            <input
              type="number"
              id="homeInsurance"
              value={homeInsurance}
              onChange={(e) => setHomeInsurance(Number(e.target.value))}
              className="input-field"
            />
          </div>
        </div>
        
        <div className="flex flex-col justify-center">
          <div className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-lg p-6 space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Maximum Monthly Payment</h3>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {formatCurrency(maxMonthlyPayment)}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Maximum Loan Amount</h3>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {formatCurrency(maxLoanAmount)}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Maximum Home Price</h3>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {formatCurrency(maxHomePrice)}
              </div>
            </div>
          </div>
          
          <div className="mt-6 bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-medium">💡 Affordability Tip:</span> Lenders typically use the 28/36 rule: your housing expenses shouldn't exceed 28% of your gross monthly income, and total debt payments shouldn't exceed 36%.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AffordabilityCalculator;
