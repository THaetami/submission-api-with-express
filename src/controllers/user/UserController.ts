import { Request, Response } from "express";
import IController from "./InterfaceController";
import UserService from "../../services/UserService";


class UserController implements IController {
    create = async (req: Request, res: Response): Promise<Response> => {
        const service: UserService = new UserService(req, res);
        const user = await service.addUser();
        return res.status(user.statusCode).json(user);
    }
}

export default new UserController();