import { useTranslations } from "next-intl";

export default function Dashboard() {
  const t = useTranslations("Dashboard");

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      
      {/* Overview Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Total Balance</h3>
          <p className="text-3xl font-bold">$12,345.67</p>
          <p className="text-sm text-gray-500 mt-1">Across all accounts</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Income This Month</h3>
          <p className="text-3xl font-bold text-green-600">$3,500.00</p>
          <p className="text-sm text-gray-500 mt-1">+5% from last month</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Expenses This Month</h3>
          <p className="text-3xl font-bold text-red-600">$2,845.33</p>
          <p className="text-sm text-gray-500 mt-1">-2% from last month</p>
        </div>
      </section>
      
      {/* Quick Actions */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add Transaction</span>
          </button>
          
          <button className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            <span>Manage Accounts</span>
          </button>
          
          <button className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
            <span>View Reports</span>
          </button>
          
          <button className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Budget Overview</span>
          </button>
        </div>
      </section>
      
      {/* Recent Transactions */}
      <section className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Recent Transactions</h3>
          <a href="/app/transactions" className="text-blue-600 hover:text-blue-800">View All</a>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="bg-red-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Grocery Shopping</p>
                <p className="text-sm text-gray-500">Food & Dining</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-red-600">-$85.45</p>
              <p className="text-sm text-gray-500">Today</p>
            </div>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Salary Deposit</p>
                <p className="text-sm text-gray-500">Income</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-green-600">+$3,500.00</p>
              <p className="text-sm text-gray-500">Yesterday</p>
            </div>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="bg-red-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Netflix Subscription</p>
                <p className="text-sm text-gray-500">Entertainment</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-red-600">-$14.99</p>
              <p className="text-sm text-gray-500">2 days ago</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Budget Overview */}
      <section className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Budget Overview</h3>
          <a href="/app/budgets" className="text-blue-600 hover:text-blue-800">View All</a>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="font-medium">Groceries</span>
              <span>$250 / $400</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '62.5%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="font-medium">Dining Out</span>
              <span>$185 / $200</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '92.5%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="font-medium">Entertainment</span>
              <span>$120 / $100</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-red-600 h-2.5 rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Upcoming Bills */}
      <section className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Upcoming Bills</h3>
          <a href="/app/bills" className="text-blue-600 hover:text-blue-800">View All</a>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Rent</p>
              <p className="text-sm text-gray-500">Due in 5 days</p>
            </div>
            <p className="font-medium">$1,200.00</p>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Electricity Bill</p>
              <p className="text-sm text-gray-500">Due in 12 days</p>
            </div>
            <p className="font-medium">$85.33</p>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Internet</p>
              <p className="text-sm text-gray-500">Due in 15 days</p>
            </div>
            <p className="font-medium">$59.99</p>
          </div>
        </div>
      </section>
    </div>
  );
}
