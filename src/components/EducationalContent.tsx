import { useState } from 'react';
import { motion } from 'framer-motion';

interface EducationTopic {
  id: string;
  title: string;
  content: string;
  category: 'basics' | 'advanced' | 'tips';
}

const educationTopics: EducationTopic[] = [
  {
    id: 'mortgage-basics',
    title: 'Mortgage Basics',
    category: 'basics',
    content: `
      <h3 class="text-lg font-medium mb-2">What is a Mortgage?</h3>
      <p class="mb-3">A mortgage is a loan used to purchase or maintain a home, land, or other types of real estate. The borrower agrees to pay the lender over time, typically in a series of regular payments that are divided into principal and interest.</p>
      
      <h3 class="text-lg font-medium mb-2">Key Components</h3>
      <ul class="list-disc pl-5 mb-3 space-y-1">
        <li><strong>Principal:</strong> The original amount borrowed.</li>
        <li><strong>Interest:</strong> The cost of borrowing the principal.</li>
        <li><strong>Term:</strong> The length of time to repay the loan (typically 15 or 30 years).</li>
        <li><strong>Down Payment:</strong> The initial upfront payment (typically 3-20% of the purchase price).</li>
      </ul>
      
      <h3 class="text-lg font-medium mb-2">Types of Mortgages</h3>
      <ul class="list-disc pl-5 space-y-1">
        <li><strong>Fixed-Rate:</strong> Interest rate remains the same for the entire term.</li>
        <li><strong>Adjustable-Rate (ARM):</strong> Interest rate adjusts periodically based on market indices.</li>
        <li><strong>FHA Loans:</strong> Insured by the Federal Housing Administration, allowing for lower down payments.</li>
        <li><strong>VA Loans:</strong> Guaranteed by the Department of Veterans Affairs for eligible veterans.</li>
        <li><strong>USDA Loans:</strong> Offered to rural property buyers with low to moderate income.</li>
      </ul>
    `
  },
  {
    id: 'interest-rates',
    title: 'Understanding Interest Rates',
    category: 'basics',
    content: `
      <h3 class="text-lg font-medium mb-2">How Interest Rates Work</h3>
      <p class="mb-3">The interest rate on your mortgage determines how much you'll pay in interest over the life of the loan. Even a small difference in interest rates can significantly impact your monthly payment and total interest paid.</p>
      
      <h3 class="text-lg font-medium mb-2">Factors Affecting Rates</h3>
      <ul class="list-disc pl-5 mb-3 space-y-1">
        <li><strong>Credit Score:</strong> Higher scores typically qualify for lower rates.</li>
        <li><strong>Down Payment:</strong> Larger down payments may lead to better rates.</li>
        <li><strong>Loan Term:</strong> Shorter terms usually have lower rates but higher monthly payments.</li>
        <li><strong>Economic Factors:</strong> Federal Reserve policies, inflation, and economic growth.</li>
        <li><strong>Property Location:</strong> Rates can vary by state and region.</li>
      </ul>
      
      <h3 class="text-lg font-medium mb-2">APR vs. Interest Rate</h3>
      <p class="mb-3">The Annual Percentage Rate (APR) includes both the interest rate and other costs such as broker fees, discount points, and some closing costs. APR provides a more comprehensive view of what you'll pay for your mortgage.</p>
      
      <h3 class="text-lg font-medium mb-2">Rate Lock</h3>
      <p>A rate lock is a guarantee from a lender that they will give you a certain interest rate, points, and other terms for a specified period (typically 30-60 days) while your loan application is processed.</p>
    `
  },
  {
    id: 'amortization',
    title: 'Amortization Explained',
    category: 'basics',
    content: `
      <h3 class="text-lg font-medium mb-2">What is Amortization?</h3>
      <p class="mb-3">Amortization is the process of spreading out a loan into a series of fixed payments over time. Each payment goes toward both the principal and interest, with earlier payments applying more toward interest and later payments applying more toward principal.</p>
      
      <h3 class="text-lg font-medium mb-2">How Amortization Works</h3>
      <p class="mb-3">In the early years of your mortgage, a larger portion of each payment goes toward interest rather than paying down the principal. As time goes on, this ratio shifts, with more of each payment going toward the principal.</p>
      
      <h3 class="text-lg font-medium mb-2">Amortization Schedule</h3>
      <p class="mb-3">An amortization schedule is a table showing each payment throughout the life of the loan and how much of each payment goes toward principal and interest. It also shows the remaining loan balance after each payment.</p>
      
      <h3 class="text-lg font-medium mb-2">Benefits of Understanding Amortization</h3>
      <ul class="list-disc pl-5 space-y-1">
        <li>Helps you understand how much equity you're building over time</li>
        <li>Shows the impact of extra payments on your loan term and total interest</li>
        <li>Provides insight into refinancing decisions</li>
        <li>Helps with long-term financial planning</li>
      </ul>
    `
  },
  {
    id: 'extra-payments',
    title: 'Making Extra Payments',
    category: 'advanced',
    content: `
      <h3 class="text-lg font-medium mb-2">Benefits of Extra Payments</h3>
      <p class="mb-3">Making extra payments toward your mortgage principal can significantly reduce the amount of interest you pay over the life of the loan and help you pay off your mortgage earlier.</p>
      
      <h3 class="text-lg font-medium mb-2">Strategies for Extra Payments</h3>
      <ul class="list-disc pl-5 mb-3 space-y-1">
        <li><strong>Biweekly Payments:</strong> Pay half your monthly payment every two weeks, resulting in 13 full payments per year instead of 12.</li>
        <li><strong>One Extra Payment Per Year:</strong> Make one additional payment each year, perhaps using a tax refund or bonus.</li>
        <li><strong>Round Up Payments:</strong> Round your payment up to the nearest $50 or $100.</li>
        <li><strong>Lump Sum Payments:</strong> Apply windfalls like inheritances or bonuses to your principal.</li>
      </ul>
      
      <h3 class="text-lg font-medium mb-2">Example Impact</h3>
      <p class="mb-3">On a $300,000, 30-year mortgage at 4.5%, paying an extra $100 per month could save you approximately $30,000 in interest and pay off your loan 4 years earlier.</p>
      
      <h3 class="text-lg font-medium mb-2">Important Considerations</h3>
      <ul class="list-disc pl-5 space-y-1">
        <li>Ensure your lender applies extra payments to the principal, not future payments</li>
        <li>Check if your mortgage has prepayment penalties</li>
        <li>Consider whether the money might be better used for other financial goals</li>
        <li>Keep records of all extra payments</li>
      </ul>
    `
  },
  {
    id: 'refinancing',
    title: 'When to Refinance',
    category: 'advanced',
    content: `
      <h3 class="text-lg font-medium mb-2">What is Refinancing?</h3>
      <p class="mb-3">Refinancing involves replacing your existing mortgage with a new one, typically to secure better terms or tap into home equity. The new loan pays off the old one, and you begin making payments on the new loan.</p>
      
      <h3 class="text-lg font-medium mb-2">Good Reasons to Refinance</h3>
      <ul class="list-disc pl-5 mb-3 space-y-1">
        <li><strong>Lower Interest Rate:</strong> If rates have dropped significantly since you got your mortgage.</li>
        <li><strong>Shorter Loan Term:</strong> To pay off your mortgage faster and save on interest.</li>
        <li><strong>Switch Loan Types:</strong> Moving from an adjustable-rate to a fixed-rate mortgage for stability.</li>
        <li><strong>Cash-Out Refinance:</strong> To access home equity for major expenses or debt consolidation.</li>
        <li><strong>Remove PMI:</strong> If you've built enough equity to eliminate private mortgage insurance.</li>
      </ul>
      
      <h3 class="text-lg font-medium mb-2">When Refinancing Makes Sense</h3>
      <p class="mb-3">A common rule of thumb is that refinancing makes sense if you can reduce your interest rate by at least 0.5-1% and plan to stay in your home long enough to recoup the closing costs.</p>
      
      <h3 class="text-lg font-medium mb-2">Costs to Consider</h3>
      <ul class="list-disc pl-5 space-y-1">
        <li>Closing costs (typically 2-5% of the loan amount)</li>
        <li>Appraisal fees</li>
        <li>Application fees</li>
        <li>Title search and insurance</li>
        <li>Potential prepayment penalties on your current mortgage</li>
      </ul>
    `
  },
  {
    id: 'tax-benefits',
    title: 'Tax Benefits of Homeownership',
    category: 'advanced',
    content: `
      <h3 class="text-lg font-medium mb-2">Mortgage Interest Deduction</h3>
      <p class="mb-3">One of the most significant tax benefits of homeownership is the ability to deduct mortgage interest payments on your federal income tax return. For mortgages taken out after December 15, 2017, you can deduct interest on up to $750,000 of mortgage debt ($375,000 if married filing separately).</p>
      
      <h3 class="text-lg font-medium mb-2">Property Tax Deduction</h3>
      <p class="mb-3">You can deduct property taxes paid on your home, though the Tax Cuts and Jobs Act of 2017 capped the total state and local tax deduction (including property taxes) at $10,000 ($5,000 if married filing separately).</p>
      
      <h3 class="text-lg font-medium mb-2">Mortgage Points Deduction</h3>
      <p class="mb-3">Points paid to lower your interest rate may be deductible in the year you pay them if they meet certain criteria. Otherwise, they can be deducted over the life of the loan.</p>
      
      <h3 class="text-lg font-medium mb-2">Home Office Deduction</h3>
      <p class="mb-3">If you use part of your home exclusively for business purposes, you may be eligible for a home office deduction.</p>
      
      <h3 class="text-lg font-medium mb-2">Capital Gains Exclusion</h3>
      <p>When you sell your primary residence, you may exclude up to $250,000 of capital gains ($500,000 for married couples filing jointly) if you've owned and lived in the home for at least two of the five years before the sale.</p>
    `
  },
  {
    id: 'first-time-buyers',
    title: 'Tips for First-Time Homebuyers',
    category: 'tips',
    content: `
      <h3 class="text-lg font-medium mb-2">Before You Start Looking</h3>
      <ul class="list-disc pl-5 mb-3 space-y-1">
        <li><strong>Check Your Credit:</strong> Review your credit report and score; aim to improve it if needed.</li>
        <li><strong>Determine Your Budget:</strong> Calculate how much house you can afford based on income, debts, and savings.</li>
        <li><strong>Save for a Down Payment:</strong> Aim for at least 20% to avoid PMI, but explore options for lower down payments.</li>
        <li><strong>Get Pre-Approved:</strong> This shows sellers you're serious and gives you a clear budget.</li>
        <li><strong>Research Neighborhoods:</strong> Consider commute times, schools, amenities, and future development plans.</li>
      </ul>
      
      <h3 class="text-lg font-medium mb-2">During the Home Search</h3>
      <ul class="list-disc pl-5 mb-3 space-y-1">
        <li><strong>Work with a Realtor:</strong> Their expertise and access to listings can be invaluable.</li>
        <li><strong>Consider All Costs:</strong> Remember to budget for closing costs, moving expenses, and immediate repairs.</li>
        <li><strong>Don't Skip the Inspection:</strong> A thorough home inspection can reveal costly issues.</li>
        <li><strong>Think Long-Term:</strong> Consider how the home will meet your needs in 5-10 years.</li>
      </ul>
      
      <h3 class="text-lg font-medium mb-2">First-Time Homebuyer Programs</h3>
      <p class="mb-3">Many states and the federal government offer programs to help first-time homebuyers with down payments, closing costs, and favorable loan terms. These include FHA loans, VA loans, USDA loans, and state-specific programs.</p>
      
      <h3 class="text-lg font-medium mb-2">Common Mistakes to Avoid</h3>
      <ul class="list-disc pl-5 space-y-1">
        <li>Buying more house than you can afford</li>
        <li>Not budgeting for maintenance and repairs</li>
        <li>Skipping the pre-approval process</li>
        <li>Making large purchases before closing</li>
        <li>Not researching the neighborhood thoroughly</li>
      </ul>
    `
  },
  {
    id: 'market-trends',
    title: 'Understanding Market Trends',
    category: 'tips',
    content: `
      <h3 class="text-lg font-medium mb-2">Buyer's vs. Seller's Market</h3>
      <p class="mb-3">In a buyer's market, there are more homes for sale than buyers, giving buyers more negotiating power. In a seller's market, there are more buyers than homes available, giving sellers the advantage.</p>
      
      <h3 class="text-lg font-medium mb-2">Interest Rate Trends</h3>
      <p class="mb-3">Interest rates fluctuate based on economic conditions, Federal Reserve policies, and inflation. Lower rates mean lower monthly payments and potentially higher home prices as buyers can afford more.</p>
      
      <h3 class="text-lg font-medium mb-2">Seasonal Patterns</h3>
      <p class="mb-3">Real estate markets often follow seasonal patterns, with spring and summer typically being busier than fall and winter. Prices may be higher during peak seasons, but there's also more inventory.</p>
      
      <h3 class="text-lg font-medium mb-2">Local Market Indicators</h3>
      <ul class="list-disc pl-5 mb-3 space-y-1">
        <li><strong>Days on Market (DOM):</strong> How long homes typically take to sell.</li>
        <li><strong>Months of Inventory:</strong> How long it would take to sell all current listings at the current pace.</li>
        <li><strong>List-to-Sale Price Ratio:</strong> The percentage of asking price that homes typically sell for.</li>
        <li><strong>Pending Sales:</strong> Homes under contract but not yet closed.</li>
      </ul>
      
      <h3 class="text-lg font-medium mb-2">Using Trends in Your Decision-Making</h3>
      <p>Understanding market trends can help you time your purchase or sale, set realistic expectations for negotiations, and make informed decisions about when to lock in an interest rate.</p>
    `
  },
  {
    id: 'negotiation-tips',
    title: 'Negotiation Strategies',
    category: 'tips',
    content: `
      <h3 class="text-lg font-medium mb-2">Research Before Negotiating</h3>
      <p class="mb-3">Knowledge is power in negotiations. Research comparable sales in the area, how long the property has been on the market, and any issues that might affect its value.</p>
      
      <h3 class="text-lg font-medium mb-2">What to Negotiate Beyond Price</h3>
      <ul class="list-disc pl-5 mb-3 space-y-1">
        <li><strong>Closing Costs:</strong> Sellers may contribute to your closing costs.</li>
        <li><strong>Repairs:</strong> Based on inspection findings, you can request repairs or credits.</li>
        <li><strong>Closing Date:</strong> Flexibility on timing can be valuable to sellers.</li>
        <li><strong>Home Warranty:</strong> Ask the seller to provide a one-year home warranty.</li>
        <li><strong>Appliances/Fixtures:</strong> Clarify what stays with the home.</li>
      </ul>
      
      <h3 class="text-lg font-medium mb-2">Effective Negotiation Tactics</h3>
      <ul class="list-disc pl-5 mb-3 space-y-1">
        <li><strong>Start Reasonable:</strong> Extremely low offers may alienate sellers.</li>
        <li><strong>Use Contingencies Wisely:</strong> Too many can weaken your offer.</li>
        <li><strong>Understand the Seller's Motivations:</strong> Are they in a hurry? Do they need specific terms?</li>
        <li><strong>Be Willing to Walk Away:</strong> Don't get emotionally attached to a property.</li>
        <li><strong>Use a Strong Agent:</strong> Experienced agents often have superior negotiation skills.</li>
      </ul>
      
      <h3 class="text-lg font-medium mb-2">Handling Multiple Offers</h3>
      <p>In competitive markets, you may need to make your offer stand out with a strong pre-approval letter, larger earnest money deposit, or fewer contingencies. Sometimes a personal letter to the seller can make a difference.</p>
    `
  }
];

