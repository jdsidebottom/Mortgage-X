import { useState } from 'react';
import { motion } from 'framer-motion';
import { useMortgage } from '../context/MortgageContext';
import { formatCurrency, formatDate } from '../utils/mortgageCalculations';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const AmortizationTable = () => {
  const { amortizationSchedule, mortgageDetails, addExtraPayment } = useMortgage();
  const [currentPage, setCurrentPage] = useState(1);
  const [extraPaymentMonth, setExtraPaymentMonth] = useState<number | null>(null);
  const [extraPaymentAmount, setExtraPaymentAmount] = useState<number>(0);
  const [showExtraPaymentModal, setShowExtraPaymentModal] = useState(false);
  
  const itemsPerPage = 12;
  const totalPages = Math.ceil(amortizationSchedule.length / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, amortizationSchedule.length);
  const currentItems = amortizationSchedule.slice(startIndex, endIndex);
  
  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };
  
  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };
  
  const handleExtraPaymentClick = (month: number) => {
    setExtraPaymentMonth(month);
    
    // Find if there's an existing extra payment
    const existingPayment = mortgageDetails.extraPayments.find(p => p.month === month);
    setExtraPaymentAmount(existingPayment ? existingPayment.amount : 0);
    
    setShowExtraPaymentModal(true);
  };
  
  const handleSaveExtraPayment = () => {
    if (extraPaymentMonth !== null) {
      addExtraPayment(extraPaymentAmount, extraPaymentMonth);
      setShowExtraPaymentModal(false);
    }
  };
  
  const handleExportPDF = async () => {
    const element = document.getElementById('amortization-table');
    if (!element) return;
    
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('amortization-schedule.pdf');
  };
  
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Amortization Schedule</h2>
        <div className="flex space-x-2">
          <button 
            onClick={handleExportPDF}
            className="btn-outline text-sm"
          >
            Export PDF
          </button>
          <button 
            onClick={handlePrint}
            className="btn-outline text-sm"
          >
            Print
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto" id="amortization-table">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-dark-200">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Payment #
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Payment
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Principal
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Interest
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Extra Payment
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Balance
              </th>
              <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-dark-100 divide-y divide-gray-200 dark:divide-gray-700">
            {currentItems.map((item) => (
              <motion.tr 
                key={item.month}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: item.month * 0.03 }}
                className="hover:bg-gray-50 dark:hover:bg-dark-200"
              >
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                  {item.month}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                  {formatDate(item.date)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                  {formatCurrency(item.payment)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                  {formatCurrency(item.principal)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                  {formatCurrency(item.interest)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-green-600 dark:text-green-400">
                  {item.extraPayment > 0 ? formatCurrency(item.extraPayment) : '-'}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                  {formatCurrency(item.balance)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleExtraPaymentClick(item.month)}
                    className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300"
                  >
                    Add Extra
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Showing {startIndex + 1} to {endIndex} of {amortizationSchedule.length} payments
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="btn-outline text-sm disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="btn-outline text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
      
      {/* Extra Payment Modal */}
      {showExtraPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div 
            className="bg-white dark:bg-dark-100 rounded-lg p-6 max-w-md w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-4">
              Add Extra Payment for Month {extraPaymentMonth}
            </h3>
            <div className="mb-4">
              <label htmlFor="extraAmount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Extra Payment Amount
              </label>
              <input
                type="number"
                id="extraAmount"
                value={extraPaymentAmount}
                onChange={(e) => setExtraPaymentAmount(Number(e.target.value))}
                className="input-field"
                min="0"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowExtraPaymentModal(false)}
                className="btn-outline"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveExtraPayment}
                className="btn-primary"
              >
                Save
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AmortizationTable;
