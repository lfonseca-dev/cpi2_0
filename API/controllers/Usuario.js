import Usuario from "../models/Usuario.js";
import argon2 from "argon2";
import crypto from "crypto";

const UsuarioController = {
  async getUsuarios(_, res) {
    try {
      const users = await Usuario.getUsuarios();

      return res.status(200).json({
        status: 200,
        msg: "Todos os usuarios consultados com sucesso!",
        users,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  },
  async getUsuarioById(req, res) {
    try {
      const id = req.params.id;
      const user = await Usuario.getUsuarioById(id);

      if (!user) {
        return res.status(404).json({
          status: 404,
          msg: "Usuario não encontrado!",
        });
      }

      return res.status(200).json({
        status: 200,
        msg: "Usuario consultado com sucesso!",
        user,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  },

  async addUsuario(req, res) {
    try {
      const { nome, senha, nivel_acesso } = req.body;

      if (!nome || !senha || !nivel_acesso) {
        return res.status(400).json({
          status: 400,
          msg: "Todos os campos devem ser preenchidos!",
        });
      }

      const encryptedPass = await argon2.hash(senha, {
        type: argon2.argon2id,
        memoryCost: 2 ** 16,
        parallelism: 4,
        timeCost: 3,
        salt: crypto.randomBytes(16),
      });

      const result = await Usuario.addUsuario(
        nome,
        encryptedPass,
        nivel_acesso,
      );

      return res.status(201).json({
        status: 201,
        msg: "Usuario criado com sucesso!",
        result,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  },

  async updateUsuario(req, res) {
    try {
      const { nome, senha, nivel_acesso } = req.body;
      const id = req.params.id;

      if (!nome && !senha && !nivel_acesso) {
        return res.status(400).json({
          status: 400,
          msg: "Nenhum dado enviado para alteração!",
        });
      }

      const user = await Usuario.getUsuarioById(id);

      if (!user) {
        return res.status(404).json({
          status: 404,
          msg: "Usuario não encontrado!",
        });
      }

      let novoNome = nome;

      if (nome == "") {
        novoNome = user.nome;
      }

      let novaSenha = null ?? user.senha;

      if (senha) {
        novaSenha = await argon2.hash(senha, {
          type: argon2.argon2id,
          memoryCost: 2 ** 16,
          parallelism: 4,
          timeCost: 3,
          salt: crypto.randomBytes(16),
        });
      }

      let novoNivel_acesso = nivel_acesso ?? user.nivel_acesso;

      if (nivel_acesso == "") {
        novoNivel_acesso = user.nivel_acesso;
      }

      const result = await Usuario.updateUsuario(
        novoNome,
        novaSenha,
        novoNivel_acesso,
        id,
      );

      return res.status(200).json({
        status: 200,
        msg: "Usuario atualizado com sucesso!",
        result,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  },

  async deleteUsuario(req, res) {
    try {
      const id = req.params.id;

      const user = await Usuario.getUsuarioById(id);

      if (!user) {
        return res.status(404).json({
          status: 404,
          msg: "Usuario não encontrado!",
        });
      }

      const result = await Usuario.deleteUsuario(id);

      return res.status(200).json({
        status: 200,
        msg: "Usuario deletado com sucesso!",
        result,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  },
};

export default UsuarioController;
