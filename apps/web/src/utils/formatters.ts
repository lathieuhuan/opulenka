/**
 * Formats a number as a currency string
 */
export function formatCurrency(amount: number, currency = 'USD', options?: Intl.NumberFormatOptions): string {
  const defaultOptions: Intl.NumberFormatOptions = {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  };

  const formatter = new Intl.NumberFormat('en-US', { ...defaultOptions, ...options });
  return formatter.format(amount);
}

/**
 * Formats a date string or Date object to a readable format
 */
export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short', 
    day: 'numeric'
  };
  
  if (typeof date === 'string') {
    // Handle relative date strings like "Today", "Yesterday", etc.
    if (['Today', 'Yesterday', 'Tomorrow'].includes(date)) {
      return date;
    }
    
    // Try to parse the string as a date
    try {
      const parsedDate = new Date(date);
      return formatDateObject(parsedDate, defaultOptions, options);
    } catch (e) {
      return date; // Return the original string if it can't be parsed
    }
  }
  
  return formatDateObject(date, defaultOptions, options);
}

// Helper function to format Date objects
function formatDateObject(
  date: Date, 
  defaultOptions: Intl.DateTimeFormatOptions, 
  customOptions?: Intl.DateTimeFormatOptions
): string {
  const formatter = new Intl.DateTimeFormat('en-US', { ...defaultOptions, ...customOptions });
  return formatter.format(date);
}

/**
 * Returns a relative time string (e.g., "5 days ago", "just now")
 */
export function getRelativeTimeString(date: Date | number): string {
  const time = typeof date === 'number' ? date : date.getTime();
  const now = Date.now();
  const seconds = Math.floor((now - time) / 1000);
  
  // Define time intervals
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60
  };
  
  if (seconds < 5) {
    return 'just now';
  }
  
  if (seconds < 60) {
    return `${seconds} seconds ago`;
  }
  
  // Find the appropriate interval
  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
    }
  }
  
  return 'just now'; // Fallback
}

/**
 * Formats a number as a percentage
 */
export function formatPercentage(value: number, options?: Intl.NumberFormatOptions): string {
  const defaultOptions: Intl.NumberFormatOptions = {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  };
  
  const formatter = new Intl.NumberFormat('en-US', { ...defaultOptions, ...options });
  return formatter.format(value / 100);
} 