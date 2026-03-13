import pool from "../config/pool.js";

const Categoria = {
  async getAllCategorias() {
    try {
      const [categorias] = await pool.execute(`SELECT * FROM categoria;`);
      return categorias;
    } catch (error) {
      throw error;
    }
  },

  async getCategoriaById(id) {
    try {
      const [categoria] = await pool.execute(
        `SELECT * FROM categoria WHERE id = ?`,
        [id],
      );
      return categoria[0];
    } catch (error) {
      throw error;
    }
  },

  async getCategoriaByDesc(descricao) {
    try {
      const [categoria] = await pool.execute(
        `SELECT * FROM categoria WHERE descricao LIKE ?`,
        [`${descricao}%`],
      );

      return categoria[0];
    } catch (error) {
      throw error;
    }
  },

  async addCategoria(descricao) {
    try {
      const result = await pool.execute(
        `INSERT INTO categoria(descricao) VALUES(?)`,
        [descricao],
      );
      return result;
    } catch (error) {
      throw error;
    }
  },

  async updateCategoria(descricao, id) {
    try {
      const result = await pool.execute(
        `UPDATE categoria SET descricao=? WHERE id=?`,
        [descricao, id],
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  async deleteCategoria(id) {
    try {
      const result = await pool.execute(`DELETE FROM categoria WHERE id=?`, [
        id,
      ]);
      return result;
    } catch (error) {
      throw error;
    }
  },
};

export default Categoria;
