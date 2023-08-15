import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";
import SalesRepository from "../../../repository/SalesRepository";
import KotaRepository from "../../../repository/KotaRepository";
import PenjualanRepository from "../../../repository/PenjulanRepository";

const updateSalesValidation = [
    check('sal_nm')
        .trim()
        .custom(async (value, { req }) => {
            const id = req.params?.id;
            const existingSales = await SalesRepository.getSalesById(id);

            if (existingSales && req.body.sal_nm !== existingSales.sal_nm) {
                if (!value) {
                    throw new Error('harus diisi.');
                }

                const duplicateSales = await SalesRepository.checkSalesname(value);
                if (duplicateSales) {
                    throw new Error('nama sales sudah ada.');
                }
            }
            return true;
        }),
    check('sal_bekerjasejak')
        .trim()
        .notEmpty().withMessage('harus diisi.')
        .isDate().withMessage('harus tanggal')
        .custom(async (value, { req }) => {
            const id = req.params?.id;
            const existingPenjualan = await PenjualanRepository.getPenjualanById(id);
        
            if (existingPenjualan && new Date(req.body.sal_bekerjasejak) > new Date(existingPenjualan.jul_tanggaljual)) {
                throw new Error('tanggal bekerja tidak benar.');
            }
        
            return true;
        }),  
    check('sal_kta_id')
          .trim()
          .notEmpty().withMessage('harus diisi.')
          .custom(async (value, { req }) => {
              const kota = await KotaRepository.checkKotaId(value);
              if (!kota) {
                  throw new Error('nama kota tidak ditemukan.');
              }
              return true;
          }),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json(errors);
        }

        return next();
    }
];

export default updateSalesValidation;
