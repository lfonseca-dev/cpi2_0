import Produto from "../models/Produto.js";

const ProdutoController = {
  async getAllProdutos(_, res) {
    try {
      const produtos = await Produto.getAllProdutos();

      return res.status(200).json({
        msg: "OK!",
        data: produtos,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Erro interno do servidor!",
        error: error.message,
      });
    }
  },
  async getProdutoById(req, res) {
    try {
      const { id } = req.params;

      const produto = await Produto.getProdutoById(id);

      if (!produto) {
        return res.status(404).json({
          msg: "Produto não encontrado!",
        });
      }

      return res.status(200).json({
        msg: "OK!",
        data: produto,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Erro interno do servidor!",
        error: error.message,
      });
    }
  },

  async getProdutoByDesc(req, res) {
    try {
      const { descricao } = req.params;

      const produto = await Produto.getCategoriaByDesc(descricao);

      if (!produto) {
        return res.status(404).json({
          msg: "Categoria não encontrada",
        });
      }

      return res.status(200).json({
        msg: "OK!",
        data: produto,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Erro interno do servidor!",
        error: error.message,
      });
    }
  },

  async addProduto(req, res) {
    try {
      const { descricao, bitola, peso, categoria } = req.body;

      if (!descricao || !bitola || !peso || !categoria) {
        return res.status(400).json({
          msg: "Todos os campos devem ser preenchidos!",
        });
      }

      const result = await Produto.addProduto(
        descricao,
        bitola,
        peso,
        categoria,
      );

      return res.status(201).json({
        msg: "Produto criado com sucesso!",
        result,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Erro interno do servidor!",
        error: error.message,
      });
    }
  },

  async updateProduto(req, res) {
    try {
      const { descricao, bitola, peso, categoria } = req.body;
      const { id } = req.params;

      const produto = await Produto.getProdutoById(id);

      if (!produto) {
        return res.status(404).json({
          msg: "Produto não encontrado!",
        });
      }

      if (!descricao && !bitola && !peso && !categoria) {
        return res.status(400).json({
          msg: "Nenhum dado enviado para alteração!",
        });
      }

      let novaDescricao = descricao ?? produto.descricao;
      let novaBitola = bitola ?? produto.bitola;
      let novoPeso = peso ?? produto.peso;
      let novaCategoria = categoria ?? produto.categoria;

      const result = await Produto.updateProduto(
        novaDescricao,
        novaBitola,
        novoPeso,
        novaCategoria,
        id,
      );

      return res.status(200).json({
        msg: "Produto atualizado com sucesso!",
        result,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Erro interno do servidor!",
        error: error.message,
      });
    }
  },

  async deleteProduto(req, res) {
    try {
        const { id } = req.params;

        const produto = await Produto.getProdutoById(id);

        if(!produto){
            return res.status(404).json({
                msg: "Produto não encontrado!"
            })
        }

        const result = await Produto.deleteProduto(id);

        return res.status(200).json({
            msg: "Produto deletado com sucesso!",
            result
        })

    } catch (error) {
      return res.status(500).json({
        msg: "Erro interno do servidor!",
        error: error.message,
      });
    }
  },
};

export default ProdutoController;
