// Zod schemas for validation (simplified for client-side)
const TransactionSchema = {
  safeParse: (data: any) => {
    if (!data || typeof data !== 'object') return { success: false, error: 'Invalid object' };
    if (typeof data.id !== 'string') return { success: false, error: 'Invalid id' };
    if (!data.date || !/^\d{4}-\d{2}-\d{2}$/.test(data.date)) return { success: false, error: 'Invalid date format' };
    if (typeof data.description !== 'string' || data.description.length === 0) return { success: false, error: 'Invalid description' };
    if (typeof data.amount !== 'number') return { success: false, error: 'Invalid amount' };
    if (typeof data.category !== 'string' || data.category.length === 0) return { success: false, error: 'Invalid category' };
    if (!['income', 'expense'].includes(data.type)) return { success: false, error: 'Invalid type' };
    return { success: true, data };
  }
};

const MoneyDataSchema = {
  safeParse: (data: any) => {
    if (!data || typeof data !== 'object') return { success: false, error: 'Invalid object' };
    if (!Array.isArray(data.transactions)) return { success: false, error: 'Invalid transactions array' };
    if (!data.categories || typeof data.categories !== 'object') return { success: false, error: 'Invalid categories object' };
    if (!Array.isArray(data.categories.income) || !Array.isArray(data.categories.expense)) return { success: false, error: 'Invalid category arrays' };
    
    // Validate each transaction
    for (const transaction of data.transactions) {
      const result = TransactionSchema.safeParse(transaction);
      if (!result.success) return { success: false, error: 'Invalid transaction in data' };
    }
    
    return { success: true, data };
  }
};

// TypeScript interfaces
export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
}

export interface MoneyData {
  transactions: Transaction[];
  categories: {
    income: string[];
    expense: string[];
  };
}

export interface MonthlySummary {
  month: string;
  income: number;
  expenses: number;
  net: number;
  transactionCount: number;
}

// Sample data structure for first-time users
export const sampleData: MoneyData = {
  transactions: [
    {
      id: '1',
      date: new Date().toISOString().split('T')[0],
      description: 'Sample salary income',
      amount: 3000,
      category: 'Salary',
      type: 'income'
    },
    {
      id: '2',
      date: new Date().toISOString().split('T')[0],
      description: 'Sample grocery expense',
      amount: -150,
      category: 'Food',
      type: 'expense'
    }
  ],
  categories: {
    income: ['Salary', 'Freelance', 'Investments', 'Other Income'],
    expense: ['Food', 'Transportation', 'Housing', 'Entertainment', 'Utilities', 'Healthcare', 'Other Expenses']
  }
};

// Money Manager class
export class MoneyManager {
  private data: MoneyData = {
    transactions: [],
    categories: {
      income: ['Salary', 'Freelance', 'Investments', 'Other Income'],
      expense: ['Food', 'Transportation', 'Housing', 'Entertainment', 'Utilities', 'Healthcare', 'Other Expenses']
    }
  };

  constructor() {
    this.loadDataFromStorage();
  }

  private loadDataFromStorage(): void {
    const stored = localStorage.getItem('moneyManagerData');
    if (stored) {
      try {
        const parsedData = JSON.parse(stored);
        const validationResult = MoneyDataSchema.safeParse(parsedData);
        
        if (validationResult.success) {
          this.data = validationResult.data;
        } else {
          console.error('Invalid data format in storage:', validationResult.error || 'Unknown error');
          this.clearAllData();
        }
      } catch (e) {
        console.error('Error loading data:', e);
        this.clearAllData();
      }
    }
  }

  private saveDataToStorage(): void {
    localStorage.setItem('moneyManagerData', JSON.stringify(this.data));
  }

  public getData(): MoneyData {
    return this.data;
  }

  public setData(newData: MoneyData): void {
    const validationResult = MoneyDataSchema.safeParse(newData);
    
    if (validationResult.success) {
      this.data = validationResult.data;
      this.saveDataToStorage();
    } else {
      throw new Error(`Invalid data format: ${validationResult.error || 'Unknown error'}`);
    }
  }

  public addTransaction(transaction: Transaction): void {
    const validationResult = TransactionSchema.safeParse(transaction);
    
    if (validationResult.success) {
      this.data.transactions.push(validationResult.data);
      this.saveDataToStorage();
    } else {
      throw new Error(`Invalid transaction format: ${validationResult.error || 'Unknown error'}`);
    }
  }

  public deleteTransaction(id: string): void {
    this.data.transactions = this.data.transactions.filter(t => t.id !== id);
    this.saveDataToStorage();
  }

  public calculateMonthlySummaries(): MonthlySummary[] {
    const monthlyData: { [key: string]: MonthlySummary } = {};
    
    this.data.transactions.forEach(transaction => {
      const month = transaction.date.substring(0, 7); // YYYY-MM
      
      if (!monthlyData[month]) {
        monthlyData[month] = {
          month,
          income: 0,
          expenses: 0,
          net: 0,
          transactionCount: 0
        };
      }
      
      if (transaction.type === 'income') {
        monthlyData[month].income += transaction.amount;
      } else {
        monthlyData[month].expenses += Math.abs(transaction.amount);
      }
      
      monthlyData[month].transactionCount++;
    });
    
    // Calculate net and sort by month (newest first)
    return Object.values(monthlyData)
      .map(summary => ({
        ...summary,
        net: summary.income - summary.expenses
      }))
      .sort((a, b) => b.month.localeCompare(a.month));
  }

  public getCategories(type: 'income' | 'expense'): string[] {
    return this.data.categories[type];
  }

  public clearAllData(): void {
    this.data = {
      transactions: [],
      categories: {
        income: ['Salary', 'Freelance', 'Investments', 'Other Income'],
        expense: ['Food', 'Transportation', 'Housing', 'Entertainment', 'Utilities', 'Healthcare', 'Other Expenses']
      }
    };
    this.saveDataToStorage();
  }
}

// Utility functions
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function formatMonth(monthStr: string): string {
  const [year, month] = monthStr.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  });
}

export function downloadData(data: MoneyData): void {
  const dataStr = JSON.stringify(data, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `money-manager-data-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function handleFileUpload(callback: (data: MoneyData) => void): void {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  
  input.onchange = (event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const uploadedData = JSON.parse(content);
        
        const validationResult = MoneyDataSchema.safeParse(uploadedData);
        
        if (validationResult.success) {
          callback(validationResult.data);
        } else {
          const errorMessage = validationResult.error || 'Invalid file format';
          alert(`Invalid file format:\n${errorMessage}\n\nPlease upload a valid money manager data file.`);
        }
      } catch (error) {
        alert('Error reading file. Please ensure it\'s a valid JSON file.');
      }
    };
    reader.readAsText(file);
  };
  
  input.click();
}

export function loadSampleData(callback: (data: MoneyData) => void): void {
  callback(sampleData);
}

// Export to global scope for use in inline scripts
if (typeof window !== 'undefined') {
  (window as any).MoneyManager = MoneyManager;
  (window as any).formatDate = formatDate;
  (window as any).formatMonth = formatMonth;
  (window as any).downloadData = downloadData;
  (window as any).handleFileUpload = handleFileUpload;
  (window as any).loadSampleData = loadSampleData;
}
