import Resposavel from "../models/Resposavel.js";

const ResponsavelController = {
    async getResponsaveis(_, res) {
        try{
            const responsaveis = await Resposavel.getResponsaveis();

            if(!responsaveis || responsaveis.length === 0){
                return res.status(404).json({
                    status: 404,
                    msg: "Rsponsáveis não encontrado!",
                });
            }

            return res.status(200).json({
                status: 200,
                responsaveis,
            });
        }catch (error) {
            res.status(500).json({
                status: 500,
                data: error.message,
            });
        }
    },

    async getResponsavelById(req, res) {
        try{
            const id = req.params.id;

            const responsavel = await Resposavel.getResponsavelById();

            if(!responsavel || responsavel.length === 0){
                return res.status(404).json({
                    status: 404,
                    msg: "Responsável não encontrado!",
                });
            }

            return res.status(200).json({
                status: 200,
                data: responsavel,
            });
        }catch (error) {
            res.status(500).json({
                status: 500,
                data: error.message,
            });
        }
    },

    async getResponsavelByName(req, res){
        try{
            const nome = req.params.nome;

            if(!nome){
                return res.status(400).json({
                status: 400,
                msg: "Nome não informado!",
            });
            }

            const responsavel = await Resposavel.getResponsavelByName(nome);

            if (!responsavel || responsavel.length === 0) {
                return res.status(404).json({
                    status: 404,
                    msg: "Nenhum responsável encontrado!",
                });
            }

            return res.status(200).json({
            status: 200,
            responsaveis,
            });
        }catch (error){
            res.status(500).json({
                status: 500,
                data: error.message,
            });
        }
    },

    async addResponsavel(req, res){
        try{
            const {nome, obs, engenheiro,} = req.body;

            if(!nome || !obs || !engenheiro){
                return res.status(400).json({
                status: 400,
                msg: "Todos os campos devem ser preenchidos!",
                });
            }

            const result = await Resposavel.addResponsavel(nome, obs, engenheiro);

            return res.status(201).json({
                status: 201,
                msg: "Responsável criado com sucesso!",
                data: result,
            });
        }catch (error) {
            res.status(500).json({
                status: 500,
                data: error.message,
            });
        }
    },

    async updateResponsavel(req, res){
        try{
            const {nome, obs, engenheiro} = req.body;
            const id = req.params.id;

            if(!nome && !funcao){
                return res.status(400).json({
                status: 400,
                msg: "Nenhum campo foi enviado para atualização!",
                });
            }

            const responsavel = await Resposavel.updateResponsavel(id);

            if(!responsavel || responsavel.length === 0){
                return res.status(404).json({
                    status: 404,
                    msg: "Responsável não encontrado!",
                });
            }

            let updatedNome = nome ?? responsavel.nome;
            let updatedObs = obs ?? responsavel.obs ?? null;
            let updateEngenheiro = engenheiro ?? responsavel.engenheiro;

            const result = await Operador.updateOperador(updatedNome.trim(), updatedObs, updateEngenheiro, id);

            return res.status(200).json({
                status: 200,
                msg: "Responsável atualizado com sucesso!",
                data: result,
            });
        }catch (error) {
            res.status(500).json({
                status: 500,
                data: error.message,
            });
        }
    },

    async deleteResponsavel(req, res){
        try{
            const id = req.params.id;

            const responsavel = await Resposavel.getResponsavelById(id);

            if(!responsavel || responsavel.length === 0){
                return res.status(404).json({
                    status: 404,
                    msg: "Responsável não encontrado!",
                });
            }

            const result = await Resposavel.deleteResponsavel(id);

            return res.status(200).json({
                status: 200,
                msg: "Responsável deletado com sucesso!",
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

export default ResponsavelController;