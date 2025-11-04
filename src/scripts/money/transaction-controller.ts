// Transaction Controller - Handles transaction CRUD operations
import type { MoneyManager, Transaction } from '../money-manager.ts';
import { UIController } from './ui-controller.ts';
import { NotificationSystem } from './notification-system.ts';

export class TransactionController {
  private moneyManager: MoneyManager;
  private uiController: UIController;

  constructor(moneyManager: MoneyManager, uiController: UIController) {
    this.moneyManager = moneyManager;
    this.uiController = uiController;
  }

  addOrUpdateTransaction(): void {
    const elements = this.uiController.getElements();
    const editingId = (document.getElementById('editing-transaction-id') as HTMLInputElement)?.value;
    const date = elements.transactionDate?.value;
    const type = elements.transactionType?.value as 'income' | 'expense';
    const category = elements.transactionCategory?.value || '';
    const amount = parseFloat(elements.transactionAmount?.value || '0');
    const description = elements.transactionDescription?.value;

    if (!date || !amount || !description) {
      NotificationSystem.error('Please fill in all fields');
      return;
    }

    if (amount <= 0) {
      NotificationSystem.error('Amount must be greater than 0');
      return;
    }

    if (new Date(date) > new Date()) {
      NotificationSystem.error('Date cannot be in the future');
      return;
    }

    const transaction: Transaction = {
      id: editingId || Date.now().toString(),
      date,
      description,
      amount: type === 'expense' ? -Math.abs(amount) : Math.abs(amount),
      category,
      type
    };

    // Show loading state
    this.uiController.setButtonLoading(elements.saveTransactionBtn, 'Saving...');

    try {
      if (editingId) {
        // Update existing transaction
        const data = this.moneyManager.getData();
        const index = data.transactions.findIndex(t => t.id === editingId);
        if (index !== -1) {
          data.transactions[index] = transaction;
          this.moneyManager.setData(data);
        }
        NotificationSystem.success('Transaction updated successfully!');
      } else {
        // Add new transaction
        this.moneyManager.addTransaction(transaction);
        NotificationSystem.success('Transaction added successfully!');
      }
      
      // Trigger dashboard and transaction list refresh
      this.triggerRefresh();
      this.uiController.hideAddTransactionForm();
    } catch (error) {
      NotificationSystem.error(`Error saving transaction: ${(error as Error).message}`);
    } finally {
      // Restore button state
      this.uiController.restoreButtonState(elements.saveTransactionBtn, '<span id="save-button-text">Add Transaction</span>');
    }
  }

  editTransaction(id: string): void {
    const data = this.moneyManager.getData();
    const transaction = data.transactions.find(t => t.id === id);
    
    if (!transaction) return;
    
    // Populate form with transaction data
    const formTitle = document.getElementById('form-title');
    const saveButtonText = document.getElementById('save-button-text');
    const editingId = document.getElementById('editing-transaction-id') as HTMLInputElement;
    const elements = this.uiController.getElements();
    
    if (formTitle) formTitle.textContent = 'Edit Transaction';
    if (saveButtonText) saveButtonText.textContent = 'Update Transaction';
    if (editingId) editingId.value = id;
    if (elements.transactionDate) elements.transactionDate.value = transaction.date;
    if (elements.transactionType) elements.transactionType.value = transaction.type;
    if (elements.transactionDescription) elements.transactionDescription.value = transaction.description;
    if (elements.transactionAmount) elements.transactionAmount.value = Math.abs(transaction.amount).toString();
    
    // Update categories and set the correct category
    this.uiController.updateCategories(this.moneyManager);
    setTimeout(() => {
      if (elements.transactionCategory) elements.transactionCategory.value = transaction.category;
    }, 100);
    
    // Show the form
    this.uiController.showAddTransactionForm();
  }

  deleteTransaction(id: string): void {
    if (confirm('Are you sure you want to delete this transaction?')) {
      try {
        this.moneyManager.deleteTransaction(id);
        this.triggerRefresh();
        NotificationSystem.success('Transaction deleted successfully!');
      } catch (error) {
        NotificationSystem.error(`Error deleting transaction: ${(error as Error).message}`);
      }
    }
  }

  private triggerRefresh(): void {
    // This will be implemented by the main app controller
    // We'll use custom events to communicate between modules
    document.dispatchEvent(new CustomEvent('refreshDashboard'));
    document.dispatchEvent(new CustomEvent('refreshTransactions'));
  }
}

// Export to global scope for use in inline scripts
if (typeof window !== 'undefined') {
  (window as any).TransactionController = TransactionController;
}
