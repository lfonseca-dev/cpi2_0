import Fornecedor from "../models/Fornecedor.js";

const FornecedorController = {
  async getAllFornecedores(_, res) {
    try {
      const fornecedores = await Fornecedor.getAllFornecedores();

      return res.status(200).json({
        msg: "OK!",
        data: fornecedores,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Erro interno do servidor!",
        error: error.message,
      });
    }
  },

  async getFornecedorById(req, res) {
    try {
      const { id } = req.params;

      const fornecedor = await Fornecedor.getFornecedorById(id);

      if (!fornecedor) {
        return res.status(404).json({
          msg: "Fornecedor não encontrado!",
        });
      }

      return res.status(200).json({
        msg: "OK!",
        data: fornecedor,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Erro interno do servidor!",
        error: error.message,
      });
    }
  },

  async getFornecedorByNome(req, res) {
    try {
      const { nome } = req.params;

      const fornecedor = await Fornecedor.getFornecedorByNome(nome);

      if (!fornecedor) {
        return res.status(404).json({
          msg: "Fornecedor não encontrado!",
        });
      }

      return res.status(200).json({
        msg: "OK!",
        data: fornecedor,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Erro interno do servidor!",
        error: error.message,
      });
    }
  },

  async addFornecedor(req, res) {
    try {
      const { nome, obs } = req.body;

      if (!nome) {
        return res.status(400).json({
          msg: "O nome deve ser preenchido!",
        });
      }

      const result = await Fornecedor.addFornecedor(nome, obs);

      return res.status(201).json({
        msg: "Fornecedor criado com sucesso!",
        result,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Erro interno do servidor!",
        error: error.message,
      });
    }
  },

  async updateFornecedor(req, res) {
    try {
      const { nome, obs } = req.body;
      const { id } = req.params;

      const fornecedor = await Fornecedor.getFornecedorById(id);

      if (!fornecedor) {
        return res.status(404).json({
          msg: "Fornecedor não encontrado!",
        });
      }

      if (!nome && !obs) {
        return res.status(400).json({
          msg: "Nenhum dado enviado para alteração!",
        });
      }

      let novoNome = nome ?? fornecedor.nome;
      let novoObs = obs ?? fornecedor.obs;

      const result = await Fornecedor.updateFornecedor(novoNome, novoObs, id);

      return res.status(200).json({
        msg: "Fornecedor atualizado com sucesso!",
        result,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Erro interno do servidor!",
        error: error.message,
      });
    }
  },

  async deleteFornecedor(req, res) {
    try {
      const { id } = req.params;

      const fornecedor = await Fornecedor.getFornecedorById(id);

      if (!fornecedor) {
        return res.status(404).json({
          msg: "Fornecedor não encontrado!",
        });
      }

      const result = await Fornecedor.deleteFornecedor(id);

      return res.status(200).json({
        msg: "Fornecedor deletado com sucesso!",
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

export default FornecedorController;
