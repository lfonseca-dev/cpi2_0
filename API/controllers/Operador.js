import Operador from "../models/Operador.js";

const OperadorController = {
    async getAllOperadores(_, res) {
        try{
            const operadores = await Operador.getAllOperadores();

            return res.status(200).json({
                status: 200,
                operadores,
            });
        }catch (error) {
            res.status(500).json({
                msg: "Erro interno do servidor!",
                error: error.message,
            });
        }
    },

    async getOperadorById(req, res) {
        try{
            const { id } = req.params;

            const operador = await Operador.getOperadorById(id);

            if(!operador){
                return res.status(404).json({
                    msg: "Operador não encontrado!",
                });
            }

            return res.status(200).json({
                msg: "OK!",
                data: operador,
            });
        }catch (error) {
            res.status(500).json({
                msg: "Erro interno do servidor!",
                error: error.message,
            });
        }
    },

    async getOperadorByName(req, res){
        try{
            const { nome } = req.params;

            if(!nome){
                return res.status(400).json({
                msg: "Nome não informado!",
            });
            }

            const operador = await Operador.getOperadorByName(nome);

            if (!operador) {
                return res.status(404).json({
                    msg: "Nenhum operador encontrado!",
                });
            }

            return res.status(200).json({
                msg: "OK!",
                data: operador,
            });
        }catch (error){
            res.status(500).json({
                msg: "Erro interno do servidor!",
                error: error.message,
            });
        }
    },

    async addOperador(req, res){
        try{
            const {nome, funcao} = req.body;

            if(!nome || !funcao){
                return res.status(400).json({
                    msg: "Todos os campos devem ser preenchidos!",
                });
            }

            const result = await Operador.addOperador(nome, funcao);

            return res.status(201).json({
                msg: "Operador criado com sucesso!",
                result,
            });
        }catch (error) {
            res.status(500).json({
                msg: "Erro interno do servidor!",
                error: error.message,
            });
        }
    },

    async updateOperador(req, res){
        try{
            const {nome, funcao} = req.body;
            const { id } = req.params;

            if(!nome && !funcao){
                return res.status(400).json({
                    msg: "Nenhum campo foi enviado para atualização!",
                });
            }

            const operador = await Operador.getOperadorById(id);

            if(!operador){
                return res.status(404).json({
                    msg: "Operador não encontrado!",
                });
            }

            let updatedNome = nome ?? operador.nome;
            let updatedFuncao = funcao ?? operador.funcao;

            const result = await Operador.updateOperador(updatedNome.trim(), updatedFuncao, id);

            return res.status(200).json({
                msg: "Operador atualizado com sucesso!",
                result,
            });
        }catch (error) {
            res.status(500).json({
                msg: "Erro interno do servidor!",
                error: error.message,
            });
        }
    },

    async deleteOperador(req, res){
        try{
            const { id } = req.params;

            const operador = await Operador.getOperadorById(id);

            if(!operador){
                return res.status(404).json({
                    status: 404,
                    msg: "Operador não encontrado!",
                });
            }

            const result = await Operador.deleteOperador(id);

            return res.status(200).json({
                msg: "Operador deletado com sucesso!",
                result,
            });
        }catch (error) {
            res.status(500).json({
                msg: "Erro interno do servidor!",
                error: error.message,
            });
        }
    },
}

export default OperadorController;