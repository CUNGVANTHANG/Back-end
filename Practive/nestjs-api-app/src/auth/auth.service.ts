import { Injectable } from "@nestjs/common";

@Injectable({}) // Injectable giúp cho AuthService có thể được inject vào các controller khác (mà không cần new)
export class AuthService {
    register() {
        return 'register';
    }

    login() {
        return 'login';
    }
}