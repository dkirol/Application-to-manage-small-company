import { plainToClass } from "class-transformer";

export class Account {
    constructor(public id: string,
        public login: string){ }

    public static deserialize(account: Account) {
        account = plainToClass(Account, account);
        return account;
    }

    public static serialize(account: Account) {
        const newAccount = plainToClass(Account, account);
        return newAccount;
    }
}

export class AccountPasswordChange {
    public oldPassword: string;
    public newPassword1: string;
    public newPassword2: string;
}

