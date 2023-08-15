import BaseRoutes from "./base/BaseRouter";
import addSalesValidation from "../middlewares/validation/sales/AddSalesValidation";
import SalesController from "../controllers/sales/SalesController";
import updateSalesValidation from "../middlewares/validation/sales/UpdateSalesValidation";
import { auth } from "../middlewares/AuthMiddleware";

class SalesRoutes extends BaseRoutes {
    public routes(): void {
        this.router.get('/', auth, SalesController.index);
        this.router.post('/', auth, addSalesValidation, SalesController.create);
        this.router.get('/:id', auth, SalesController.show);
        this.router.put('/:id', auth, updateSalesValidation, SalesController.update);
        this.router.delete('/:id', auth, SalesController.destroy);
    }
}

export default new SalesRoutes().router;