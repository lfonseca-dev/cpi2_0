import Resposavel from "../models/Resposavel.js";

const ResponsavelController = {
    async getResponsaveis(_, res) {
        try{
            const responsaveis = await Resposavel.getResponsaveis();

            if(!responsaveis){
                return res.status(404).json({
                    msg: "Rsponsáveis não encontrado!",
                });
            }

            return res.status(200).json({
                msg: "OK!",
                data: responsaveis,
            });
        }catch (error) {
            res.status(500).json({
                msg: "Erro interno do servidor!",
                error: error.message,
            });
        }
    },

    async getResponsavelById(req, res) {
        try{
            const id = req.params.id;

            const responsavel = await Resposavel.getResponsavelById();

            if(!responsavel){
                return res.status(404).json({
                    msg: "Responsável não encontrado!",
                });
            }

            return res.status(200).json({
                msg: "OK!",
                data: responsavel,
            });
        }catch (error) {
            res.status(500).json({
                msg: "Erro interno do servidor!",
                error: error.message,
            });
        }
    },

    async getResponsavelByName(req, res){
        try{
            const nome = req.params.nome;

            if(!nome){
                return res.status(400).json({
                msg: "Nome não informado!",
            });
            }

            const responsavel = await Resposavel.getResponsavelByName(nome);

            if (!responsavel) {
                return res.status(404).json({
                    msg: "Nenhum responsável encontrado!",
                });
            }

            return res.status(200).json({
                msg: "OK!",
                data: responsavel,
            });
        }catch (error){
            res.status(500).json({
                msg: "Erro interno do servidor!",
                error: error.message,
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
                msg: "Responsável criado com sucesso!",
                result,
            });
        }catch (error) {
            res.status(500).json({
                msg: "Erro interno do servidor!",
                error: error.message,
            });
        }
    },

    async updateResponsavel(req, res){
        try{
            const {nome, obs, engenheiro} = req.body;
            const id = req.params.id;

            if(!nome && !obs && !engenheiro){
                return res.status(400).json({
                status: 400,
                msg: "Nenhum campo foi enviado para atualização!",
                });
            }

            const responsavel = await Resposavel.updateResponsavel(id);

            if(!responsavel){
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
                msg: "Responsável atualizado com sucesso!",
                result,
            });
        }catch (error) {
            res.status(500).json({
                msg: "Erro interno do servidor!",
                error: error.message,
            });
        }
    },

    async deleteResponsavel(req, res){
        try{
            const id = req.params.id;

            const responsavel = await Resposavel.getResponsavelById(id);

            if(!responsavel){
                return res.status(404).json({
                    status: 404,
                    msg: "Responsável não encontrado!",
                });
            }

            const result = await Resposavel.deleteResponsavel(id);

            return res.status(200).json({
                msg: "Responsável deletado com sucesso!",
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

export default ResponsavelController;