import BaseRoutes from "./base/BaseRouter";
import addUserValidation from "../middlewares/validation/user/AddUserValidation";
import UserController from "../controllers/user/UserController";

class UserRoutes extends BaseRoutes {
    public routes(): void {
        this.router.post('/', addUserValidation, UserController.create);
    }
}

export default new UserRoutes().router;