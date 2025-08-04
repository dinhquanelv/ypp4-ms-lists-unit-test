import { Body, Controller, Post } from '@nestjs/common';
import { AccountService } from './account.service';
import { Account } from 'src/entities/account.entity';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  create(@Body() account: Account): Account {
    return this.accountService.create(account);
  }
}
