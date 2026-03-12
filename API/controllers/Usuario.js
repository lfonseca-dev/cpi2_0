import Usuario from "../models/Usuario.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import "dotenv/config";

const PEPPER = process.env.PEPPER;

const UsuarioController = {
  async getUsuarios(_, res) {
    try {
      const users = await Usuario.getUsuarios();

      return res.status(200).json({
        msg: "OK!",
        data: users,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Erro interno do servidor!",
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
          msg: "Usuario não encontrado!",
        });
      }

      return res.status(200).json({
        msg: "OK!",
        data: user,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Erro interno do servidor!",
        error: error.message,
      });
    }
  },

  async addUsuario(req, res) {
    try {
      const { nome, senha, nivel_acesso } = req.body;

      if (!nome || !senha || !nivel_acesso) {
        return res.status(400).json({
          msg: "Todos os campos devem ser preenchidos!",
        });
      }

      const encryptedPass = await argon2.hash(senha + PEPPER, {
        type: argon2.argon2id,
        memoryCost: 2 ** 16,
        parallelism: 4,
        timeCost: 3,
      });

      const result = await Usuario.addUsuario(
        nome,
        encryptedPass,
        nivel_acesso,
      );

      return res.status(201).json({
        msg: "Usuario criado com sucesso!",
        result,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Erro interno do servidor!",
        error: error.message,
      });
    }
  },
  async login(req, res) {
    try {
      const { nome, senha } = req.body;

      if (!nome || !senha) {
        return res.status(400).json({
          msg: "Todos os campos devem ser preenchidos!",
        });
      }

      const user = await Usuario.getUsuarioByNome(nome);

      if (!user) {
        return res.status(404).json({
          msg: "Usuário não encontrado!",
        });
      }

      const verifySenha = await argon2.verify(user.senha, senha + PEPPER);

      if (!verifySenha) {
        return res.status(400).json({
          msg: "Senha inválida!",
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          nome: user.nome,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRES,
        },
      );

      return res.status(200).json({
        msg: "OK",
        token,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Erro interno do servidor!",
        error: error.message,
      });
    }
  },

  async updateUsuario(req, res) {
    try {
      const { nome, senha, nivel_acesso } = req.body;
      const { id } = req.params;

      const user = await Usuario.getUsuarioById(id);

      if (!user) {
        return res.status(404).json({
          msg: "Usuario não encontrado!",
        });
      }

      if (!nome && !senha && !nivel_acesso) {
        return res.status(400).json({
          msg: "Nenhum dado enviado para alteração!",
        });
      }

      let novoNome = nome;

      if (nome == "") {
        novoNome = user.nome;
      }

      const novaSenha = senha
        ? await argon2.hash(senha + PEPPER, {
            type: argon2.argon2id,
            memoryCost: 2 ** 16,
            parallelism: 4,
            timeCost: 3,
          })
        : user.senha;

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
      return res.status(500).json({
        msg: "Erro interno do servidor!",
        error: error.message,
      });
    }
  },

  async deleteUsuario(req, res) {
    try {
      const { id } = req.params;

      const user = await Usuario.getUsuarioById(id);

      if (!user) {
        return res.status(404).json({
          msg: "Usuario não encontrado!",
        });
      }

      const result = await Usuario.deleteUsuario(id);

      return res.status(200).json({
        msg: "Usuario deletado com sucesso!",
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

export default UsuarioController;
