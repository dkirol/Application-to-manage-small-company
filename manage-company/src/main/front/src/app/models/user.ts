import { plainToClass } from "class-transformer";

export class User {
    constructor(public id: string,
        public email: string,
        public userName: string) {
}

    public static deserialize(user: User) {
        user = plainToClass(User, user);
        return user;
    }

    public static serialize(user: User) {
        const newUser = plainToClass(User, user);
        return newUser;
    }
}

export class UserPasswordChange {
    public oldPassword: string;
    public newPassword1: string;
    public newPassword2: string;
}

