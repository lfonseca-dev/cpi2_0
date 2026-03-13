import pool from "../config/pool.js";

const Ensaio = {
    async getAllEnsaios() {
        try{
            const [ensaios] = await pool.execute(`SELECT * FROM ensaio;`);

            return ensaios;
        }catch (error) {
            throw error;
        }
    },

    async getEnsaioById(id) {
        try{
            const [ensaio] = await pool.execute(`SELECT * FROM ensaio WHERE id= ?;`, [id]);

            return ensaio[0];
        }catch (error) {
            throw error;
        }
    },

    async addEnsaio(massa, lr, le, lr_le, lu, lo, alng, dobr, caracteristicaGEO, num_ensaio,  ocorrencia, lote, responsavel) {
        try{
            const [result] = await pool.execute(
                `INSERT INTO 
                 ensaio( massa, lr, le, lr_le, lu, lo, alng, dobr, caracteristicaGEO, num_ensaio, ocorrencia, lote, responsavel) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )`, 
                [massa, lr, le, lr_le, lu, lo, alng ,dobr, caracteristicaGEO, num_ensaio, ocorrencia, lote, responsavel]);

            return result;
        }catch (error) {
            throw error;
        }
    },

    async updateEnsaio(massa, lr, le, lr_le, lu, lo, alng, dobr, caracteristicaGEO, num_ensaio, ocorrencia, lote, responsavel, id) {
        try{
            const [result] = await pool.execute(
                `UPDATE ensaio SET massa = ?, lr = ?, le = ?, lr_le = ?, lu = ?, lo = ?, alng = ?,
                 dobr = ?, caracteristicaGEO = ?, num_ensaio = ?, ocorrencia = ?, lote = ?, responsavel = ? WHERE id= ?`, 
                 [massa, lr, le, lr_le, lu, lo, alng, dobr, caracteristicaGEO, num_ensaio, ocorrencia, lote, responsavel, id]);

            return result;
        }catch (error) {
            throw error;
        }
    },

    async deleteEnsaio(id) {
        try{
            const [result] = await pool.execute(`DELETE FROM ensaio WHERE id= ?`, [id]);

            return result;
        }catch (error) {
            throw error;
        }
    },
};

export default Ensaio;