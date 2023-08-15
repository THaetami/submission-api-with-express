import { Request, Response } from "express";
import SalesRepository from "../repository/SalesRepository";
import PenjualanRepository from "../repository/PenjulanRepository";



class SalesService {
    
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

    async index(): Promise<any> {      
        const result = await SalesRepository.getAllSales();
        
        const statusCode = 200;
        const status = 'success';
        const sales = result;
      
        return { statusCode, status, sales };
    }

    async addSales(): Promise<any> {
        const { sal_nm, sal_bekerjasejak, sal_kta_id } = this.body;
      
        const sal_id = await SalesRepository.getSalId();
        const lastNumericPart = sal_id ? parseInt(sal_id.substring(1), 10) : 0;
        const newNumericPart = lastNumericPart + 1;
        const new_sal_id = `S${newNumericPart.toString().padStart(3, '0')}`;
      
        const result = await SalesRepository.addSales(new_sal_id, sal_nm, sal_bekerjasejak, sal_kta_id);
        
        const statusCode = result ? 201 : 400;
        const status = result ? 'success' : 'fail';
        const message = result ? undefined : 'user gagal ditambahkan';
        const addedSales = result ? result : undefined;
      
        return { statusCode, status, addedSales, message };
    }

    async showSales(): Promise<any> {
        const { id } = this.params;
      
        const result = await SalesRepository.getSalesById(id)
        
        const statusCode = result ? 200 : 404;
        const status = result ? 'success' : 'fail';
        const message = result ? undefined : 'sales tidak ditemukan';
        const sales = result ? result : undefined;
      
        return { statusCode, status, sales, message };
    }

    async destroySales(): Promise<any> {
        const { id } = this.params;
      
        const sales = await SalesRepository.getSalesById(id);
      
        if (!sales) {
          return { statusCode: 404, status: 'fail', message: 'sales tidak ditemukan' };
        }

        const jul_sal_id = await PenjualanRepository.getPenjualanById(sales.sal_id);

        if (jul_sal_id) {
            return { statusCode: 422, status: 'fail', message: 'sales tidak bisa dihapus' };
        }
      
        await SalesRepository.destroySales(sales.sal_id);
      
        return { statusCode: 204, status: 'success', message: `sales ${sales.sal_id}, berhasil dihapus`};

    }
      
    async updateSales(): Promise<any> {
        const { sal_nm, sal_bekerjasejak, sal_kta_id } = this.body;
        const { id } = this.params;
      
        const sales = await SalesRepository.getSalesById(id);
      
        if (!sales) {
          return { statusCode: 404, status: 'fail', message: 'sales tidak ditemukan' };
        }
      
        await SalesRepository.updateSales(id, sal_nm, sal_bekerjasejak, sal_kta_id);
        
        return { statusCode: 201, status: 'success', message: `sales ${sales.sal_id}, berhasil diupdate`};
    }
      
}

export default SalesService;