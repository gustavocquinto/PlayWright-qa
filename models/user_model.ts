import { faker } from "@faker-js/faker/locale/pt_BR";


// Enum garante role válida mesmo se User for instanciado direto, sem usar UserFactory
export enum UserRole{
    COMMON = 'common',
    ADMIN = 'admin',
    MANAGER = 'manager',
    PREMIUM = 'premium',
}

export class User{
    name: string;
    email: string;
    password: string;
    role: UserRole;

    constructor(userRole: UserRole){
        this.name = faker.person.firstName();
        this.email = faker.internet.email();
        this.password = '123';
        this.role = userRole;
    }
}