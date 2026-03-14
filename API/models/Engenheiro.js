import pool from "../config/pool.js";

const Engenheiro = {
    async getAllEngenheiros() {
        try{
            const [engenheiros] = await pool.execute(`SELECT * FROM engenheiro;`);

            return engenheiros;
        }catch (error) {
            throw error;
        }
    },
    
    async getEngenheiroById(id) {
        try{
            const [engenheiro] = await pool.execute(`SELECT * FROM engenheiro WHERE id= ?;`, [id]);

            return engenheiro[0];
        }catch (error) {
            throw error;
        }
    },

    async getEngenheiroByName(nome){
        try{
            const [engenheiro] = await pool.execute(`SELECT * FROM engenheiro WHERE nome LIKE ?;`, [`${nome}%`]);

            return engenheiro[0];
        }catch (error) {
            throw error;
        }
    },

    async addEngenheiro(nome) {
        try{
            const [result] = await pool.execute(`INSERT INTO engenheiro(nome) VALUES (?);`, [nome]);

            return result;
        }catch (error) {
            throw error;
        }
    },

    async updateEngenheiro(nome, id) {
        try{
            const [result] = await pool.execute(`UPDATE engenheiro SET nome= ? WHERE id=?;`, [nome, id]);

            return result;
        }catch (error) {
            throw error;
        }
    },

    async deleteEngenheiro(id) {
        try{
            const [result] = await pool.execute(`DELETE FROM engenheiro WHERE id=?;`, [id]);

            return result;
        }catch (error) {
            throw error;
        }
    },
}

export default Engenheiro;