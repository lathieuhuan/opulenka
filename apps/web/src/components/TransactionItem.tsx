import { ReactNode } from "react";

interface TransactionItemProps {
  title: string;
  category: string;
  amount: number;
  date: string;
  icon?: ReactNode;
}

export function TransactionItem({ title, category, amount, date, icon }: TransactionItemProps) {
  const isExpense = amount < 0;
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Math.abs(amount));

  return (
    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="flex items-center space-x-3">
        {icon ? (
          icon
        ) : (
          <div className={`${isExpense ? 'bg-red-100' : 'bg-green-100'} p-2 rounded-full`}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-5 w-5 ${isExpense ? 'text-red-600' : 'text-green-600'}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {isExpense ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
              )}
            </svg>
          </div>
        )}
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-sm text-gray-500">{category}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`font-medium ${isExpense ? 'text-red-600' : 'text-green-600'}`}>
          {isExpense ? '-' : '+'}{formattedAmount}
        </p>
        <p className="text-sm text-gray-500">{date}</p>
      </div>
    </div>
  );
} 