import pool from "../config/pool.js";

const Produto = {
  async getAllProdutos() {
    try {
      const [produtos] = await pool.execute(`SELECT 
      p.id, p.descricao, p.bitola, p.peso, p.categoria AS categoriaId,
      c.descricao AS categoria
      FROM produto p
    INNER JOIN categoria c 
      ON p.categoria = c.id;`);
      return produtos;
    } catch (error) {
      throw error;
    }
  },
  async getProdutoById(id) {
    try {
      const [produto] = await pool.execute(`SELECT 
      p.id, p.descricao, p.bitola, p.peso, p.categoria AS categoriaId,
      c.descricao AS categoria
      FROM produto p
    INNER JOIN categoria c 
      ON p.categoria = c.id 
    WHERE p.id=?`,
        [id],
      );
      return produto[0];
    } catch (error) {
      throw error;
    }
  },

  async addProduto(descricao, bitola, peso, categoria) {
    try {
      const result = await pool.execute(
        `INSERT INTO produto(descricao, bitola, peso, categoria) VALUES(?,?,?,?)`,
        [descricao, bitola, peso, categoria],
      );

      return result;
    } catch (error) {
      throw error;
    }
  },

  async updateProduto(descricao, bitola, peso, categoria, id) {
    try {
      const result = await pool.execute(
        `UPDATE produto SET descricao=?, bitola=?, peso=?, categoria=? WHERE id=?`,
        [descricao, bitola, peso, categoria, id],
      );

      return result;
    } catch (error) {
      throw error;
    }
  },

  async deleteProduto(id) {
    try {
      const result = await pool.execute(`DELETE FROM produto WHERE id=?`, [id]);

      return result;
    } catch (error) {
      throw error;
    }
  },
};

export default Produto;
