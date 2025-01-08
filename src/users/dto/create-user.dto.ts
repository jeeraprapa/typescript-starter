export class CreateUserDto {
    name: string;
    last_name: string;
    age: number;
    email: string;
    password: string;
    role?: string;
}
