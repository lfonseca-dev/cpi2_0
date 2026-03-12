import Engenheiro from "../models/Engenheiro.js";

const EngenheiroController = {
    async getEngenheiros(_, res) {
        try{
            const engenheiros = await Engenheiro.getEngenheiros();

            if(!engenheiros || engenheiros.length === 0){
                return res.status(404).json({
                    status: 404,
                    msg: "Engenheiros não encontrado!",
                });
            }

            return res.status(200).json({
                status: 200,
                engenheiros,
            });
        }catch (error) {
            res.status(500).json({
                status: 500,
                data: error.message,
            });
        }
    },

    async getEngenheiroById(req, res) {
        try{
            const id = req.params.id;

            const engenheiro = await Engenheiro.getEngenheiroById(id);

            if(!engenheiro || engenheiro.length === 0){
                return res.status(404).json({
                    status: 404,
                    msg: "Engenheiro não encontrado!",
                });
            }

            return res.status(200).json({
                status: 200,
                data: engenheiro,
            });
        }catch (error) {
            res.status(500).json({
                status: 500,
                data: error.message,
            });
        }
    },

    async getEngenheiroByName(req, res){
        try{
            const nome = req.params.nome;

            if(!nome){
                return res.status(400).json({
                status: 400,
                msg: "Nome não informado!",
            });
            }

            const engenheiro = await Engenheiro.getEngenheiroByName(nome);

            if (!engenheiro || engenheiro.length === 0) {
                return res.status(404).json({
                    status: 404,
                    msg: "Nenhum engenheiro encontrado!",
                });
            }

            return res.status(200).json({
            status: 200,
            engenheiro,
            });
        }catch (error){
            res.status(500).json({
                status: 500,
                data: error.message,
            });
        }
    },

    async addEngenheiro(req, res){
        try{
            const {nome} = req.body;

            if(!nome){
                return res.status(400).json({
                status: 400,
                msg: "Todos os campos devem ser preenchidos!",
                });
            }

            const result = await Engenheiro.addEngenheiro(nome);

            return res.status(201).json({
                status: 201,
                msg: "Engenheiro criado com sucesso!",
                data: result,
            });
        }catch (error) {
            res.status(500).json({
                status: 500,
                data: error.message,
            });
        }
    },

    async updateEngenheiro(req, res){
        try{
            const {nome} = req.body;
            const id = req.params.id;

            if(!nome){
                return res.status(400).json({
                status: 400,
                msg: "Nenhum campo foi enviado para atualização!",
                });
            }

            const engenheiro = await Engenheiro.getEngenheiroById(id);

            if(!engenheiro || engenheiro.length === 0){
                return res.status(404).json({
                    status: 404,
                    msg: "Engenheiro não encontrado!",
                });
            }

            let updatedNome = nome ?? engenheiro.nome;

            const result = await Engenheiro.updateEngenheiro(updatedNome.trim(), id);

            return res.status(200).json({
                status: 200,
                msg: "Engenheiro atualizado com sucesso!",
                data: result,
            });
        }catch (error) {
            res.status(500).json({
                status: 500,
                data: error.message,
            });
        }
    },

    async deleteEngenheiro(req, res){
        try{
            const id = req.params.id;

            const engenheiro = await Engenheiro.getEngenheiroById(id);

            if(!engenheiro || engenheiro.length === 0){
                return res.status(404).json({
                    status: 404,
                    msg: "Engenheiro não encontrado!",
                });
            }

            const result = await Engenheiro.deleteEngenheiro(id);

            return res.status(200).json({
                status: 200,
                msg: "Engenheiro deletado com sucesso!",
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

export default EngenheiroController;