// UI Controller - Manages DOM elements and basic UI interactions
import type { MoneyManager } from '../money-manager.ts';

export interface UIElements {
  // Data Management
  uploadBtn: HTMLButtonElement | null;
  downloadBtn: HTMLButtonElement | null;
  loadSampleBtn: HTMLButtonElement | null;
  clearBtn: HTMLButtonElement | null;
  
  // Dashboard
  dashboardSummaryContainer: HTMLElement | null;
  dashboardChartsContainer: HTMLElement | null;
  categoryBreakdownContainer: HTMLElement | null;
  monthFilter: HTMLSelectElement | null;
  categoryFilter: HTMLSelectElement | null;
  
  // Transaction Management
  addTransactionBtn: HTMLButtonElement | null;
  saveTransactionBtn: HTMLButtonElement | null;
  cancelTransactionBtn: HTMLButtonElement | null;
  addTransactionForm: HTMLElement | null;
  transactionListContainer: HTMLElement | null;
  
  // Form Elements
  transactionDate: HTMLInputElement | null;
  transactionType: HTMLSelectElement | null;
  transactionCategory: HTMLSelectElement | null;
  transactionAmount: HTMLInputElement | null;
  transactionDescription: HTMLInputElement | null;
  
  // Category Management
  manageCategoriesBtn: HTMLButtonElement | null;
  categoryModal: HTMLElement | null;
  categoryTypeSelect: HTMLSelectElement | null;
  newCategoryInput: HTMLInputElement | null;
  addCategoryBtn: HTMLButtonElement | null;
  currentCategoriesList: HTMLElement | null;
  closeCategoryModalBtn: HTMLButtonElement | null;
  closeCategoryModalBtnMobile: HTMLButtonElement | null;
}

export class UIController {
  private elements: UIElements;

  constructor() {
    this.elements = this.initializeElements();
  }

  private initializeElements(): UIElements {
    return {
      // Data Management
      uploadBtn: document.getElementById('upload-btn') as HTMLButtonElement,
      downloadBtn: document.getElementById('download-btn') as HTMLButtonElement,
      loadSampleBtn: document.getElementById('load-sample-btn') as HTMLButtonElement,
      clearBtn: document.getElementById('clear-btn') as HTMLButtonElement,
      
      // Dashboard
      dashboardSummaryContainer: document.getElementById('dashboard-summary'),
      dashboardChartsContainer: document.getElementById('dashboard-charts'),
      categoryBreakdownContainer: document.getElementById('category-breakdown'),
      monthFilter: document.getElementById('month-filter') as HTMLSelectElement,
      categoryFilter: document.getElementById('category-filter') as HTMLSelectElement,
      
      // Transaction Management
      addTransactionBtn: document.getElementById('add-transaction-btn') as HTMLButtonElement,
      saveTransactionBtn: document.getElementById('save-transaction-btn') as HTMLButtonElement,
      cancelTransactionBtn: document.getElementById('cancel-transaction-btn') as HTMLButtonElement,
      addTransactionForm: document.getElementById('add-transaction-form'),
      transactionListContainer: document.getElementById('transaction-list'),
      
      // Form Elements
      transactionDate: document.getElementById('transaction-date') as HTMLInputElement,
      transactionType: document.getElementById('transaction-type') as HTMLSelectElement,
      transactionCategory: document.getElementById('transaction-category') as HTMLSelectElement,
      transactionAmount: document.getElementById('transaction-amount') as HTMLInputElement,
      transactionDescription: document.getElementById('transaction-description') as HTMLInputElement,
      
      // Category Management
      manageCategoriesBtn: document.getElementById('manage-categories-btn') as HTMLButtonElement,
      categoryModal: document.getElementById('category-modal'),
      categoryTypeSelect: document.getElementById('category-type-select') as HTMLSelectElement,
      newCategoryInput: document.getElementById('new-category-input') as HTMLInputElement,
      addCategoryBtn: document.getElementById('add-category-btn') as HTMLButtonElement,
      currentCategoriesList: document.getElementById('current-categories-list'),
      closeCategoryModalBtn: document.getElementById('close-category-modal-btn') as HTMLButtonElement,
      closeCategoryModalBtnMobile: document.getElementById('close-category-modal-btn-mobile') as HTMLButtonElement,
    };
  }

  getElements(): UIElements {
    return this.elements;
  }

  // Show/hide add transaction form
  showAddTransactionForm(): void {
    if (this.elements.addTransactionForm) {
      this.elements.addTransactionForm.classList.remove('hidden');
      
      // Set today's date as default
      if (this.elements.transactionDate) {
        this.elements.transactionDate.value = new Date().toISOString().split('T')[0];
      }
    }
  }

  hideAddTransactionForm(): void {
    if (this.elements.addTransactionForm) {
      this.elements.addTransactionForm.classList.add('hidden');
      if (this.elements.transactionDescription) this.elements.transactionDescription.value = '';
      if (this.elements.transactionAmount) this.elements.transactionAmount.value = '';
      
      // Reset form title and button text
      const formTitle = document.getElementById('form-title');
      const saveButtonText = document.getElementById('save-button-text');
      const editingId = document.getElementById('editing-transaction-id') as HTMLInputElement;
      
      if (formTitle) formTitle.textContent = 'Add New Transaction';
      if (saveButtonText) saveButtonText.textContent = 'Add Transaction';
      if (editingId) editingId.value = '';
    }
  }

  // Show/hide category modal
  showCategoryModal(): void {
    if (this.elements.categoryModal) {
      this.elements.categoryModal.classList.remove('hidden');
    }
  }

  hideCategoryModal(): void {
    if (this.elements.categoryModal) {
      this.elements.categoryModal.classList.add('hidden');
    }
  }

  // Set button loading state
  setButtonLoading(button: HTMLButtonElement | null, loadingText: string): void {
    if (!button) return;
    
    button.disabled = true;
    button.innerHTML = `
      <svg class="w-4 h-4 sm:w-5 sm:h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
      </svg>
      <span>${loadingText}</span>
    `;
  }

  // Restore button state
  restoreButtonState(button: HTMLButtonElement | null, originalContent: string): void {
    if (!button) return;
    
    button.disabled = false;
    button.innerHTML = originalContent;
  }

  // Update category dropdown based on transaction type
  updateCategories(moneyManager: MoneyManager): void {
    const type = this.elements.transactionType?.value as 'income' | 'expense';
    if (!type || !moneyManager) return;

    const categories = moneyManager.getCategories(type);
    
    if (this.elements.transactionCategory) {
      this.elements.transactionCategory.innerHTML = '';
      categories.forEach((category: string) => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        this.elements.transactionCategory!.appendChild(option);
      });
    }
  }
}

// Export to global scope for use in inline scripts
if (typeof window !== 'undefined') {
  (window as any).UIController = UIController;
}
