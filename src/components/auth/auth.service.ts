import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { 
            user : {
                id: user.user.id, 
                email: user.user.email, 
                name: user.user.name, 
                created_at: user.user.createdAt
            }
        };
        // console.log({payload});
        return {
          access_token: this.jwtService.sign(payload),
        };

    }

    async register(user: any) {
        const newUser = await this.usersService.create(user);
        const { password, ...result } = newUser;
        return result;
    }

    decodeToken(token) : any {
        return this.jwtService.decode(token)
    }
}
