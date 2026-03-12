import pool from "../config/pool.js";

const Lote = {
    async getLotes(){
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

    async getLoteByNum(numero){
        try{
            const [lote] = await pool.execute(`SELECT * FROM lote WHERE numero LIKE ?;`, [`${numero}%`]);

            return lote[0];
        }catch (error) {
            throw error;
        }
    },

    async addLote(numero, produto_final, produto_mp, status){
        try{
            const [result] = await pool.execute(`INSERT INTO lote(numero, produto_final, produto_mp, status) VALUES(?, ?, ?, ?);`, 
                [numero, produto_final, produto_mp, status]);

            return result;
        }catch (error) {
            throw error;
        }
    },

    async updateLote(numero, produto_final, produto_mp, status, id){
        try{
            const [result] = await pool.execute(`UPDATE lote SET numero= ?, produto_final= ?, produto_mp= ?, status= ? WHERE id= ?;`, 
                [numero, produto_final, produto_mp, status, id]);

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