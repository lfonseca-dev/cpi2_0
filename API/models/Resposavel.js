import pool from "../config/pool.js";

const Resposavel = {
    async getResponsaveis(){
        try{
            const [responsaveis] = await pool.execute(`SELECT * FROM responsavel;`);

            return responsaveis;
        }catch (error) {
            throw error;
        }
    },

    async getResponsavelById(id){
        try{
            const [responsavel] = await pool.execute(`SELECT * FROM responsavel WHERE id= ?;`, [id]);

            return responsavel[0];
        }catch (error) {
            throw error;
        }
    },

    async getResponsavelByName(nome){
        try{
            const [responsavel] = await pool.execute(`SELECT * FROM responsavel WHERE nome LIKE ?;`, [`${nome}%`]);

            return responsavel[0];
        }catch (error) {
            throw error;
        }
    },

    async addResponsavel(nome, obs, engenheiro){
        try{
            const [responsavel] = await pool.execute(`INSERT INTO responsavel(nome, obs, engenheiro);`, [nome, obs, engenheiro]);

            return responsavel;
        }catch (error) {
            throw error;
        }
    },

    async updateResponsavel(nome, obs, engenheiro, id){
        try{
            const [responsavel] = await pool.execute(
                `UPDATE responsavel SET nome= ?, obs= ?, engenheiro= ? WHERE id= ?;`, [nome, obs, engenheiro, id]);

            return responsavel;
        }catch (error) {
            throw error;
        }
    },

    async deleteResponsavel(id){
        try{
            const [responsavel] = await pool.execute(`DELETE FROM responsavel WHERE id= ?;`, [id]);

            return responsavel;
        }catch (error) {
            throw error;
        }
    },
}

export default Resposavel;