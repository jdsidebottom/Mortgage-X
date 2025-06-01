import { motion } from 'framer-motion';
import { useMortgage } from '../context/MortgageContext';
import { formatCurrency } from '../utils/mortgageCalculations';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const MortgageSummary = () => {
  const { 
    mortgageDetails, 
    monthlyPayment, 
    totalPayment, 
    totalInterest 
  } = useMortgage();
  
  const { loanAmount, propertyTax, homeInsurance, pmi, hoaFee } = mortgageDetails;
  
  // Calculate monthly components
  const monthlyPrincipalAndInterest = monthlyPayment - (propertyTax / 12) - (homeInsurance / 12) - (pmi / 12) - (hoaFee / 12);
  const monthlyPropertyTax = propertyTax / 12;
  const monthlyHomeInsurance = homeInsurance / 12;
  const monthlyPMI = pmi / 12;
  const monthlyHOA = hoaFee / 12;
  
  // Chart data
  const chartData = {
    labels: ['Principal', 'Interest', 'Property Tax', 'Insurance', 'PMI', 'HOA'],
    datasets: [
      {
        data: [
          loanAmount,
          totalInterest,
          propertyTax * mortgageDetails.loanTerm,
          homeInsurance * mortgageDetails.loanTerm,
          pmi * mortgageDetails.loanTerm,
          hoaFee * mortgageDetails.loanTerm
        ],
        backgroundColor: [
          'rgba(14, 165, 233, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(249, 115, 22, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(234, 179, 8, 0.8)'
        ],
        borderColor: [
          'rgba(14, 165, 233, 1)',
          'rgba(139, 92, 246, 1)',
          'rgba(249, 115, 22, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(234, 179, 8, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const chartOptions = {
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: document.documentElement.classList.contains('dark') ? '#e5e7eb' : '#4b5563',
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += formatCurrency(context.parsed);
            }
            return label;
          }
        }
      }
    },
    cutout: '60%',
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="card">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Mortgage Summary</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Monthly Payment</h3>
            <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {formatCurrency(monthlyPayment)}
            </div>
          </motion.div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Principal & Interest</span>
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{formatCurrency(monthlyPrincipalAndInterest)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Property Tax</span>
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{formatCurrency(monthlyPropertyTax)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Home Insurance</span>
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{formatCurrency(monthlyHomeInsurance)}</span>
            </div>
            {monthlyPMI > 0 && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">PMI</span>
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{formatCurrency(monthlyPMI)}</span>
              </div>
            )}
            {monthlyHOA > 0 && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">HOA Fee</span>
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{formatCurrency(monthlyHOA)}</span>
              </div>
            )}
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Loan Amount</span>
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{formatCurrency(loanAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Total Interest</span>
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{formatCurrency(totalInterest)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Total Payment</span>
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{formatCurrency(totalPayment)}</span>
            </div>
          </div>
        </div>
        
        <div className="h-64">
          <Doughnut data={chartData} options={chartOptions} />
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">AI Mortgage Tip</h3>
        <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <span className="font-medium">💡 Pro Tip:</span> Making bi-weekly payments instead of monthly can save you {formatCurrency(totalInterest * 0.08)} in interest over the life of your loan and help you pay off your mortgage {mortgageDetails.loanTerm * 0.08} years earlier.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MortgageSummary;
