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
});
