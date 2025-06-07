import { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-50 border-r border-gray-200 h-full overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Opulenka</h2>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <a href="/app/dashboard" className="block p-2 rounded hover:bg-gray-200">Dashboard</a>
            </li>
            <li>
              <a href="/app/accounts" className="block p-2 rounded hover:bg-gray-200">Accounts</a>
            </li>
            <li>
              <a href="/app/transactions" className="block p-2 rounded hover:bg-gray-200">Transactions</a>
            </li>
            <li>
              <a href="/app/budgets" className="block p-2 rounded hover:bg-gray-200">Budgets</a>
            </li>
            <li>
              <a href="/app/bills" className="block p-2 rounded hover:bg-gray-200">Bills & Subscriptions</a>
            </li>
            <li>
              <a href="/app/goals" className="block p-2 rounded hover:bg-gray-200">Savings Goals</a>
            </li>
            <li>
              <a href="/app/reports" className="block p-2 rounded hover:bg-gray-200">Reports & Analytics</a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-200 p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <span className="sr-only">Notifications</span>
                {/* Icon placeholder */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <span className="sr-only">Profile</span>
                {/* Icon placeholder */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            </div>
          </div>
        </header>
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
