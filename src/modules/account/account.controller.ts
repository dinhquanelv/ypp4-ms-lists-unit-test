import { Controller } from '@nestjs/common';
import { AccountService } from './account.service';
import { Account } from 'src/entities/account.entity';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  create(account: Account): Account {
    return this.accountService.create(account);
  }
}