const EducationalContent = () => {
  const [activeCategory, setActiveCategory] = useState<'basics' | 'advanced' | 'tips'>('basics');
  const [activeTopic, setActiveTopic] = useState<string>(educationTopics.find(topic => topic.category === 'basics')?.id || '');
  
  const filteredTopics = educationTopics.filter(topic => topic.category === activeCategory);
  const currentTopic = educationTopics.find(topic => topic.id === activeTopic);

  return (
    <div className="card">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Mortgage Education Center</h2>
      
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => {
            setActiveCategory('basics');
            setActiveTopic(educationTopics.find(topic => topic.category === 'basics')?.id || '');
          }}
          className={`tab ${activeCategory === 'basics' ? 'tab-active' : 'tab-inactive'}`}
        >
          Mortgage Basics
        </button>
        <button
          onClick={() => {
            setActiveCategory('advanced');
            setActiveTopic(educationTopics.find(topic => topic.category === 'advanced')?.id || '');
          }}
          className={`tab ${activeCategory === 'advanced' ? 'tab-active' : 'tab-inactive'}`}
        >
          Advanced Topics
        </button>
        <button
          onClick={() => {
            setActiveCategory('tips');
            setActiveTopic(educationTopics.find(topic => topic.category === 'tips')?.id || '');
          }}
          className={`tab ${activeCategory === 'tips' ? 'tab-active' : 'tab-inactive'}`}
        >
          Tips & Strategies
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <div className="bg-gray-50 dark:bg-dark-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Topics</h3>
            <ul className="space-y-2">
              {filteredTopics.map(topic => (
                <li key={topic.id}>
                  <button
                    onClick={() => setActiveTopic(topic.id)}
                    className={`text-left w-full px-3 py-2 rounded-md text-sm ${
                      activeTopic === topic.id
                        ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 font-medium'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-100'
                    }`}
                  >
                    {topic.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="md:col-span-3">
          {currentTopic && (
            <motion.div
              key={currentTopic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-dark-100 rounded-lg p-6"
            >
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">{currentTopic.title}</h2>
              <div 
                className="prose prose-sm max-w-none dark:prose-invert prose-headings:text-gray-800 dark:prose-headings:text-gray-100 prose-p:text-gray-600 dark:prose-p:text-gray-300"
                dangerouslySetInnerHTML={{ __html: currentTopic.content }}
              />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EducationalContent;
