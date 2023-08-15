const db = require('../db/models');

class KotaRepository {
    public static async checkKotaId(kta_id: string) {
        try {
            const kota = await db.mskota.findOne({ 
                where: { kta_id }
            });
            return kota;
        } catch (err) {
            console.error(err);
        }
    }
}

export default KotaRepository;