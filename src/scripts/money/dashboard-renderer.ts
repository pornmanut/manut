// Dashboard Renderer - Handles dashboard rendering and filtering
import type { MoneyManager } from '../money-manager.ts';
import { UIController } from './ui-controller.ts';
import { formatDate, formatMonth } from '../money-manager.ts';

export class DashboardRenderer {
  private moneyManager: MoneyManager;
  private uiController: UIController;

  constructor(moneyManager: MoneyManager, uiController: UIController) {
    this.moneyManager = moneyManager;
    this.uiController = uiController;
  }

  getFilteredTransactions() {
    const elements = this.uiController.getElements();
    const monthFilter = elements.monthFilter?.value;
    const categoryFilter = elements.categoryFilter?.value;
    
    return this.moneyManager.getFilteredTransactions(monthFilter, categoryFilter);
  }
  
  calculateSummaryFromTransactions(transactions: any[]) {
    if (!this.moneyManager) return {
      income: 0,
      expenses: 0,
      net: 0,
      transactionCount: 0,
      categoryData: {}
    };
    
    return this.moneyManager.calculateSummaryFromTransactions(transactions);
  }

  updateFilterOptions() {
    const elements = this.uiController.getElements();
    
    // Update month filter
    if (elements.monthFilter) {
      const months = this.moneyManager.getAvailableMonths();
      const currentValue = elements.monthFilter.value;
      
      elements.monthFilter.innerHTML = '<option value="">All Months</option>' + 
        months.map(month => `
          <option value="${month}">${formatMonth(month)}</option>
        `).join('');
      
      // Restore previous selection if it still exists
      if (currentValue && months.includes(currentValue)) {
        elements.monthFilter.value = currentValue;
      }
    }
    
    // Update category filter
    if (elements.categoryFilter) {
      const allCategories = this.moneyManager.getAllCategories();
      const currentValue = elements.categoryFilter.value;
      
      elements.categoryFilter.innerHTML = '<option value="">All Categories</option>' + 
        allCategories.map(category => `
          <option value="${category}">${category}</option>
        `).join('');
      
      // Restore previous selection if it still exists
      if (currentValue && allCategories.includes(currentValue)) {
        elements.categoryFilter.value = currentValue;
      }
    }
  }

  renderDashboardSummary() {
    const elements = this.uiController.getElements();
    if (!elements.dashboardSummaryContainer || !this.moneyManager) return;
    
    const transactions = this.getFilteredTransactions();
    const summary = this.calculateSummaryFromTransactions(transactions);
    
    if (transactions.length === 0) {
      elements.dashboardSummaryContainer.innerHTML = `
        <div class="text-center text-gray-500 col-span-full py-8">
          No data available. Upload a JSON file, load sample data, or add transactions to get started.
        </div>
      `;
      return;
    }
    
    elements.dashboardSummaryContainer.innerHTML = `
      <div class="bg-green-50 rounded-lg p-4 sm:p-6 border border-green-200">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <p class="text-sm font-medium text-green-600">Total Income</p>
            <p class="text-lg sm:text-2xl font-bold text-green-700">฿${summary.income.toFixed(2)}</p>
          </div>
          <div class="bg-green-100 rounded-full p-2 sm:p-3 flex-shrink-0 ml-2 sm:ml-4">
            <svg class="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
          </div>
        </div>
      </div>
      
      <div class="bg-red-50 rounded-lg p-4 sm:p-6 border border-red-200">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <p class="text-sm font-medium text-red-600">Total Expenses</p>
            <p class="text-lg sm:text-2xl font-bold text-red-700">฿${summary.expenses.toFixed(2)}</p>
          </div>
          <div class="bg-red-100 rounded-full p-2 sm:p-3 flex-shrink-0 ml-2 sm:ml-4">
            <svg class="w-5 h-5 sm:w-6 sm:h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>
            </svg>
          </div>
        </div>
      </div>
      
      <div class="${summary.net >= 0 ? 'bg-blue-50 border-blue-200' : 'bg-orange-50 border-orange-200'} rounded-lg p-4 sm:p-6 border">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <p class="text-sm font-medium ${summary.net >= 0 ? 'text-blue-600' : 'text-orange-600'}">Net Balance</p>
            <p class="text-lg sm:text-2xl font-bold ${summary.net >= 0 ? 'text-blue-700' : 'text-orange-700'}">฿${summary.net.toFixed(2)}</p>
          </div>
          <div class="${summary.net >= 0 ? 'bg-blue-100' : 'bg-orange-100'} rounded-full p-2 sm:p-3 flex-shrink-0 ml-2 sm:ml-4">
            <svg class="w-5 h-5 sm:w-6 sm:h-6 ${summary.net >= 0 ? 'text-blue-600' : 'text-orange-600'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
            </svg>
          </div>
        </div>
      </div>
      
      <div class="bg-purple-50 rounded-lg p-4 sm:p-6 border border-purple-200">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <p class="text-sm font-medium text-purple-600">Transactions</p>
            <p class="text-lg sm:text-2xl font-bold text-purple-700">${summary.transactionCount}</p>
          </div>
          <div class="bg-purple-100 rounded-full p-2 sm:p-3 flex-shrink-0 ml-2 sm:ml-4">
            <svg class="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
          </div>
        </div>
      </div>
    `;
  }

