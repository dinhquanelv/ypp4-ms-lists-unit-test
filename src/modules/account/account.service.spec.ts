import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from './account.service';

describe('AccountService', () => {
  let service: AccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountService],
    }).compile();

    service = module.get<AccountService>(AccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    const baseAccount = {
      id: 1,
      firstName: 'Quan',
      lastName: 'Vo',
      email: 'quanvo@example.com',
      accountPassword: 'SecurePass123!',
      avatar: 'https://example.com/avatar.jpg',
      company: 'bbv Vietnam',
      accountStatus: 'active',
    };

    it('should create an account', () => {
      const account = { ...baseAccount };
      const result = service.create(account);
      expect(result).toEqual(account);
    });

    it('should throw an error for invalid email format', () => {
      const account = { ...baseAccount, email: 'quanvo' };

      expect(() => service.create(account)).toThrow('Invalid email format');
    });

    it('should throw an error for empty password', () => {
      const account = { ...baseAccount, accountPassword: '' };

      expect(() => service.create(account)).toThrow(
        'Account password cannot be empty',
      );
    });

    it('should throw an error for weak password', () => {
      const account = { ...baseAccount, accountPassword: '123456' };

      expect(() => service.create(account)).toThrow(
        'Account password must be at least 8 characters long, contain at least one uppercase letter and one number',
      );
    });

    it('should throw an error for missing first or last name', () => {
      const account = { ...baseAccount, firstName: '' };

      expect(() => service.create(account)).toThrow(
        'First name and last name are required',
      );
    });

    it('should throw an error for duplicate email', () => {
      const account1 = { ...baseAccount, email: 'quanvo@example.com' };
      const account2 = { ...baseAccount, email: 'quanvo@example.com' };

      service.create(account1);

      expect(() => service.create(account2)).toThrow(
        'Account with this email already exists',
      );
    });

    it('should throw an error for invalid account status', () => {
      const account = {
        ...baseAccount,
        accountStatus: 'unknown',
      };

      expect(() => service.create(account)).toThrow(
        'Account status must be either "active" or "inactive"',
      );
    });
  });

  describe('findAll()', () => {
    it('should return an empty array when no accounts exist', () => {
      const accounts = service.findAll();
      expect(accounts).toEqual([]);
    });

    it('should return all created accounts', () => {
      const account1 = {
        id: 1,
        firstName: 'Quan',
        lastName: 'Vo',
        email: 'quanvo@example.com',
        accountPassword: 'SecurePass123!',
        avatar: 'https://example.com/avatar.jpg',
        company: 'bbv Vietnam',
        accountStatus: 'active',
      };
      const account2 = {
        id: 2,
        firstName: 'Quan',
        lastName: 'Dinh',
        email: 'quandinh@example.com',
        accountPassword: 'SecurePass123!',
        avatar: 'https://example.com/avatar.jpg',
        company: 'bbv Vietnam',
        accountStatus: 'inactive',
      };

      service.create(account1);
      service.create(account2);

      const accounts = service.findAll();
      expect(accounts).toEqual([account1, account2]);
    });
  });

  describe('findOne()', () => {
    it('should throw an error when account does not exist', () => {
      expect(() => service.findOne(999)).toThrow('Account not found');
    });

    it('should return the account when it exists', () => {
      const account = {
        id: 1,
        firstName: 'Quan',
        lastName: 'Vo',
        email: 'quanvo@example.com',
        accountPassword: 'SecurePass123!',
        avatar: 'https://example.com/avatar.jpg',
        company: 'bbv Vietnam',
        accountStatus: 'active',
      };

      service.create(account);

      const result = service.findOne(1);
      expect(result).toEqual(account);
    });
  });

  describe('update()', () => {
    const baseAccount = {
      id: 1,
      firstName: 'Quan',
      lastName: 'Vo',
      email: 'quanvo@example.com',
      accountPassword: 'SecurePass123!',
      avatar: 'https://example.com/avatar.jpg',
      company: 'bbv Vietnam',
      accountStatus: 'active',
    };

    it('should update the account when it exists', () => {
      const account = { ...baseAccount };
      service.create(account);

      const updatedAccount = { ...account, firstName: 'Updated' };
      const result = service.update(1, updatedAccount);

      expect(result).toEqual(updatedAccount);
    });

    it('should throw an error when account does not exist', () => {
      const updatedAccount = { ...baseAccount, firstName: 'Updated' };

      expect(() => service.update(999, updatedAccount)).toThrow(
        'Account not found',
      );
    });

    it('should throw an error for invalid email format', () => {
      const account = { ...baseAccount };
      service.create(account);

      const updatedAccount = { ...account, email: 'invalid-email' };

      expect(() => service.update(1, updatedAccount)).toThrow(
        'Invalid email format',
      );
    });

    it('should throw an error for empty password', () => {
      const account = { ...baseAccount };
      service.create(account);

      const updatedAccount = { ...account, accountPassword: '' };

      expect(() => service.update(1, updatedAccount)).toThrow(
        'Account password cannot be empty',
      );
    });

    it('should throw an error for weak password', () => {
      const account = { ...baseAccount };
      service.create(account);

      const updatedAccount = { ...account, accountPassword: '123456' };

      expect(() => service.update(1, updatedAccount)).toThrow(
        'Account password must be at least 8 characters long, contain at least one uppercase letter and one number',
      );
    });

    it('should throw an error for missing first or last name', () => {
      const account = { ...baseAccount };
      service.create(account);

      const updatedAccount = { ...account, firstName: '' };

      expect(() => service.update(1, updatedAccount)).toThrow(
        'First name and last name are required',
      );
    });

    it('should throw an error for invalid account status', () => {
      const account = { ...baseAccount };
      service.create(account);

      const updatedAccount = { ...account, accountStatus: 'unknown' };

      expect(() => service.update(1, updatedAccount)).toThrow(
        'Account status must be either "active" or "inactive"',
      );
    });
  });

  describe('remove()', () => {
    it('should remove the account when it exists', () => {
      const account = {
        id: 1,
        firstName: 'Quan',
        lastName: 'Vo',
        email: 'quanvo@example.com',
        accountPassword: 'SecurePass123!',
        avatar: 'https://example.com/avatar.jpg',
        company: 'bbv Vietnam',
        accountStatus: 'active',
      };
      service.create(account);

      service.remove(1);

      expect(() => service.findOne(1)).toThrow('Account not found');
    });

    it('should throw an error when account does not exist', () => {
      expect(() => service.remove(999)).toThrow('Account not found');
    });
  });
});
