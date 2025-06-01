export interface MortgageDetails {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  downPayment: number;
  propertyTax: number;
  homeInsurance: number;
  pmi: number;
  extraPayments: ExtraPayment[];
  startDate: Date;
}

export interface ExtraPayment {
  month: number;
  amount: number;
}

export interface AmortizationScheduleItem {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  extraPayment: number;
  balance: number;
  date: Date;
}

export interface MortgageRates {
  thirtyYearFixed: number;
  fifteenYearFixed: number;
  fiveOneArm: number;
  sevenOneArm: number;
  lastUpdated: string;
}

export interface LoanComparison {
  id: string;
  name: string;
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
}

export interface EducationalTip {
  id: string;
  title: string;
  content: string;
  category: 'basic' | 'advanced' | 'strategy';
}
