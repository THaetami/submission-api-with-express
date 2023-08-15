import { Request, Response } from "express";
import UserRepository from "../repository/UserRepository";
import AuthenticationService from "./AuthenticationService";
import AddedUser from "../entities/AddedUser";


class UserService {
    
    credential: any;
    body: Request['body'];
    params: Request['params'];

    constructor(req: Request, res: Response) {
        if (req.app.locals.credential) {
            this.credential = req.app.locals.credential.user;
        } else {
            this.credential = null;
        }
        this.body = req.body;
        this.params = req.params;
    }

    async addUser(): Promise<any> {
        const { username, password } = this.body;
        const hashedPassword: string = await AuthenticationService.passwordHash(password);
        const result = await UserRepository.addUser(username, hashedPassword);
        if (!result) {
            return { statusCode: 400, status: 'fail', message: 'user gagal ditambahkan' };
        }
        return { statusCode: 201, status: 'success', addedUser: new AddedUser(result)};
    }
}

export default UserService;