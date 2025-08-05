import { Controller } from '@nestjs/common';
import { AccountService } from './account.service';
import { Account } from 'src/entities/account.entity';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  create(account: Account): Account {
    return this.accountService.create(account);
  }

  findAll(): Account[] {
    return this.accountService.findAll();
  }

  findOne(id: number): Account {
    return this.accountService.findOne(id);
  }

  update(id: number, account: Account): Account {
    return this.accountService.update(id, account);
  }

  remove(id: number): void {
    this.accountService.remove(id);
  }
}
