// File Operations - Handles upload, download, clear, and sample data operations
import type { MoneyManager } from '../money-manager.ts';
import { UIController } from './ui-controller.ts';
import { NotificationSystem } from './notification-system.ts';
import { downloadData, handleFileUpload, loadSampleData } from '../money-manager.ts';

export class FileOperations {
  private moneyManager: MoneyManager;
  private uiController: UIController;

  constructor(moneyManager: MoneyManager, uiController: UIController) {
    this.moneyManager = moneyManager;
    this.uiController = uiController;
  }

  handleUpload(): void {
    if (!this.moneyManager) return;
    
    // Show loading state
    const elements = this.uiController.getElements();
    this.uiController.setButtonLoading(elements.uploadBtn, 'Uploading...');
    
    handleFileUpload((data) => {
      try {
        this.moneyManager.setData(data);
        this.triggerRefresh();
        NotificationSystem.success('Data uploaded successfully!');
      } catch (error) {
        NotificationSystem.error(`Error uploading data: ${(error as Error).message}`);
      } finally {
        // Restore button state
        this.uiController.restoreButtonState(elements.uploadBtn, `
          <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
          </svg>
          <span class="hidden sm:inline">Upload Data</span>
          <span class="sm:hidden">Upload</span>
        `);
      }
    });
  }

  handleDownload(): void {
    if (!this.moneyManager) return;
    
    // Show loading state
    const elements = this.uiController.getElements();
    this.uiController.setButtonLoading(elements.downloadBtn, 'Downloading...');
    
    try {
      downloadData(this.moneyManager.getData());
      NotificationSystem.success('Data downloaded successfully!');
    } catch (error) {
      NotificationSystem.error(`Error downloading data: ${(error as Error).message}`);
    } finally {
      // Restore button state
      this.uiController.restoreButtonState(elements.downloadBtn, `
        <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
        </svg>
        <span class="hidden sm:inline">Download Data</span>
        <span class="sm:hidden">Download</span>
      `);
    }
  }

  handleLoadSample(): void {
    if (!this.moneyManager) return;
    
    if (confirm('This will replace your current data with sample transactions. Continue?')) {
      // Show loading state
      const elements = this.uiController.getElements();
      this.uiController.setButtonLoading(elements.loadSampleBtn, 'Loading...');
      
      try {
        loadSampleData((data) => {
          this.moneyManager.setData(data);
          this.triggerRefresh();
          NotificationSystem.success('Sample data loaded successfully!');
        });
      } catch (error) {
        NotificationSystem.error(`Error loading sample data: ${(error as Error).message}`);
      } finally {
        // Restore button state
        this.uiController.restoreButtonState(elements.loadSampleBtn, `
          <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          <span class="hidden sm:inline">Load Sample Data</span>
          <span class="sm:hidden">Sample</span>
        `);
      }
    }
  }

  handleClear(): void {
    if (!this.moneyManager) return;
    
    if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      // Show loading state
      const elements = this.uiController.getElements();
      this.uiController.setButtonLoading(elements.clearBtn, 'Clearing...');
      
      try {
        this.moneyManager.clearAllData();
        this.triggerRefresh();
        NotificationSystem.success('All data cleared successfully!');
      } catch (error) {
        NotificationSystem.error(`Error clearing data: ${(error as Error).message}`);
      } finally {
        // Restore button state
        this.uiController.restoreButtonState(elements.clearBtn, `
          <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
          <span class="hidden sm:inline">Clear All Data</span>
          <span class="sm:hidden">Clear</span>
        `);
      }
    }
  }

  private triggerRefresh(): void {
    // Trigger dashboard and transaction list refresh via custom events
    document.dispatchEvent(new CustomEvent('refreshDashboard'));
    document.dispatchEvent(new CustomEvent('refreshTransactions'));
  }
}

// Export to global scope for use in inline scripts
if (typeof window !== 'undefined') {
  (window as any).FileOperations = FileOperations;
}
