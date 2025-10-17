import { User, UserRole } from "../models/user_model";

export class UserFactory{

    admin(){
        return new User(UserRole.ADMIN);
    }

    common(){
        return new User(UserRole.COMMON);
    }
}