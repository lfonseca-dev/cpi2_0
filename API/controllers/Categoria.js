import Categoria from "../models/Categoria.js";

const CategoriaController = {
  async getAllCategorias(_, res) {
    try {
      const categorias = await Categoria.getAllCategorias();

      res.status(200).json({
        msg: "OK!",
        data: categorias,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Erro interno do servidor!",
        error: error.message,
      });
    }
  },
  async getCategoriaById(req, res) {
    try {
      const id = req.params.id;

      const categoria = await Categoria.getCategoriaById(id);

      if (!categoria) {
        return res.status(404).json({
          msg: "Categoria não encontrada!",
        });
      }

      return res.status(200).json({
        msg: "OK!",
        data: categoria,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Erro interno do servidor!",
        error: error.message,
      });
    }
  },
  async getCategoriaByDesc(req, res) {
    try {
      const { descricao } = req.params;

      const categoria = await Categoria.getCategoriaByDesc(descricao);

      if (!categoria) {
        return res.status(404).json({
          msg: "Categoria não encontrada",
        });
      }

      return res.status(200).json({
        msg: "OK!",
        data: categoria,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Erro interno do servidor!",
        error: error.message,
      });
    }
  },

  async addCategoria(req, res) {
    try {
      const { descricao } = req.body;

      if (!descricao) {
        return res.status(400).json({
          msg: "Todos os campos devem ser preenchidos!",
        });
      }

      const result = await Categoria.addCategoria(descricao);

      return res.status(201).json({
        msg: "Categoria criada com sucesso!",
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Erro interno do servidor!",
        error: error.message,
      });
    }
  },

  async updateCategoria(req, res) {
    try {
      const { descricao } = req.body;
      const id = req.params.id;

      const categoria = await Categoria.getCategoriaById(id);

      if (!categoria) {
        return res.status(404).json({
          msg: "Categoria não encontrada!",
        });
      }

      if (!descricao) {
        return res.status(400).json({
          msg: "Todos os campos devem ser preenchidos!",
        });
      }

      let updateDescricao = descricao ?? categoria.descricao;

      const result = await Categoria.updateCategoria(updateDescricao, id);

      return res.status(200).json({
        status: 200,
        msg: "Categoria atualizada com sucesso!",
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Erro interno do servidor!",
        error: error.message,
      });
    }
  },

  async deleteCategoria(req, res) {
    try {
      const id = req.params.id;

      const categoria = await Categoria.getCategoriaById(id);

      if (!categoria) {
        return res.status(404).json({
          msg: "Categoria não encontrada!",
        });
      }

      const result = await Categoria.deleteCategoria(id);

      return res.status(200).json({
        msg: "Categoria deletada com sucesso!",
        result,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Erro interno do servidor!",
        error: error.message,
      });
    }
  },
};

export default CategoriaController;
