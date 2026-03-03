import pool from "../config/pool.js";

const Operador = {
    async getOperador() {
        try{
            const operadores = await pool.execute(`SELECT * FROM operador;`);

            return operadores;
        }catch (error) {
            throw error;
        }
    },

    async getOperadorById(id) {
        try{
            const operador = await pool.execute(`SELECT * FROM operador WHERE id= ?`, [id]);

            return operador;
        }catch (error) {
            throw error;
        }
    },

    async addOperador() {
        try{

        }catch (error) {
            throw
        }
    }
}