const db = require('../db/models');

class SalesRepository {
    static generateNewSalId() {
        throw new Error("Method not implemented.");
    }
    public static async checkSalesname(sal_nm: string) {
        try {
            const sales = await db.mssalesman.findOne({ 
                where: { sal_nm }
            });
            return sales;
        } catch (err) {
            console.error(err);
        }
    }

    public static async getSalesById(sal_id: string) {
        try {
            const sales = await db.mssalesman.findOne({ 
                where: { sal_id },
                attributes: ['sal_id', 'sal_nm', 'sal_bekerjasejak', 'sal_aktif'], // Kolom yang ingin diambil
                include: [ // Jika diperlukan relasi dengan tabel lain
                    {
                        model: db.mskota,
                        as: 'kota', // Menggunakan nama alias yang sudah didefinisikan pada relasi
                        attributes: ['kta_id', 'kta_nm', 'kta_notes'] // Kolom dari tabel mskota yang ingin diambil
                    }
                ]
            });
            return sales ? sales : null;
        } catch (err) {
            console.error(err);
        }
    }

    public static async addSales( sal_id: string, sal_nm: string, sal_bekerjasejak: Date, sal_kta_id: string) {
        try {
            const sales = await db.mssalesman.create({ sal_id, sal_nm, sal_bekerjasejak, sal_kta_id });
            return sales ? sales : false;
        } catch (err) {
            console.error(err);
        }
    }

    public static async getSalId() {
        try {
            const lastSalesman = await db.mssalesman.findOne({
                order: [['sal_id', 'DESC']],
                attributes: ['sal_id'],
            });
        
            return lastSalesman ? lastSalesman.sal_id : null;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    public static async getAllSales() {
        try {
            const lastSalesman = await db.mssalesman.findAll({
                attributes: ['sal_id', 'sal_nm', 'sal_bekerjasejak', 'sal_aktif'], // Kolom yang ingin diambil
                include: [ // Jika diperlukan relasi dengan tabel lain
                    {
                        model: db.mskota,
                        as: 'kota', // Menggunakan nama alias yang sudah didefinisikan pada relasi
                        attributes: ['kta_id', 'kta_nm', 'kta_notes'] // Kolom dari tabel mskota yang ingin diambil
                    }
                ]
            });
            return lastSalesman;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    public static async destroySales(sal_id: string) {
        try {
            await db.mssalesman.destroy({
                where: { sal_id: sal_id },
            });
        } catch (err) {
            console.error(err);
        }
    }

    public static async updateSales( sal_id: string, sal_nm: string, sal_bekerjasejak: Date, sal_kta_id: string) {
        try {
            await db.mssalesman.update(
                { sal_nm, sal_bekerjasejak, sal_kta_id },
                { where: { sal_id: sal_id } }
            );
        } catch (err) {
            console.error(err);
        }
    }
      
}

export default SalesRepository;