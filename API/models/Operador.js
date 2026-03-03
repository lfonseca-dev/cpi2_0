import pool from "../config/pool.js";

const Operador = {
    async getOperadores() {
        try{
            const [operadores] = await pool.execute(`SELECT * FROM operador;`);

            return operadores;
        }catch (error) {
            throw error;
        }
    },

    async getOperadorById(id) {
        try{
            const [operador] = await pool.execute(`SELECT * FROM operador WHERE id= ?;`, [id]);

            return operador[0];
        }catch (error) {
            throw error;
        }
    },

    async addOperador(nome, funcao) {
        try{
            const [result] = await pool.execute(`INSERT INTO operador(nome, funcao) VALUES (?, ?);`, [nome, funcao]);

            return result;
        }catch (error) {
            throw error;
        }
    },

    async updateOperador(nome, funcao, id) {
        try{
            const [result] = await pool.execute(`UPDATE operador SET nome= ?, funcao=? WHERE id=?;`, [nome, funcao, id]);

            return result;
        }catch (error) {
            throw error;
        }
    },

    async deleteOperador(id) {
        try{
            const [result] = await pool.execute(`DELETE FROM operador WHERE id=?;`, [id]);

            return result;
        }catch (error) {
            throw error;
        }
    },
}

export default Operador;