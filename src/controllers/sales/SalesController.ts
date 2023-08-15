import { Request, Response } from "express";
import IController from "./InterfaceController";
import SalesService from "../../services/SalesService";


class SalesController implements IController {
    index = async (req: Request, res: Response): Promise<Response> => {
        const service: SalesService = new SalesService(req, res);
        const sales = await service.index();
        return res.status(sales.statusCode).json(sales);
    }

    create = async (req: Request, res: Response): Promise<Response> => {
        const service: SalesService = new SalesService(req, res);
        const sales = await service.addSales();
        return res.status(sales.statusCode).json(sales);
    }

    show = async (req: Request, res: Response): Promise<Response> => {
        const service: SalesService = new SalesService(req, res);
        const sales = await service.showSales();
        return res.status(sales.statusCode).json(sales);
    }

    destroy = async (req: Request, res: Response): Promise<Response> => {
        const service: SalesService = new SalesService(req, res);
        const sales = await service.destroySales();
        return res.status(sales.statusCode).json(sales);
    }

    update = async (req: Request, res: Response): Promise<Response> => {
        const service: SalesService = new SalesService(req, res);
        const sales = await service.updateSales();
        return res.status(sales.statusCode).json(sales);
    }
}

export default new SalesController();