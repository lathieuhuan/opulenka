import { useTranslations } from "next-intl";

export default function AccountsPage() {
  const t = useTranslations("Accounts");

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Accounts</h2>
      
      {/* Account Summary */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Total Balance</h3>
          <p className="text-3xl font-bold">$12,345.67</p>
          <p className="text-sm text-gray-500 mt-1">Across all accounts</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Total Assets</h3>
          <p className="text-3xl font-bold text-green-600">$15,780.00</p>
          <p className="text-sm text-gray-500 mt-1">Including investments</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Total Liabilities</h3>
          <p className="text-3xl font-bold text-red-600">$3,434.33</p>
          <p className="text-sm text-gray-500 mt-1">Credit cards & loans</p>
        </div>
      </section>
      
      {/* Account List */}
      <section className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Your Accounts</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Add Account
          </button>
        </div>
        
        <div className="space-y-4">
          {/* Bank Account */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h4 className="font-medium">Main Checking Account</h4>
                </div>
                <p className="font-bold">$5,245.33</p>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between text-sm text-gray-600 mb-4">
                <span>Bank of America</span>
                <span>Account ending in 4321</span>
              </div>
              <div className="flex space-x-2">
                <button className="text-blue-600 hover:text-blue-800 text-sm">View Transactions</button>
                <span className="text-gray-300">|</span>
                <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
              </div>
            </div>
          </div>
          
          {/* Savings Account */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h4 className="font-medium">Emergency Fund</h4>
                </div>
                <p className="font-bold">$4,500.00</p>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between text-sm text-gray-600 mb-4">
                <span>Ally Bank</span>
                <span>Account ending in 7890</span>
              </div>
              <div className="flex space-x-2">
                <button className="text-blue-600 hover:text-blue-800 text-sm">View Transactions</button>
                <span className="text-gray-300">|</span>
                <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
              </div>
            </div>
          </div>
          
          {/* Credit Card */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="bg-red-100 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <h4 className="font-medium">Credit Card</h4>
                </div>
                <p className="font-bold text-red-600">-$1,834.45</p>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between text-sm text-gray-600 mb-4">
                <span>Chase</span>
                <span>Card ending in 9876</span>
              </div>
              <div className="flex space-x-2">
                <button className="text-blue-600 hover:text-blue-800 text-sm">View Transactions</button>
                <span className="text-gray-300">|</span>
                <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
              </div>
            </div>
          </div>
          
          {/* Investment Account */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h4 className="font-medium">Investment Portfolio</h4>
                </div>
                <p className="font-bold">$6,034.67</p>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between text-sm text-gray-600 mb-4">
                <span>Vanguard</span>
                <span>Account ending in 5432</span>
              </div>
              <div className="flex space-x-2">
                <button className="text-blue-600 hover:text-blue-800 text-sm">View Details</button>
                <span className="text-gray-300">|</span>
                <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 