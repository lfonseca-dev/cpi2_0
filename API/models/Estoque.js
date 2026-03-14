import pool from "../config/pool.js";

const Estoque = {
    async getAllEstoques(){
        try{
            const [estoques] = await pool.execute(`SELECT * FROM local_estoque;`);
            
            return estoques;
        }catch (error) {
            throw error;
        }
    },

    async getEstoqueById(id){
        try{
            const [estoque] = await pool.execute(`SELECT * FROM local_estoque WHERE id= ?;`, [id]);

            return estoque[0];
        }catch (error) {
            throw error;
        }
    },

    async getEstoqueByName(descricao){
        try{
            const [estoque] = await pool.execute(
                `SELECT * FROM local_estoque WHERE descricao LIKE ?;`, [`%${descricao}%`]);

            return estoque[0];
        }catch (error) {
            throw error;
        }
    },

    async getEstoqueByStatus(status){
        try{
            const [estoques] = await pool.execute(`SELECT * FROM local_estoque WHERE status= ?;`, [status]);

            return estoques;
        }catch (error) {
            throw error;
        }
    },

    async addEstoque(descricao, status, obs){
        try{
            const [result] = await pool.execute(
                `INSERT INTO local_estoque(descricao, status, obs) VALUES (?, ?, ?);`, [descricao, status, obs]);

            return result;
        }catch (error) {
            throw error;
        }
    },

    async updateEstoque(descricao, status, obs, id){
        try{
            const [result] = await pool.execute(
                `UPDATE local_estoque SET descricao= ?, status= ?, obs= ? WHERE id= ?;`, [descricao, status, obs, id]);

            return result;
        }catch (error) {
            throw error;
        }
    },

    async deleteEstoque(id){
        try{
            const [result] = await pool.execute(`DELETE FROM local_estoque WHERE id= ?;`, [id]);

            return result;
        }catch (error) {
            throw error;
        }
    },
}

export default Estoque;