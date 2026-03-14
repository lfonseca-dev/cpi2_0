import pool from "../config/pool.js";

const NotaFiscal = {
    async getAllNotasFiscais(){
        try{
            const [notas] = await pool.execute(`SELECT * FROM nota_fiscal;`);

            return notas;
        }catch (error) {
            throw error;
        }
    },

    async getNotaFiscalByCod(codigo){
        try{
            const [nota] = await pool.execute(`SELECT * FROM nota_fiscal WHERE codigo= ?;`, [codigo]);

            return nota[0];
        }catch (error) {
            throw error;
        }
    },

    async addNotaFiscal(codigo, quant_rolos, peso, data, certificado, obs, fornecedor){
        try{
            const [result] = await pool.execute(
                `INSERT INTO nota_fiscal(codigo, quant_rolos, peso, data, certificado, obs, fornecedor) VALUES (?, ?, ?, ?, ?, ?, ?) `, 
                [codigo, quant_rolos, peso, data, certificado, obs, fornecedor]);

            return result;
        }catch (error) {
            throw error;
        }
    },

    async updateNotaFiscal(quant_rolos, peso, data, obs, fornecedor, codigo){
        try{
            const [result] = await pool.execute(
                `UPDATE nota_fiscal SET quant_rolos= ?, peso= ?, data= ?, obs= ?, fornecedor= ? WHERE codigo= ?;`, 
                [quant_rolos, peso, data, obs, fornecedor, codigo]);

            return result;
        }catch (error) {
            throw error;
        }
    },

    async deleteNotaFiscal(codigo){
        try{
            const [result] = await pool.execute(`DELETE FROM nota_fiscal WHERE codigo= ?;`, [codigo]);

            return result;
        }catch (error) {
            throw error;
        }
    },

}

export default NotaFiscal;