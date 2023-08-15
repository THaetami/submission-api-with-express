import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";
import SalesRepository from "../../../repository/SalesRepository";
import KotaRepository from "../../../repository/KotaRepository";

const salesValidation = [
    check('sal_nm')
        .trim()
        .notEmpty().withMessage('harus diisi.')
        .custom(async (value, { req }) => {
            const sales = await SalesRepository.checkSalesname(value);
            if (sales) {
                throw new Error('nama sales sudah ada.');
            }
            return true;
        }),
    check('sal_bekerjasejak')
        .trim()
        .notEmpty().withMessage('harus diisi.')
        .isDate().withMessage('harus tanggal'),
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

        if(!errors.isEmpty()) {
            return res.status(422).json(errors);
        }

        return next();
    }
];

export default salesValidation;