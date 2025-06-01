import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMortgage } from '../context/MortgageContext';
import { calculateLoanComparison, formatCurrency } from '../utils/mortgageCalculations';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const LoanComparisonChart = () => {
  const { mortgageDetails } = useMortgage();
  const [comparisonData, setComparisonData] = useState<any[]>([]);
  
  useEffect(() => {
    // Generate comparison data for different interest rates and terms
    const interestRates = [
      mortgageDetails.interestRate - 1,
      mortgageDetails.interestRate - 0.5,
      mortgageDetails.interestRate,
      mortgageDetails.interestRate + 0.5,
      mortgageDetails.interestRate + 1,
    ].filter(rate => rate > 0);
    
    const loanTerms = [15, 30];
    
    const comparisons = calculateLoanComparison(
      mortgageDetails.loanAmount,
      interestRates,
      loanTerms
    );
    
    setComparisonData(comparisons);
  }, [mortgageDetails.loanAmount, mortgageDetails.interestRate]);
  
  const chartData = {
    labels: comparisonData.map(item => item.name),
    datasets: [
      {
        label: 'Monthly Payment',
        data: comparisonData.map(item => item.monthlyPayment),
        backgroundColor: 'rgba(14, 165, 233, 0.8)',
        borderColor: 'rgba(14, 165, 233, 1)',
        borderWidth: 1,
      },
      {
        label: 'Total Interest',
        data: comparisonData.map(item => item.totalInterest / 1000), // Divide by 1000 to show in thousands
        backgroundColor: 'rgba(139, 92, 246, 0.8)',
        borderColor: 'rgba(139, 92, 246, 1)',
        borderWidth: 1,
      },
    ],
  };
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: document.documentElement.classList.contains('dark') ? '#e5e7eb' : '#4b5563',
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              if (context.datasetIndex === 1) {
                // Total interest is divided by 1000 in the chart
                label += formatCurrency(context.parsed.y * 1000);
              } else {
                label += formatCurrency(context.parsed.y);
              }
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: document.documentElement.classList.contains('dark') ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: document.documentElement.classList.contains('dark') ? '#e5e7eb' : '#4b5563',
        },
      },
      y: {
        grid: {
          color: document.documentElement.classList.contains('dark') ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: document.documentElement.classList.contains('dark') ? '#e5e7eb' : '#4b5563',
          callback: function(value: any) {
            return formatCurrency(value);
          }
        },
      },
    },
  };

  return (
    <motion.div 
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Loan Comparison</h2>
      
      <div className="h-80">
        <Bar data={chartData} options={chartOptions} />
      </div>
      
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-dark-200">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Loan Type
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Interest Rate
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Monthly Payment
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Total Interest
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Total Payment
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-dark-100 divide-y divide-gray-200 dark:divide-gray-700">
            {comparisonData.map((item, index) => (
              <motion.tr 
                key={item.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`hover:bg-gray-50 dark:hover:bg-dark-200 ${
                  item.interestRate === mortgageDetails.interestRate && item.loanTerm === mortgageDetails.loanTerm
                    ? 'bg-primary-50 dark:bg-primary-900/20'
                    : ''
                }`}
              >
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                  {item.name}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                  {item.interestRate.toFixed(2)}%
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                  {formatCurrency(item.monthlyPayment)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                  {formatCurrency(item.totalInterest)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                  {formatCurrency(item.totalPayment)}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Comparison Insights</h3>
        <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <span className="font-medium">💡 Analysis:</span> A 15-year mortgage typically has a lower interest rate but higher monthly payments. While a 30-year mortgage offers lower monthly payments, you'll pay significantly more in interest over the life of the loan. Consider your budget and long-term financial goals when choosing.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default LoanComparisonChart;
