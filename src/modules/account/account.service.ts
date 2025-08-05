import { Injectable } from '@nestjs/common';
import { Account } from 'src/entities/account.entity';

@Injectable()
export class AccountService {
  private accounts: Account[] = [];

  create(account: Account): Account {
    const email = account.email.trim().toLowerCase();

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      throw new Error('Invalid email format');
    }

    if (!account.accountPassword || account.accountPassword.trim() === '') {
      throw new Error('Account password cannot be empty');
    }

    if (
      account.accountPassword.length < 8 ||
      !/[A-Z]/.test(account.accountPassword) ||
      !/\d/.test(account.accountPassword)
    ) {
      throw new Error(
        'Account password must be at least 8 characters long, contain at least one uppercase letter and one number',
      );
    }

    if (!account.firstName || !account.lastName) {
      throw new Error('First name and last name are required');
    }

    const existingAccount = this.accounts.find(
      (acc) => acc.email.toLowerCase() === email,
    );
    if (existingAccount) {
      throw new Error('Account with this email already exists');
    }

    if (
      account.accountStatus !== 'active' &&
      account.accountStatus !== 'inactive'
    ) {
      throw new Error('Account status must be either "active" or "inactive"');
    }

    this.accounts.push(account);
    return account;
  }

  findAll(): Account[] {
    return this.accounts;
  }

  findOne(id: number): Account {
    const account = this.accounts.find((acc) => acc.id === id);

    if (!account) {
      throw new Error('Account not found');
    }

    return account;
  }

  update(id: number, account: Account): Account {
    const index = this.accounts.findIndex((acc) => acc.id === id);

    if (index === -1) {
      throw new Error('Account not found');
    }

    const email = account.email.trim().toLowerCase();

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      throw new Error('Invalid email format');
    }

    if (!account.accountPassword || account.accountPassword.trim() === '') {
      throw new Error('Account password cannot be empty');
    }

    if (
      account.accountPassword.length < 8 ||
      !/[A-Z]/.test(account.accountPassword) ||
      !/\d/.test(account.accountPassword)
    ) {
      throw new Error(
        'Account password must be at least 8 characters long, contain at least one uppercase letter and one number',
      );
    }

    if (!account.firstName || !account.lastName) {
      throw new Error('First name and last name are required');
    }

    const existingAccount = this.accounts.find(
      (acc) => acc.email.toLowerCase() === email && acc.id !== id,
    );
    if (existingAccount) {
      throw new Error('Account with this email already exists');
    }

    if (
      account.accountStatus !== 'active' &&
      account.accountStatus !== 'inactive'
    ) {
      throw new Error('Account status must be either "active" or "inactive"');
    }

    this.accounts[index] = account;
    return account;
  }

  remove(id: number): void {
    const index = this.accounts.findIndex((acc) => acc.id === id);

    if (index === -1) {
      throw new Error('Account not found');
    }

    this.accounts.splice(index, 1);
  }
}
