import { MortgageDetails, AmortizationScheduleItem } from '../types';

export function calculateMortgage(details: MortgageDetails) {
  const { loanAmount, interestRate, loanTerm, propertyTax, homeInsurance, pmi, hoaFee } = details;
  
  // Monthly interest rate
  const monthlyRate = interestRate / 100 / 12;
  
  // Total number of payments
  const numberOfPayments = loanTerm * 12;
  
  // Calculate monthly principal and interest payment
  const monthlyPrincipalAndInterest = loanAmount * 
    (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  
  // Monthly property tax
  const monthlyPropertyTax = propertyTax / 12;
  
  // Monthly home insurance
  const monthlyHomeInsurance = homeInsurance / 12;
  
  // Monthly PMI
  const monthlyPMI = pmi / 12;
  
  // Monthly HOA Fee
  const monthlyHOA = hoaFee / 12;
  
  // Total monthly payment
  const totalMonthlyPayment = monthlyPrincipalAndInterest + monthlyPropertyTax + monthlyHomeInsurance + monthlyPMI + monthlyHOA;
  
  // Total payment over the life of the loan
  const totalPayment = totalMonthlyPayment * numberOfPayments;
  
  // Total interest paid
  const totalInterestPaid = (totalMonthlyPayment * numberOfPayments) - loanAmount;
  
  return {
    payment: totalMonthlyPayment,
    principalAndInterest: monthlyPrincipalAndInterest,
    propertyTax: monthlyPropertyTax,
    homeInsurance: monthlyHomeInsurance,
    pmi: monthlyPMI,
    hoaFee: monthlyHOA,
    totalPaid: totalPayment,
    totalInterestPaid: totalInterestPaid
  };
}

export function calculateAmortizationSchedule(details: MortgageDetails): AmortizationScheduleItem[] {
  const { loanAmount, interestRate, loanTerm, extraPayments, startDate } = details;
  
  // Monthly interest rate
  const monthlyRate = interestRate / 100 / 12;
  
  // Total number of payments
  const numberOfPayments = loanTerm * 12;
  
  // Calculate monthly principal and interest payment
  const monthlyPayment = loanAmount * 
    (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  
  const schedule: AmortizationScheduleItem[] = [];
  let remainingBalance = loanAmount;
  let currentDate = new Date(startDate);
  
  for (let month = 1; month <= numberOfPayments && remainingBalance > 0; month++) {
    // Calculate interest for this month
    const interestPayment = remainingBalance * monthlyRate;
    
    // Calculate principal for this month
    let principalPayment = monthlyPayment - interestPayment;
    
    // Find any extra payment for this month
    const extraPayment = extraPayments.find(p => p.month === month);
    const extraAmount = extraPayment ? extraPayment.amount : 0;
    
    // Adjust principal if it would pay off more than the remaining balance
    if (principalPayment + extraAmount > remainingBalance) {
      principalPayment = remainingBalance;
    }
    
    // Update remaining balance
    remainingBalance = Math.max(0, remainingBalance - principalPayment - extraAmount);
    
    // Calculate date for this payment
    const paymentDate = new Date(currentDate);
    paymentDate.setMonth(currentDate.getMonth() + month - 1);
    
    // Add to schedule
    schedule.push({
      month,
      payment: monthlyPayment,
      principal: principalPayment,
      interest: interestPayment,
      extraPayment: extraAmount,
      balance: remainingBalance,
      date: paymentDate
    });
    
    // If loan is paid off, break out of the loop
    if (remainingBalance === 0) {
      break;
    }
  }
  
  return schedule;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

export function formatPercent(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value / 100);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
}

export function calculateLoanComparison(
  loanAmount: number, 
  interestRates: number[], 
  loanTerms: number[]
) {
  const results = [];
  
  for (const rate of interestRates) {
    for (const term of loanTerms) {
      const monthlyRate = rate / 100 / 12;
      const numberOfPayments = term * 12;
      
      const monthlyPayment = loanAmount * 
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      
      const totalPayment = monthlyPayment * numberOfPayments;
      const totalInterest = totalPayment - loanAmount;
      
      results.push({
        id: `${rate}-${term}`,
        name: `${term} Year Fixed at ${rate}%`,
        loanAmount,
        interestRate: rate,
        loanTerm: term,
        monthlyPayment,
        totalInterest,
        totalPayment
      });
    }
  }
  
  return results;
}

export function calculateAffordability(
  monthlyIncome: number,
  monthlyDebts: number,
  interestRate: number,
  loanTerm: number,
  downPayment: number,
  propertyTax: number,
  homeInsurance: number
) {
  // Front-end ratio (housing expenses to income) - typically 28%
  const frontEndRatio = 0.28;
  
  // Back-end ratio (all debt payments to income) - typically 36%
  const backEndRatio = 0.36;
  
  // Maximum monthly payment based on front-end ratio
  const maxFrontEndPayment = monthlyIncome * frontEndRatio;
  
  // Maximum monthly payment based on back-end ratio
  const maxBackEndPayment = (monthlyIncome * backEndRatio) - monthlyDebts;
  
  // Use the lower of the two maximum payments
  const maxMonthlyPayment = Math.min(maxFrontEndPayment, maxBackEndPayment);
  
  // Monthly property tax and insurance
  const monthlyPropertyTax = propertyTax / 12;
  const monthlyHomeInsurance = homeInsurance / 12;
  
  // Maximum available for principal and interest
  const maxPrincipalAndInterest = maxMonthlyPayment - monthlyPropertyTax - monthlyHomeInsurance;
  
  // Monthly interest rate
  const monthlyRate = interestRate / 100 / 12;
  
  // Total number of payments
  const numberOfPayments = loanTerm * 12;
  
  // Calculate maximum loan amount
  const maxLoanAmount = maxPrincipalAndInterest / 
    ((monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1));
  
  // Calculate maximum home price
  const maxHomePrice = maxLoanAmount + downPayment;
  
  return {
    maxMonthlyPayment,
    maxLoanAmount,
    maxHomePrice
  };
}