  renderCharts() {
    const elements = this.uiController.getElements();
    if (!elements.dashboardChartsContainer || !this.moneyManager) return;
    
    const transactions = this.getFilteredTransactions();
    const summary = this.calculateSummaryFromTransactions(transactions);
    
    if (transactions.length === 0) {
      elements.dashboardChartsContainer.innerHTML = '';
      return;
    }
    
    // Income vs Expenses Bar Chart
    const maxAmount = Math.max(summary.income, summary.expenses);
    const incomeWidth = maxAmount > 0 ? (summary.income / maxAmount) * 100 : 0;
    const expensesWidth = maxAmount > 0 ? (summary.expenses / maxAmount) * 100 : 0;
    
    // Category breakdown data
    const incomeCategories = summary.categoryData.income || {};
    const expenseCategories = summary.categoryData.expense || {};
    
    const incomeTotal = Object.values(incomeCategories).reduce((sum, amount) => sum + amount, 0);
    const expenseTotal = Object.values(expenseCategories).reduce((sum, amount) => sum + amount, 0);
    
    elements.dashboardChartsContainer.innerHTML = `
      <!-- Income vs Expenses Chart -->
      <div class="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Income vs Expenses</h3>
        <div class="space-y-4">
          <div>
            <div class="flex justify-between mb-1">
              <span class="text-sm font-medium text-green-600">Income</span>
              <span class="text-sm text-gray-600">฿${summary.income.toFixed(2)}</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-8">
              <div class="bg-green-500 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium" style="width: ${incomeWidth}%">
                ${incomeWidth > 10 ? `${incomeWidth.toFixed(1)}%` : ''}
              </div>
            </div>
          </div>
          
          <div>
            <div class="flex justify-between mb-1">
              <span class="text-sm font-medium text-red-600">Expenses</span>
              <span class="text-sm text-gray-600">฿${summary.expenses.toFixed(2)}</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-8">
              <div class="bg-red-500 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium" style="width: ${expensesWidth}%">
                ${expensesWidth > 10 ? `${expensesWidth.toFixed(1)}%` : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Category Distribution -->
      <div class="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Category Distribution</h3>
        <div class="space-y-6">
          <!-- Income Categories -->
          ${incomeTotal > 0 ? `
            <div>
              <h4 class="text-sm font-medium text-green-600 mb-3">Income Categories</h4>
              <div class="space-y-2">
                ${Object.entries(incomeCategories)
                  .sort(([,a], [,b]) => (b as number) - (a as number))
                  .map(([category, amount]) => {
                    const percentage = ((amount as number) / incomeTotal) * 100;
                    return `
                      <div>
                        <div class="flex justify-between mb-1">
                          <span class="text-sm text-gray-700">${category}</span>
                          <span class="text-sm text-gray-600">฿${(amount as number).toFixed(2)} (${percentage.toFixed(1)}%)</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2">
                          <div class="bg-green-500 h-2 rounded-full" style="width: ${percentage}%"></div>
                        </div>
                      </div>
                    `;
                  }).join('')}
              </div>
            </div>
          ` : ''}
          
          <!-- Expense Categories -->
          ${expenseTotal > 0 ? `
            <div>
              <h4 class="text-sm font-medium text-red-600 mb-3">Expense Categories</h4>
              <div class="space-y-2">
                ${Object.entries(expenseCategories)
                  .sort(([,a], [,b]) => (b as number) - (a as number))
                  .map(([category, amount]) => {
                    const percentage = ((amount as number) / expenseTotal) * 100;
                    return `
                      <div>
                        <div class="flex justify-between mb-1">
                          <span class="text-sm text-gray-700">${category}</span>
                          <span class="text-sm text-gray-600">฿${(amount as number).toFixed(2)} (${percentage.toFixed(1)}%)</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2">
                          <div class="bg-red-500 h-2 rounded-full" style="width: ${percentage}%"></div>
                        </div>
                      </div>
                    `;
                  }).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  renderCategoryBreakdown() {
    const elements = this.uiController.getElements();
    if (!elements.categoryBreakdownContainer || !this.moneyManager) return;
    
    const transactions = this.getFilteredTransactions();
    const summary = this.calculateSummaryFromTransactions(transactions);
    
    if (transactions.length === 0) {
      elements.categoryBreakdownContainer.innerHTML = '';
      return;
    }
    
    const incomeCategories = summary.categoryData.income || {};
    const expenseCategories = summary.categoryData.expense || {};
    
    elements.categoryBreakdownContainer.innerHTML = `
      <div class="bg-gray-50 rounded-lg p-4 sm:p-6 border border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Category Breakdown</h3>
        
        <!-- Mobile Card View -->
        <div class="sm:hidden space-y-3">
          ${Object.entries(incomeCategories).map(([category, amount]) => {
            const count = transactions.filter(t => t.type === 'income' && t.category === category).length;
            return `
              <div class="bg-white rounded-lg p-3 border border-gray-200">
                <div class="flex justify-between items-start mb-2">
                  <h4 class="font-medium text-gray-900">${category}</h4>
                  <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    Income
                  </span>
                </div>
                <div class="flex justify-between items-center text-sm">
                  <span class="text-gray-600">Amount:</span>
                  <span class="font-medium text-gray-900">฿${(amount as number).toFixed(2)}</span>
                </div>
                <div class="flex justify-between items-center text-sm mt-1">
                  <span class="text-gray-600">Transactions:</span>
                  <span class="text-gray-500">${count}</span>
                </div>
              </div>
            `;
          }).join('')}
          
          ${Object.entries(expenseCategories).map(([category, amount]) => {
            const count = transactions.filter(t => t.type === 'expense' && t.category === category).length;
            return `
              <div class="bg-white rounded-lg p-3 border border-gray-200">
                <div class="flex justify-between items-start mb-2">
                  <h4 class="font-medium text-gray-900">${category}</h4>
                  <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                    Expense
                  </span>
                </div>
                <div class="flex justify-between items-center text-sm">
                  <span class="text-gray-600">Amount:</span>
                  <span class="font-medium text-gray-900">฿${(amount as number).toFixed(2)}</span>
                </div>
                <div class="flex justify-between items-center text-sm mt-1">
                  <span class="text-gray-600">Transactions:</span>
                  <span class="text-gray-500">${count}</span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
        
        <!-- Desktop Table View -->
        <div class="hidden sm:block overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-100">
              <tr>
                <th class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th class="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th class="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Transactions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              ${Object.entries(incomeCategories).map(([category, amount]) => {
                const count = transactions.filter(t => t.type === 'income' && t.category === category).length;
                return `
                  <tr>
                    <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${category}</td>
                    <td class="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Income
                      </span>
                    </td>
                    <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">฿${(amount as number).toFixed(2)}</td>
                    <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">${count}</td>
                  </tr>
                `;
              }).join('')}
              
              ${Object.entries(expenseCategories).map(([category, amount]) => {
                const count = transactions.filter(t => t.type === 'expense' && t.category === category).length;
                return `
                  <tr>
                    <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${category}</td>
                    <td class="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                        Expense
                      </span>
                    </td>
                    <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">฿${(amount as number).toFixed(2)}</td>
                    <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">${count}</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  renderTransactions() {
    const elements = this.uiController.getElements();
    if (!elements.transactionListContainer || !this.moneyManager) return;

    const transactions = this.getFilteredTransactions();
    
    if (transactions.length === 0) {
      // Check if there are any transactions at all
      const allTransactions = this.moneyManager.getData().transactions;
      if (allTransactions.length === 0) {
        elements.transactionListContainer.innerHTML = `
          <div class="text-center text-gray-500 py-8">
            No transactions yet. Add your first transaction to get started.
          </div>
        `;
      } else {
        elements.transactionListContainer.innerHTML = `
          <div class="text-center text-gray-500 py-8">
            No transactions match the current filters. Try adjusting the month or category filters.
          </div>
        `;
      }
      return;
    }
    
    // Sort transactions by date (newest first)
    const sortedTransactions = [...transactions].sort((a, b) => 
      b.date.localeCompare(a.date)
    );
    
    elements.transactionListContainer.innerHTML = sortedTransactions.map(transaction => `
      <div class="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200 hover:shadow-md transition-all duration-200 hover:border-gray-300">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
          <div class="flex-1">
            <div class="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
              <span class="text-xs sm:text-sm text-gray-500">${formatDate(transaction.date)}</span>
              <span class="inline-block px-2 py-1 text-xs rounded-full transition-colors ${
                transaction.type === 'income' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }">
                ${transaction.type}
              </span>
              <span class="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors">
                ${transaction.category}
              </span>
            </div>
            <h4 class="font-medium text-gray-900 text-sm sm:text-base">${transaction.description}</h4>
          </div>
          <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <span class="text-base sm:text-lg font-semibold ${
              transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
            }">
              ${transaction.type === 'income' ? '+' : '-'}฿${Math.abs(transaction.amount).toFixed(2)}
            </span>
            <div class="flex space-x-2">
              <button 
                onclick="window.editTransaction('${transaction.id}')"
                class="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-1 rounded transition-all duration-200"
                title="Edit transaction"
              >
                <svg class="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
              </button>
              <button 
                onclick="window.deleteTransaction('${transaction.id}')"
                class="text-red-600 hover:text-red-800 hover:bg-red-50 p-1 rounded transition-all duration-200"
                title="Delete transaction"
              >
                <svg class="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }

  render() {
    this.updateFilterOptions();
    this.renderDashboardSummary();
    this.renderCharts();
    this.renderCategoryBreakdown();
  }
}

// Export to global scope for use in inline scripts
if (typeof window !== 'undefined') {
  (window as any).DashboardRenderer = DashboardRenderer;
}
