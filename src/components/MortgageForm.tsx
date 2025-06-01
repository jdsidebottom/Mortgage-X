import { useState } from 'react';
import { motion } from 'framer-motion';
import { useMortgage } from '../context/MortgageContext';
import { formatCurrency, formatPercent } from '../utils/mortgageCalculations';

const MortgageForm = () => {
  const { mortgageDetails, updateMortgageDetails, currentRates } = useMortgage();
  const [homePrice, setHomePrice] = useState(mortgageDetails.loanAmount + mortgageDetails.downPayment);
  
  const handleHomePriceChange = (value: number) => {
    setHomePrice(value);
    // Maintain the same down payment percentage
    const downPaymentPercent = mortgageDetails.downPayment / (mortgageDetails.loanAmount + mortgageDetails.downPayment);
    const newDownPayment = Math.round(value * downPaymentPercent);
    updateMortgageDetails({
      downPayment: newDownPayment,
      loanAmount: value - newDownPayment
    });
  };
  
  const handleDownPaymentChange = (value: number) => {
    updateMortgageDetails({
      downPayment: value,
      loanAmount: homePrice - value
    });
  };
  
  const handleRatePreset = (rate: number) => {
    updateMortgageDetails({ interestRate: rate });
  };
  
  const handleTermPreset = (term: number) => {
    updateMortgageDetails({ loanTerm: term });
  };

  return (
    <div className="card">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Mortgage Details</h2>
      
      <div className="space-y-6">
        {/* Home Price */}
        <div>
          <div className="flex justify-between mb-2">
            <label htmlFor="homePrice" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Home Price
            </label>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {formatCurrency(homePrice)}
            </span>
          </div>
          <input
            type="range"
            id="homePrice"
            min="50000"
            max="2000000"
            step="5000"
            value={homePrice}
            onChange={(e) => handleHomePriceChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
            <span>$50,000</span>
            <span>$2,000,000</span>
          </div>
        </div>
        
        {/* Down Payment */}
        <div>
          <div className="flex justify-between mb-2">
            <label htmlFor="downPayment" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Down Payment
            </label>
            <div className="text-sm">
              <span className="text-gray-500 dark:text-gray-400">
                {formatCurrency(mortgageDetails.downPayment)}
              </span>
              <span className="ml-1 text-gray-400 dark:text-gray-500">
                ({((mortgageDetails.downPayment / homePrice) * 100).toFixed(1)}%)
              </span>
            </div>
          </div>
          <input
            type="range"
            id="downPayment"
            min="0"
            max={homePrice * 0.8}
            step="1000"
            value={mortgageDetails.downPayment}
            onChange={(e) => handleDownPaymentChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
            <span>$0</span>
            <span>{formatCurrency(homePrice * 0.8)}</span>
          </div>
        </div>
        
        {/* Loan Amount */}
        <div>
          <div className="flex justify-between mb-2">
            <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Loan Amount
            </label>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {formatCurrency(mortgageDetails.loanAmount)}
            </span>
          </div>
          <input
            type="number"
            id="loanAmount"
            value={mortgageDetails.loanAmount}
            onChange={(e) => updateMortgageDetails({ loanAmount: Number(e.target.value) })}
            className="input-field"
          />
        </div>
        
        {/* Interest Rate */}
        <div>
          <div className="flex justify-between mb-2">
            <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Interest Rate
            </label>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {formatPercent(mortgageDetails.interestRate)}
            </span>
          </div>
          <div className="flex space-x-2 mb-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleRatePreset(currentRates.thirtyYearFixed)}
              className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              30Y ({currentRates.thirtyYearFixed.toFixed(2)}%)
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleRatePreset(currentRates.fifteenYearFixed)}
              className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              15Y ({currentRates.fifteenYearFixed.toFixed(2)}%)
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleRatePreset(currentRates.fiveOneArm)}
              className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              5/1 ARM ({currentRates.fiveOneArm.toFixed(2)}%)
            </motion.button>
          </div>
          <input
            type="range"
            id="interestRate"
            min="1"
            max="10"
            step="0.125"
            value={mortgageDetails.interestRate}
            onChange={(e) => updateMortgageDetails({ interestRate: Number(e.target.value) })}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
            <span>1%</span>
            <span>10%</span>
          </div>
        </div>
        
        {/* Loan Term */}
        <div>
          <div className="flex justify-between mb-2">
            <label htmlFor="loanTerm" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Loan Term (Years)
            </label>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {mortgageDetails.loanTerm} years
            </span>
          </div>
          <div className="flex space-x-2 mb-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleTermPreset(30)}
              className={`text-xs px-3 py-1 rounded ${
                mortgageDetails.loanTerm === 30 
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              30
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleTermPreset(20)}
              className={`text-xs px-3 py-1 rounded ${
                mortgageDetails.loanTerm === 20 
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              20
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleTermPreset(15)}
              className={`text-xs px-3 py-1 rounded ${
                mortgageDetails.loanTerm === 15 
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              15
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleTermPreset(10)}
              className={`text-xs px-3 py-1 rounded ${
                mortgageDetails.loanTerm === 10 
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              10
            </motion.button>
          </div>
          <input
            type="range"
            id="loanTerm"
            min="5"
            max="30"
            step="5"
            value={mortgageDetails.loanTerm}
            onChange={(e) => updateMortgageDetails({ loanTerm: Number(e.target.value) })}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
            <span>5 years</span>
            <span>30 years</span>
          </div>
        </div>
        
        {/* Additional Costs */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Additional Costs</h3>
          
          <div className="space-y-4">
            {/* Property Tax */}
            <div>
              <div className="flex justify-between mb-1">
                <label htmlFor="propertyTax" className="block text-sm text-gray-600 dark:text-gray-400">
                  Annual Property Tax
                </label>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {formatCurrency(mortgageDetails.propertyTax)}
                </span>
              </div>
              <input
                type="number"
                id="propertyTax"
                value={mortgageDetails.propertyTax}
                onChange={(e) => updateMortgageDetails({ propertyTax: Number(e.target.value) })}
                className="input-field"
              />
            </div>
            
            {/* Home Insurance */}
            <div>
              <div className="flex justify-between mb-1">
                <label htmlFor="homeInsurance" className="block text-sm text-gray-600 dark:text-gray-400">
                  Annual Home Insurance
                </label>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {formatCurrency(mortgageDetails.homeInsurance)}
                </span>
              </div>
              <input
                type="number"
                id="homeInsurance"
                value={mortgageDetails.homeInsurance}
                onChange={(e) => updateMortgageDetails({ homeInsurance: Number(e.target.value) })}
                className="input-field"
              />
            </div>
            
            {/* PMI */}
            <div>
              <div className="flex justify-between mb-1">
                <label htmlFor="pmi" className="block text-sm text-gray-600 dark:text-gray-400">
                  Annual PMI
                </label>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {formatCurrency(mortgageDetails.pmi)}
                </span>
              </div>
              <input
                type="number"
                id="pmi"
                value={mortgageDetails.pmi}
                onChange={(e) => updateMortgageDetails({ pmi: Number(e.target.value) })}
                className="input-field"
              />
            </div>
            
            {/* HOA Fee */}
            <div>
              <div className="flex justify-between mb-1">
                <label htmlFor="hoaFee" className="block text-sm text-gray-600 dark:text-gray-400">
                  Annual HOA Fee
                </label>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {formatCurrency(mortgageDetails.hoaFee)}
                </span>
              </div>
              <input
                type="number"
                id="hoaFee"
                value={mortgageDetails.hoaFee}
                onChange={(e) => updateMortgageDetails({ hoaFee: Number(e.target.value) })}
                className="input-field"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MortgageForm;
