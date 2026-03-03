import pool from "../config/pool.js";

const Usuario = {
  async getUsuarios() {
    try {
      const [users] = await pool.execute(`SELECT * FROM usuario;`);
      return users;
    } catch (error) {
      throw error;
    }
  },
  async getUsuarioById(id) {
    try {
      const [user] = await pool.execute(`SELECT * FROM usuario WHERE id=?`, [
        id,
      ]);

      return user[0];
    } catch (error) {
      throw error;
    }
  },
  async addUsuario(nome, senha, nivel_acesso) {
    try {
      const result = await pool.execute(
        `INSERT INTO usuario(nome, senha, nivel_acesso) VALUES(?, ?, ?)`,
        [nome, senha, nivel_acesso],
      );

      return result;
    } catch (error) {
      throw error;
    }
  },
  async updateUsuario(nome, senha, nivel_acesso, id) {
    try {
      const result = await pool.execute(
        `UPDATE usuario SET nome=?, senha=?, nivel_acesso=? WHERE id=?`,
        [nome, senha, nivel_acesso, id],
      );

      return result;
    } catch (error) {
      throw error;
    }
  },
  async deleteUsuario(id) {
    try {
      const result = await pool.execute(`DELETE FROM usuario WHERE id=?`, [id]);
      return result;
    } catch (error) {
      throw error;
    }
  },
};

export default Usuario;
