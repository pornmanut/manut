// TypeScript interfaces for the money manager
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

// Money Manager class for better organization
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
        this.data = JSON.parse(stored);
      } catch (e) {
        console.error('Error loading data:', e);
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
    this.data = newData;
    this.saveDataToStorage();
  }

  public addTransaction(transaction: Transaction): void {
    this.data.transactions.push(transaction);
    this.saveDataToStorage();
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
        const uploadedData = JSON.parse(content) as MoneyData;
        
        // Validate uploaded data
        if (uploadedData.transactions && Array.isArray(uploadedData.transactions)) {
          callback(uploadedData);
        } else {
          alert('Invalid file format. Please upload a valid money manager data file.');
        }
      } catch (error) {
        alert('Error reading file. Please ensure it\'s a valid JSON file.');
      }
    };
    reader.readAsText(file);
  };
  
  input.click();
}
