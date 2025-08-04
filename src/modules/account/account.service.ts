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
}
