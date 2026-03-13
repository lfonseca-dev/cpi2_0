import pool from "../config/pool.js";

const Fornecedor = {
  async getAllFornecedores() {
    try {
      const [fornecedores] = await pool.execute(`SELECT * FROM fornecedor;`);

      return fornecedores;
    } catch (error) {
      throw error;
    }
  },

  async getFornecedorById(id) {
    try {
      const [fornecedor] = await pool.execute(
        `SELECT * FROM fornecedor WHERE id=?`,
        [id],
      );
      return fornecedor[0];
    } catch (error) {
      throw error;
    }
  },

  async getFornecedorByNome(nome) {
    try {
      const [fornecedor] = await pool.execute(
        `SELECT * FROM fornecedor WHERE nome LIKE ?`,
        [`${nome}%`],
      );

      return fornecedor[0];
    } catch (error) {
      throw error;
    }
  },

  async addFornecedor(nome, obs) {
    try {
      const result = await pool.execute(
        `INSERT INTO fornecedor(nome, obs) VALUES(?,?);`,
        [nome, obs],
      );
      return result;
    } catch (error) {
      throw error;
    }
  },

  async updateFornecedor(nome, obs, id) {
    try {
      const result = await pool.execute(
        `UPDATE fornecedor SET nome=?, obs=? WHERE id=?;`,
        [nome, obs, id],
      );

      return result;
    } catch (error) {
      throw error;
    }
  },

  async deleteFornecedor(id) {
    try {
      const result = await pool.execute(`DELETE FROM fornecedor WHERE id=?;`, [
        id
      ]);

      return result;
    } catch (error) {
      throw error;
    }
  },
};

export default Fornecedor;
