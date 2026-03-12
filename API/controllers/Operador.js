import Operador from "../models/Operador.js";

const OperadorController = {
    async getOperadores(_, res) {
        try{
            const operadores = await Operador.getOperadores();

            if(!operadores || operadores.length === 0){
                return res.status(404).json({
                    status: 404,
                    msg: "Operadores não encontrado!",
                });
            }

            return res.status(200).json({
                status: 200,
                operadores,
            });
        }catch (error) {
            res.status(500).json({
                status: 500,
                data: error.message,
            });
        }
    },

    async getOperadorById(req, res) {
        try{
            const id = req.params.id;

            const operador = await Operador.getOperadorById(id);

            if(!operador || operador.length === 0){
                return res.status(404).json({
                    status: 404,
                    msg: "Operador não encontrado!",
                });
            }

            return res.status(200).json({
                status: 200,
                data: operador,
            });
        }catch (error) {
            res.status(500).json({
                status: 500,
                data: error.message,
            });
        }
    },

    async getOperadorByName(req, res){
        try{
            const nome = req.params.nome;

            if(!nome){
                return res.status(400).json({
                status: 400,
                msg: "Nome não informado!",
            });
            }

            const operador = await Operador.getOperadorByName(nome);

            if (!operador || operador.length === 0) {
                return res.status(404).json({
                    status: 404,
                    msg: "Nenhum operador encontrado!",
                });
            }

            return res.status(200).json({
            status: 200,
            operador,
            });
        }catch (error){
            res.status(500).json({
                status: 500,
                data: error.message,
            });
        }
    },

    async addOperador(req, res){
        try{
            const {nome, funcao} = req.body;

            if(!nome || !funcao){
                return res.status(400).json({
                status: 400,
                msg: "Todos os campos devem ser preenchidos!",
                });
            }

            const result = await Operador.addOperador(nome, funcao);

            return res.status(201).json({
                status: 201,
                msg: "Operador criado com sucesso!",
                data: result,
            });
        }catch (error) {
            res.status(500).json({
                status: 500,
                data: error.message,
            });
        }
    },

    async updateOperador(req, res){
        try{
            const {nome, funcao} = req.body;
            const id = req.params.id;

            if(!nome && !funcao){
                return res.status(400).json({
                status: 400,
                msg: "Nenhum campo foi enviado para atualização!",
                });
            }

            const operador = await Operador.getOperadorById(id);

            if(!operador || operador.length === 0){
                return res.status(404).json({
                    status: 404,
                    msg: "Operador não encontrado!",
                });
            }

            let updatedNome = nome ?? operador.nome;
            let updatedFuncao = funcao ?? operador.funcao;

            const result = await Operador.updateOperador(updatedNome.trim(), updatedFuncao, id);

            return res.status(200).json({
                status: 200,
                msg: "Operador atualizado com sucesso!",
                data: result,
            });
        }catch (error) {
            res.status(500).json({
                status: 500,
                data: error.message,
            });
        }
    },

    async deleteOperador(req, res){
        try{
            const id = req.params.id;

            const operador = await Operador.getOperadorById(id);

            if(!operador || operador.length === 0){
                return res.status(404).json({
                    status: 404,
                    msg: "Operador não encontrado!",
                });
            }

            const result = await Operador.deleteOperador(id);

            return res.status(200).json({
                status: 200,
                msg: "Operador deletado com sucesso!",
                data: result,
            });
        }catch (error) {
            res.status(500).json({
                status: 500,
                data: error.message,
            });
        }
    },
}

export default OperadorController;