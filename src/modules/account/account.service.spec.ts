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
    it('should create an account', () => {
      const account = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        accountPassword: 'SecurePass123!',
        avatar: 'https://example.com/avatar.jpg',
        company: 'Example Inc.',
        accountStatus: 'active',
      };

      const result = service.create(account);
      expect(result).toEqual(account);
    });

    it('should throw an error for invalid email format', () => {
      const account = {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'invalid-email',
        accountPassword: 'AnotherSecurePass123!',
        avatar: 'https://example.com/avatar2.jpg',
        company: 'Example Corp.',
        accountStatus: 'inactive',
      };

      expect(() => service.create(account)).toThrow('Invalid email format');
    });

    it('should throw an error for empty password', () => {
      const account = {
        firstName: 'Alice',
        lastName: 'Smith',
        email: 'alice@example.com',
        accountPassword: '',
        avatar: 'https://example.com/avatar3.jpg',
        company: 'Example LLC',
        accountStatus: 'active',
      };

      expect(() => service.create(account)).toThrow(
        'Account password cannot be empty',
      );
    });

    it('should throw an error for weak password', () => {
      const account = {
        firstName: 'Bob',
        lastName: 'Brown',
        email: 'bob@example.com',
        accountPassword: '123456',
        avatar: 'https://example.com/avatar4.jpg',
        company: 'Example Ltd.',
        accountStatus: 'active',
      };

      expect(() => service.create(account)).toThrow(
        'Account password must be at least 8 characters long, contain at least one uppercase letter and one number',
      );
    });

    it('should throw an error for missing first or last name', () => {
      const account = {
        firstName: '',
        lastName: 'Brown',
        email: 'brown@example.com',
        accountPassword: 'SecurePass456!',
        avatar: 'https://example.com/avatar4.jpg',
        company: 'Example Ltd.',
        accountStatus: 'active',
      };

      expect(() => service.create(account)).toThrow(
        'First name and last name are required',
      );
    });

    it('should throw an error for duplicate email', () => {
      const account1 = {
        firstName: 'Bob',
        lastName: 'Johnson',
        email: 'bob@example.com',
        accountPassword: 'SecurePass789!',
        avatar: 'https://example.com/avatar5.jpg',
        company: 'Example Group',
        accountStatus: 'active',
      };

      const account2 = {
        firstName: 'Alice',
        lastName: 'Johnson',
        email: 'bob@example.com',
        accountPassword: 'AnotherSecurePass789!',
        avatar: 'https://example.com/avatar6.jpg',
        company: 'Example Partners',
        accountStatus: 'inactive',
      };

      service.create(account1);
      expect(() => service.create(account2)).toThrow(
        'Account with this email already exists',
      );
    });

    it('should throw an error for invalid account status', () => {
      const account = {
        firstName: 'Charlie',
        lastName: 'Davis',
        email: 'charlie@example.com',
        accountPassword: 'SecurePass123!',
        avatar: 'https://example.com/avatar7.jpg',
        company: 'Example Corp.',
        accountStatus: 'unknown',
      };

      expect(() => service.create(account)).toThrow(
        'Account status must be either "active" or "inactive"',
      );
    });
  });
});
