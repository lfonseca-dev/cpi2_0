import pool from "../config/pool.js";

const Destino = {
    async getAllDestinos(){
        try{
            const [destinos] = await pool.execute(`SELECT * FROM destino;`);
            
            return destinos;
        }catch (error) {
            throw error;
        }
    },

    async getDestinoById(id){
        try{
            const [destino] = await pool.execute(`SELECT * FROM destino WHERE id= ?;`, [id]);
            
            return destino[0];
        }catch (error) {
            throw error;
        }
    },

    async getDestinoByName(descricao){
        try{
            const [destinos] = await pool.execute(`SELECT * FROM destino WHERE descricao LIKE ?;`, [`${descricao}%`]);
            
            return destinos[0];
        }catch (error) {
            throw error;
        }
    },

    async addDestino(descricao){
        try{
            const [result] = await pool.execute(`INSERT INTO destino(descricao) VALUES (?);`, [descricao]);

            return result;
        }catch (error) {
            throw error;
        }
    },

    async updateDestino(descricao, id){
        try{
            const [result] = await pool.execute(`UPDATE destino SET descricao= ? WHERE id= ?;` , [descricao, id]);

            return result;
        }catch (error) {
            throw error;
        }
    },

    async deleteDestino(id){
        try{
            const [result] = await pool.execute(`DELETE FROM destino WHERE id= ?;`, [id]);

            return result;
        }catch (error) {
            throw error;
        }
    },
}

export default Destino;