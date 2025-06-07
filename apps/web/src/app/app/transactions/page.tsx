import { useTranslations } from "next-intl";
import { TransactionItem } from "@/components/TransactionItem";

export default function TransactionsPage() {
  const t = useTranslations("Transactions");

  // Mock transaction data
  const transactions = [
    {
      id: 1,
      title: "Grocery Shopping",
      category: "Food & Dining",
      amount: -85.45,
      date: "Today"
    },
    {
      id: 2,
      title: "Salary Deposit",
      category: "Income",
      amount: 3500.00,
      date: "Yesterday"
    },
    {
      id: 3,
      title: "Netflix Subscription",
      category: "Entertainment",
      amount: -14.99,
      date: "2 days ago"
    },
    {
      id: 4,
      title: "Gas Station",
      category: "Transportation",
      amount: -42.50,
      date: "3 days ago"
    },
    {
      id: 5,
      title: "Restaurant",
      category: "Food & Dining",
      amount: -65.30,
      date: "4 days ago"
    },
    {
      id: 6,
      title: "Freelance Payment",
      category: "Income",
      amount: 250.00,
      date: "5 days ago"
    },
    {
      id: 7,
      title: "Phone Bill",
      category: "Utilities",
      amount: -89.99,
      date: "1 week ago"
    },
    {
      id: 8,
      title: "Amazon Purchase",
      category: "Shopping",
      amount: -34.95,
      date: "1 week ago"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Transactions</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Add Transaction
        </button>
      </div>
      
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <select className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500">
              <option>Last 30 days</option>
              <option>This month</option>
              <option>Last month</option>
              <option>Custom range</option>
            </select>
          </div>
          
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500">
              <option>All Categories</option>
              <option>Food & Dining</option>
              <option>Shopping</option>
              <option>Transportation</option>
              <option>Utilities</option>
              <option>Entertainment</option>
              <option>Income</option>
            </select>
          </div>
          
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Account</label>
            <select className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500">
              <option>All Accounts</option>
              <option>Main Checking Account</option>
              <option>Emergency Fund</option>
              <option>Credit Card</option>
            </select>
          </div>
          
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Max"
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-between mt-4">
          <div className="relative flex-1 max-w-sm">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="search"
              className="pl-10 w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Search transactions..."
            />
          </div>
          <div>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 mr-2">
              Reset Filters
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Apply Filters
            </button>
          </div>
        </div>
      </div>
      
      {/* Transactions List */}
      <section className="bg-white p-6 rounded-lg shadow">
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              title={transaction.title}
              category={transaction.category}
              amount={transaction.amount}
              date={transaction.date}
            />
          ))}
        </div>
        
        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-gray-200 pt-4 mt-6">
          <div className="flex items-center">
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">8</span> of{" "}
              <span className="font-medium">35</span> transactions
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-500 hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md bg-blue-600 text-white hover:bg-blue-700">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50">
              3
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50">
              4
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-500 hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
} 