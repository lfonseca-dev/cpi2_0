import pool from "../config/pool.js";

const Lote = {
    async getAllLotes(){
        try{
            const [lotes] = await pool.execute(`SELECT * FROM lote;`);

            return lotes;
        }catch (error) {
            throw error;
        }
    },

    async getLoteById(id){
        try{
            const [lote] = await pool.execute(`SELECT * FROM lote WHERE id= ?;`, [id]);

            return lote[0];
        }catch (error) {
            throw error;
        }
    },

    async addLote(produto_final, produto_mp, status){
        try{
            const [result] = await pool.execute(`INSERT INTO lote(produto_final, produto_mp, status) VALUES(?, ?, ?, ?);`, 
                [produto_final, produto_mp, status]);

            return result;
        }catch (error) {
            throw error;
        }
    },

    async updateLote(produto_final, produto_mp, status, id){
        try{
            const [result] = await pool.execute(`UPDATE lote SET produto_final= ?, produto_mp= ?, status= ? WHERE id= ?;`, 
                [produto_final, produto_mp, status, id]);

            return result;
        }catch (error) {
            throw error;
        }
    },

    async deleteLote(id){
        try{
            const [result] = await pool.execute(`DELETE FROM lote WHERE id= ?;`, [id]);

            return result;
        }catch (error) {
            throw error;
        }
    },
}

export default Lote;