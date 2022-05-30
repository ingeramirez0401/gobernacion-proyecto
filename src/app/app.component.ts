import { Component } from '@angular/core';

import { AccountService } from './_services';
import { Account, Role } from './_models';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    Role = Role;
    account: Account;
    date: any;

    constructor(private accountService: AccountService) {
        this.accountService.account.subscribe(x => this.account = x);
        this.date = new Date();
    }

    logout() {
        this.accountService.logout();
    }
}