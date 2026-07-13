import { User } from "../types/user.types";

export class UsersPolicies {
    static isAuthorizedToDashboard(user: User): boolean {
        return user.role === "admin" || user.role === "seller";
    }

    static isAdmin(user: User): boolean {
        return user.role === "admin";
    }

    static isSeller(user: User): boolean {
        return this.isAdmin(user) || user.role === "seller";
    }
}