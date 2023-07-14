import { Injectable } from '@angular/core';
import { Account } from './account';

@Injectable()

export class AccountsService {
  // Private property to store the accounts
  private accounts: Account[];
  liveAccount: number = 0;

  constructor() {
    // Load the accounts when the service is instantiated
    this.loadAccounts();
  }

  // Load accounts from local storage or initialize with default values
  private loadAccounts(): void {
    const savedAccounts = localStorage.getItem('accounts');
    if (savedAccounts) {
      // Parse the saved accounts from JSON
      this.accounts = JSON.parse(savedAccounts);
    } else {
      // If no saved accounts, initialize with default values
      this.accounts = [
        { id: 1, server: null, username: '', password: null, status: false, selected: false }
      ];
      // Save the changes
      this.saveChanges();
    }
  }

  // Save the changes to the accounts in local storage
  saveChanges(): void {
    localStorage.setItem('accounts',  JSON.stringify(this.accounts));
  }


  // Get all accounts
  getAccounts(): Account[] {
    return this.accounts;
  }

  // Get the count of active accounts
  getActiveAccountsCount(): number {
    return this.accounts.filter(account => account.status).length;
  }

  // Get the IDs of active accounts
  getActiveAccountsId(): number[] {
    return this.accounts.filter(account => account.status).map(account => account.id);
  } 
  
  // Get the active accounts
  getActiveAccounts(): Account[] {
    return this.accounts.filter(account => account.status);
  }

  addAccount(account: Account): void {
    const newId = this.accounts.length > 0 ? this.accounts[this.accounts.length - 1].id + 1 : 1;
    const newAccount: Account = { ...account, id: newId, server: 4200, status: false, selected: false };
    this.accounts.push(newAccount);
    this.liveAccount = this.accounts.length;
    this.saveChanges();
  }

  toggleAccountStatus(account: Account): void {
    if (account.username.trim() !== '' && account.password !== null) {
      // Toggle the status of the account
      account.status = !account.status;
      this.saveChanges(); // Save the changes to the accounts
      this.accounts = this.getAccounts();
      window.location.reload();
    }
  }

  deleteAccount(account: Account): void {
    const index = this.accounts.findIndex(acc => acc === account);
    if (index !== -1) {
      this.accounts.splice(index, 1);
      this.saveChanges();
      this.accounts = this.getAccounts(); // accounts dizisini güncelle
      window.location.reload();   
    }
  }
  

  updateAccount(account: Account): void {
    const index = this.accounts.findIndex(acc => acc.id === account.id);
    if (index !== -1) {
      this.accounts[index] = account;
      this.saveChanges();
      this.accounts = this.getAccounts();
      window.location.reload();
    }
  }
}
