const db = require('../db/models');

class UserRepository {
    public static async addUser(username: string, password: string) {
        try {
            const user = await db.users.create({ username, password });
            return user ? user : false;
        } catch (err) {
            console.error(err);
        }
    }

    public static async getUserByUsername(username: string) {
        try {
            const user = await db.users.findOne({ where: { username } });
            return user;
        } catch (err) {
            console.error(err);
        }
    }

    public static async checkUsername(username: string) {
        try {
            const user = await db.users.findOne({ 
                where: { username }
            });
            return user;
        } catch (err) {
            console.error(err);
        }
    }


    public static async updateExpriedToken(expried_token: Date, id: Number) {
        try {
            await db.users.update({ expried_token: expried_token}, { where: { id: id } });
        } catch(err) {
            console.log(err);
        }
    }
      
}

export default UserRepository;