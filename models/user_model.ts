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
    permissions: Record<string, Record<string, boolean>>;

    constructor(userRole: UserRole){
        this.name = faker.person.firstName();
        this.email = faker.internet.email();
        this.password = '123';
        this.role = userRole;
        this.permissions = {
            "admin": {"cadastrar-usuarios": true, "listar-usuarios": true, "cadastrar-produtos": true, "listar-produtos": true},
            "common": {"cadastrar-usuarios": false, "listar-usuarios": true, "cadastrar-produtos": false, "listar-produtos": true}
        }
    }

}