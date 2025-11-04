// Main App Controller - Coordinates all modules and initializes the application
import { MoneyManager } from '../money-manager.ts';
import { UIController } from './ui-controller.ts';
import { NotificationSystem } from './notification-system.ts';
import { TransactionController } from './transaction-controller.ts';
import { DashboardRenderer } from './dashboard-renderer.ts';
import { CategoryManager } from './category-manager.ts';
import { FileOperations } from './file-operations.ts';

export class AppController {
  private moneyManager: MoneyManager;
  private uiController: UIController;
  private transactionController: TransactionController;
  private dashboardRenderer: DashboardRenderer;
  private categoryManager: CategoryManager;
  private fileOperations: FileOperations;

  constructor() {
    this.moneyManager = new MoneyManager();
    this.uiController = new UIController();
    this.transactionController = new TransactionController(this.moneyManager, this.uiController);
    this.dashboardRenderer = new DashboardRenderer(this.moneyManager, this.uiController);
    this.categoryManager = new CategoryManager(this.moneyManager, this.uiController);
    this.fileOperations = new FileOperations(this.moneyManager, this.uiController);
  }

  initialize(): void {
    try {
      this.attachEventListeners();
      this.setupCustomEventListeners();
      this.renderInitialData();
      
      // Make functions globally available for inline onclick handlers
      this.setupGlobalFunctions();
      
      console.log('Money Manager initialized successfully');
    } catch (error) {
      console.error('Error initializing Money Manager:', error);
      NotificationSystem.error('Error initializing application. Please refresh the page.');
    }
  }

  private attachEventListeners(): void {
    const elements = this.uiController.getElements();
    
    // Data Management event listeners
    if (elements.uploadBtn) elements.uploadBtn.addEventListener('click', () => this.fileOperations.handleUpload());
    if (elements.downloadBtn) elements.downloadBtn.addEventListener('click', () => this.fileOperations.handleDownload());
    if (elements.loadSampleBtn) elements.loadSampleBtn.addEventListener('click', () => this.fileOperations.handleLoadSample());
    if (elements.clearBtn) elements.clearBtn.addEventListener('click', () => this.fileOperations.handleClear());
    
    // Transaction Management event listeners
    if (elements.addTransactionBtn) elements.addTransactionBtn.addEventListener('click', () => this.uiController.showAddTransactionForm());
    if (elements.saveTransactionBtn) elements.saveTransactionBtn.addEventListener('click', () => this.transactionController.addOrUpdateTransaction());
    if (elements.cancelTransactionBtn) elements.cancelTransactionBtn.addEventListener('click', () => this.uiController.hideAddTransactionForm());
    
    // Form event listeners
    if (elements.transactionType) {
      elements.transactionType.addEventListener('change', () => this.uiController.updateCategories(this.moneyManager));
    }
    
    // Filter event listeners
    if (elements.monthFilter) {
      elements.monthFilter.addEventListener('change', () => {
        this.dashboardRenderer.render();
        this.dashboardRenderer.renderTransactions();
      });
    }
    
    if (elements.categoryFilter) {
      elements.categoryFilter.addEventListener('change', () => {
        this.dashboardRenderer.render();
        this.dashboardRenderer.renderTransactions();
      });
    }
    
    // Category Management event listeners
    if (elements.manageCategoriesBtn) elements.manageCategoriesBtn.addEventListener('click', () => this.categoryManager.showCategoryModal());
    if (elements.closeCategoryModalBtn) elements.closeCategoryModalBtn.addEventListener('click', () => this.categoryManager.hideCategoryModal());
    if (elements.closeCategoryModalBtnMobile) elements.closeCategoryModalBtnMobile.addEventListener('click', () => this.categoryManager.hideCategoryModal());
    if (elements.addCategoryBtn) elements.addCategoryBtn.addEventListener('click', () => this.categoryManager.addNewCategory());
    if (elements.categoryTypeSelect) elements.categoryTypeSelect.addEventListener('change', () => this.categoryManager.updateCategoriesList());
    
    // Close modal when clicking outside
    if (elements.categoryModal) {
      elements.categoryModal.addEventListener('click', (e) => {
        if (e.target === elements.categoryModal) {
          this.categoryManager.hideCategoryModal();
        }
      });
    }
  }

  private setupCustomEventListeners(): void {
    // Listen for refresh events from other modules
    document.addEventListener('refreshDashboard', () => {
      this.dashboardRenderer.render();
    });
    
    document.addEventListener('refreshTransactions', () => {
      this.dashboardRenderer.renderTransactions();
    });
  }

  private renderInitialData(): void {
    this.uiController.updateCategories(this.moneyManager);
    this.dashboardRenderer.render();
    this.dashboardRenderer.renderTransactions();
  }

  private setupGlobalFunctions(): void {
    // Make functions globally available for inline onclick handlers
    (window as any).editTransaction = (id: string) => this.transactionController.editTransaction(id);
    (window as any).deleteTransaction = (id: string) => this.transactionController.deleteTransaction(id);
    (window as any).removeCategory = (type: string, category: string) => this.categoryManager.removeCategory(type, category);
  }
}

// Export to global scope for use in inline scripts
if (typeof window !== 'undefined') {
  (window as any).AppController = AppController;
}
