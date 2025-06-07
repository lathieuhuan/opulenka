import { useState, useEffect } from 'react';

export interface Transaction {
  id: number;
  title: string;
  category: string;
  amount: number;
  date: string;
  accountId?: number;
  tags?: string[];
  notes?: string;
}

interface TransactionFilters {
  dateRange?: {
    startDate?: Date;
    endDate?: Date;
  };
  category?: string;
  accountId?: number;
  amount?: {
    min?: number;
    max?: number;
  };
  searchTerm?: string;
}

interface PaginationOptions {
  page: number;
  limit: number;
}

interface UseTransactionsReturn {
  transactions: Transaction[];
  isLoading: boolean;
  error: Error | null;
  totalCount: number;
  filters: TransactionFilters;
  pagination: PaginationOptions;
  setFilters: (filters: TransactionFilters) => void;
  setPagination: (options: PaginationOptions) => void;
  refetch: () => void;
}

// Mock data for demonstration
const mockTransactions: Transaction[] = [
  {
    id: 1,
    title: "Grocery Shopping",
    category: "Food & Dining",
    amount: -85.45,
    date: "Today",
    accountId: 1,
    tags: ["groceries", "essentials"],
    notes: "Weekly groceries from Whole Foods"
  },
  {
    id: 2,
    title: "Salary Deposit",
    category: "Income",
    amount: 3500.00,
    date: "Yesterday",
    accountId: 1,
    tags: ["income", "salary"],
    notes: "Monthly salary"
  },
  {
    id: 3,
    title: "Netflix Subscription",
    category: "Entertainment",
    amount: -14.99,
    date: "2 days ago",
    accountId: 3,
    tags: ["subscription", "entertainment"],
    notes: "Monthly Netflix subscription"
  },
  // ... more mock transactions
];

export function useTransactions(
  initialFilters: TransactionFilters = {},
  initialPagination: PaginationOptions = { page: 1, limit: 10 }
): UseTransactionsReturn {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [filters, setFilters] = useState<TransactionFilters>(initialFilters);
  const [pagination, setPagination] = useState<PaginationOptions>(initialPagination);

  const fetchTransactions = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // This would be an API call in a real application
      // const response = await fetch('/api/transactions', { 
      //   method: 'POST',
      //   body: JSON.stringify({ filters, pagination }),
      // });
      // const data = await response.json();
      
      // For now, we'll simulate an API response with our mock data
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      
      // Apply filters (simplified version for demonstration)
      let filteredData = [...mockTransactions];
      
      if (filters.category) {
        filteredData = filteredData.filter(tx => tx.category === filters.category);
      }
      
      if (filters.accountId) {
        filteredData = filteredData.filter(tx => tx.accountId === filters.accountId);
      }
      
      if (filters.amount?.min !== undefined) {
        filteredData = filteredData.filter(tx => Math.abs(tx.amount) >= filters.amount!.min!);
      }
      
      if (filters.amount?.max !== undefined) {
        filteredData = filteredData.filter(tx => Math.abs(tx.amount) <= filters.amount!.max!);
      }
      
      if (filters.searchTerm) {
        const term = filters.searchTerm.toLowerCase();
        filteredData = filteredData.filter(tx => 
          tx.title.toLowerCase().includes(term) || 
          tx.category.toLowerCase().includes(term) ||
          tx.notes?.toLowerCase().includes(term) ||
          tx.tags?.some(tag => tag.toLowerCase().includes(term))
        );
      }
      
      // Apply pagination
      const start = (pagination.page - 1) * pagination.limit;
      const paginatedData = filteredData.slice(start, start + pagination.limit);
      
      setTransactions(paginatedData);
      setTotalCount(filteredData.length);
      
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch transactions'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [filters, pagination]);

  return {
    transactions,
    isLoading,
    error,
    totalCount,
    filters,
    pagination,
    setFilters,
    setPagination,
    refetch: fetchTransactions
  };
}