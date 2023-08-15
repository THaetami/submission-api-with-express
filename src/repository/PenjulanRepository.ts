const db = require('../db/models');

class PenjualanRepository {
    public static async getPenjualanById(jul_sal_id: string) {
        try {
          const penjualan = await db.trpenjualan.findOne({
            where: { jul_sal_id },
            order: [['jul_tanggaljual', 'ASC']],
          });
          
          return penjualan || null;
        } catch (err) {
          console.error(err);
          throw err;
        }
      }
      
      
}

export default PenjualanRepository;