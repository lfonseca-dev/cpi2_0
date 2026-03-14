import Engenheiro from "../models/Engenheiro.js";

const EngenheiroController = {
    async getAllEngenheiros(_, res) {
        try{
            const engenheiros = await Engenheiro.getAllEngenheiros();

            return res.status(200).json({
                msg: "OK!",
                data: engenheiros,
            });
        }catch (error) {
            res.status(500).json({
                msg: "Erro interno do servidor!",
                error: error.message,
            });
        }
    },

    async getEngenheiroById(req, res) {
        try{
            const { id } = req.params;

            const engenheiro = await Engenheiro.getEngenheiroById(id);

            if(!engenheiro){
                return res.status(404).json({
                    msg: "Engenheiro não encontrado!",
                });
            }

            return res.status(200).json({
                msg: "OK!",
                data: engenheiro,
            });
        }catch (error) {
            res.status(500).json({
                msg: "Erro interno do servidor!",
                error: error.message,
            });
        }
    },

    async getEngenheiroByName(req, res){
        try{
            const { nome } = req.params;

            if(!nome){
                return res.status(400).json({
                    msg: "Nome não informado!",
                });
            }

            const engenheiro = await Engenheiro.getEngenheiroByName(nome);

            if (!engenheiro) {
                return res.status(404).json({
                    msg: "Nenhum engenheiro encontrado!",
                });
            }

            return res.status(200).json({
                msg: "OK!",
                data: engenheiro,
            });
        }catch (error){
            res.status(500).json({
                msg: "Erro interno do servidor!",
                error: error.message,
            });
        }
    },

    async addEngenheiro(req, res){
        try{
            const { nome } = req.body;

            if(!nome){
                return res.status(400).json({
                    msg: "Todos os campos devem ser preenchidos!",
                });
            }

            const result = await Engenheiro.addEngenheiro(nome);

            return res.status(201).json({
                msg: "Engenheiro criado com sucesso!",
                result,
            });
        }catch (error) {
            res.status(500).json({
                msg: "Erro interno do servidor!",
                error: error.message,
            });
        }
    },

    async updateEngenheiro(req, res){
        try{
            const {nome} = req.body;
            const { id } = req.params;

            if(!nome){
                return res.status(400).json({
                    msg: "Nenhum campo foi enviado para atualização!",
                });
            }

            const engenheiro = await Engenheiro.getEngenheiroById(id);

            if(!engenheiro){
                return res.status(404).json({
                    msg: "Engenheiro não encontrado!",
                });
            }

            let updatedNome = nome ?? engenheiro.nome;

            const result = await Engenheiro.updateEngenheiro(updatedNome.trim(), id);

            return res.status(200).json({
                msg: "Engenheiro atualizado com sucesso!",
                result,
            });
        }catch (error) {
            res.status(500).json({
                msg: "Erro interno do servidor!",
                error: error.message,
            });
        }
    },

    async deleteEngenheiro(req, res){
        try{
            const { id } = req.params;

            const engenheiro = await Engenheiro.getEngenheiroById(id);

            if(!engenheiro){
                return res.status(404).json({
                    msg: "Engenheiro não encontrado!",
                });
            }

            const result = await Engenheiro.deleteEngenheiro(id);

            return res.status(200).json({
                msg: "Engenheiro deletado com sucesso!",
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

export default EngenheiroController;