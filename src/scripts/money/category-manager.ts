// Category Manager - Handles category management functionality
import type { MoneyManager } from '../money-manager.ts';
import { UIController } from './ui-controller.ts';
import { NotificationSystem } from './notification-system.ts';

export class CategoryManager {
  private moneyManager: MoneyManager;
  private uiController: UIController;

  constructor(moneyManager: MoneyManager, uiController: UIController) {
    this.moneyManager = moneyManager;
    this.uiController = uiController;
  }

  showCategoryModal(): void {
    this.uiController.showCategoryModal();
    this.updateCategoriesList();
  }

  hideCategoryModal(): void {
    this.uiController.hideCategoryModal();
  }

  updateCategoriesList(): void {
    const elements = this.uiController.getElements();
    if (!elements.currentCategoriesList || !this.moneyManager) return;
    
    const type = elements.categoryTypeSelect?.value || 'income';
    const categories = this.moneyManager.getCategories(type as 'income' | 'expense');
    
    elements.currentCategoriesList.innerHTML = categories.map(category => `
      <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
        <span class="text-sm font-medium text-gray-900">${category}</span>
        <button 
          onclick="window.removeCategory('${type}', '${category}')"
          class="text-red-600 hover:text-red-800 text-sm font-medium px-2 py-1 rounded hover:bg-red-50 transition-colors"
        >
          Remove
        </button>
      </div>
    `).join('');
  }

  addNewCategory(): void {
    const elements = this.uiController.getElements();
    if (!this.moneyManager) return;
    
    const type = elements.categoryTypeSelect?.value as 'income' | 'expense';
    const categoryName = elements.newCategoryInput?.value?.trim();
    
    if (!type || !categoryName) {
      NotificationSystem.error('Please select a type and enter a category name');
      return;
    }
    
    // Show loading state
    this.uiController.setButtonLoading(elements.addCategoryBtn, 'Adding...');
    
    try {
      const data = this.moneyManager.getData();
      if (!data.categories[type].includes(categoryName)) {
        data.categories[type].push(categoryName);
        data.categories[type].sort(); // Sort alphabetically
        this.moneyManager.setData(data);
        
        if (elements.newCategoryInput) elements.newCategoryInput.value = '';
        this.updateCategoriesList();
        this.uiController.updateCategories(this.moneyManager); // Update transaction form categories
        this.triggerDashboardRefresh(); // Refresh dashboard to show new categories
        NotificationSystem.success(`Category "${categoryName}" added successfully!`);
      } else {
        NotificationSystem.error('This category already exists');
      }
    } catch (error) {
      NotificationSystem.error(`Error adding category: ${(error as Error).message}`);
    } finally {
      // Restore button state
      this.uiController.restoreButtonState(elements.addCategoryBtn, 'Add');
    }
  }

  removeCategory(type: string, category: string): void {
    if (!this.moneyManager) return;
    
    if (confirm(`Remove "${category}" from ${type} categories?`)) {
      try {
        const data = this.moneyManager.getData();
        data.categories[type as 'income' | 'expense'] = data.categories[type as 'income' | 'expense'].filter(c => c !== category);
        this.moneyManager.setData(data);
        this.updateCategoriesList();
        this.uiController.updateCategories(this.moneyManager); // Update transaction form categories
        this.triggerDashboardRefresh(); // Refresh dashboard to show category changes
        NotificationSystem.success(`Category "${category}" removed successfully!`);
      } catch (error) {
        NotificationSystem.error(`Error removing category: ${(error as Error).message}`);
      }
    }
  }

  private triggerDashboardRefresh(): void {
    // Trigger dashboard refresh via custom event
    document.dispatchEvent(new CustomEvent('refreshDashboard'));
  }
}

// Export to global scope for use in inline scripts
if (typeof window !== 'undefined') {
  (window as any).CategoryManager = CategoryManager;
}
