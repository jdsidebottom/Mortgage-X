import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { calculateMortgage, calculateAmortizationSchedule } from '../utils/mortgageCalculations';
import { MortgageDetails, AmortizationScheduleItem, MortgageRates } from '../types';

interface MortgageContextType {
  mortgageDetails: MortgageDetails;
  updateMortgageDetails: (details: Partial<MortgageDetails>) => void;
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  amortizationSchedule: AmortizationScheduleItem[];
  currentRates: MortgageRates;
  isLoading: boolean;
  addExtraPayment: (amount: number, applyToMonth: number) => void;
  resetExtraPayments: () => void;
}

const defaultMortgageDetails: MortgageDetails = {
  loanAmount: 300000,
  interestRate: 4.5,
  loanTerm: 30,
  downPayment: 60000,
  propertyTax: 3000,
  homeInsurance: 1200,
  pmi: 0,
  extraPayments: [],
  startDate: new Date(),
};

const defaultRates: MortgageRates = {
  thirtyYearFixed: 6.5,
  fifteenYearFixed: 5.75,
  fiveOneArm: 5.25,
  sevenOneArm: 5.5,
  lastUpdated: new Date().toISOString(),
};

const MortgageContext = createContext<MortgageContextType | undefined>(undefined);

export function MortgageProvider({ children }: { children: ReactNode }) {
  const [mortgageDetails, setMortgageDetails] = useState<MortgageDetails>(defaultMortgageDetails);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [amortizationSchedule, setAmortizationSchedule] = useState<AmortizationScheduleItem[]>([]);
  const [currentRates, setCurrentRates] = useState<MortgageRates>(defaultRates);
  const [isLoading, setIsLoading] = useState(false);

  // Calculate mortgage details whenever inputs change
  useEffect(() => {
    const { payment, totalPaid, totalInterestPaid } = calculateMortgage(mortgageDetails);
    setMonthlyPayment(payment);
    setTotalPayment(totalPaid);
    setTotalInterest(totalInterestPaid);
    
    const schedule = calculateAmortizationSchedule(mortgageDetails);
    setAmortizationSchedule(schedule);
  }, [mortgageDetails]);

  // Simulate fetching current mortgage rates
  useEffect(() => {
    const fetchRates = async () => {
      setIsLoading(true);
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would fetch from an API
      // For now, we'll use slightly randomized rates
      const randomFactor = Math.random() * 0.5 - 0.25; // -0.25 to +0.25
      
      setCurrentRates({
        thirtyYearFixed: parseFloat((defaultRates.thirtyYearFixed + randomFactor).toFixed(2)),
        fifteenYearFixed: parseFloat((defaultRates.fifteenYearFixed + randomFactor).toFixed(2)),
        fiveOneArm: parseFloat((defaultRates.fiveOneArm + randomFactor).toFixed(2)),
        sevenOneArm: parseFloat((defaultRates.sevenOneArm + randomFactor).toFixed(2)),
        lastUpdated: new Date().toISOString(),
      });
      
      setIsLoading(false);
    };
    
    fetchRates();
    
    // Refresh rates every 30 minutes
    const intervalId = setInterval(fetchRates, 30 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  const updateMortgageDetails = (details: Partial<MortgageDetails>) => {
    setMortgageDetails(prev => ({ ...prev, ...details }));
  };

  const addExtraPayment = (amount: number, applyToMonth: number) => {
    setMortgageDetails(prev => {
      const updatedExtraPayments = [...prev.extraPayments];
      const existingIndex = updatedExtraPayments.findIndex(p => p.month === applyToMonth);
      
      if (existingIndex >= 0) {
        updatedExtraPayments[existingIndex] = { 
          ...updatedExtraPayments[existingIndex], 
          amount 
        };
      } else {
        updatedExtraPayments.push({ month: applyToMonth, amount });
      }
      
      return {
        ...prev,
        extraPayments: updatedExtraPayments,
      };
    });
  };

  const resetExtraPayments = () => {
    setMortgageDetails(prev => ({
      ...prev,
      extraPayments: [],
    }));
  };

  const value = {
    mortgageDetails,
    updateMortgageDetails,
    monthlyPayment,
    totalPayment,
    totalInterest,
    amortizationSchedule,
    currentRates,
    isLoading,
    addExtraPayment,
    resetExtraPayments,
  };

  return <MortgageContext.Provider value={value}>{children}</MortgageContext.Provider>;
}

export function useMortgage() {
  const context = useContext(MortgageContext);
  if (context === undefined) {
    throw new Error('useMortgage must be used within a MortgageProvider');
  }
  return context;
}
