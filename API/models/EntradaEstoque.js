import pool from "../config/pool.js";

const EntradaEstoque = {
    async getEntradasEstoque() {
        try{
            const [entradas] = await pool.execute(`SELECT * FROM entrada_estoque;`);
            
            return entradas;
        }catch (error) {
            throw error;
        }
    },

    async getEntradasEstoqueById(id) {
        try{
            const [entrada] = await pool.execute(`SELECT * FROM entrada_estoque WHERE id= ?;`, [id]);

            return entrada[0];
        }catch (error) {
            throw error;
        }
    },

    async addEntradasEstoque(numero_bobina, carbono, corrida, peso, nota_fiscal, local_estoque, produto) {
        try{
            const [result] = await pool.execute(
                `INSERT INTO entrada_estoque(numero_bobina, carbono, corrida, peso, nota_fiscal, local_estoque, produto) VALUES (?, ?, ?, ?, ?, ?, ?);`, 
                [numero_bobina, carbono, corrida, peso, nota_fiscal, local_estoque, produto]);

            return result;
        }catch (error) {
            throw error;
        }
    },

    async updateEntradasEstoque(numero_bobina, carbono, corrida, peso, nota_fiscal, local_estoque, produto, id) {
        try{
            const [result] = await pool.execute(
                `UPDATE entrada_estoque SET numero_bobina= ?, carbono= ?, corrida= ?, peso= ?, nota_fiscal= ?, local_estoque= ?, produto =? WHERE id= ?;`, 
                [numero_bobina, carbono, corrida, peso, nota_fiscal, local_estoque, produto, id]);

                return result;
        }catch (error) {
            throw error;
        }
    },

    async deleteEntradasEstoque(id) {
        try{
            const [result] = await pool.execute(`DELETE FROM entrada_estoque WHERE id= ?;`, [id]);

            return result;
        }catch (error) {
            throw error;
        }
    },

}

export default EntradaEstoque;