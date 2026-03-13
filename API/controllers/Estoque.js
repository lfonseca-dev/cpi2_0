import Estoque from "../models/Estoque.js";

const EstoqueController = {
    async getEstoques(_, res) {
        try{
            const estoques = await Estoque.getEstoques();

            if(!estoques || estoques.length === 0){
                return res.status(404).json({
                    status: 404,
                    msg: "Estoques não encontrado!",
                });
            }

            return res.status(200).json({
                status: 200,
                estoques,
            });
        }catch (error) {
            res.status(500).json({
                msg: "Erro interno do servidor!",
                error: error.message,
            });
        }
    },

    async getEstoqueById(req, res) {
        try{
            const id = req.params.id;

            const estoque = await Estoque.getEstoqueById(id);

            if(!estoque){
                return res.status(404).json({
                    msg: "Estoques não encontrado!",
                });
            }

            return res.status(200).json({
                msg: "OK!",
                data: estoque,
            });
        }catch (error) {
            res.status(500).json({
                msg: "Erro interno do servidor!",
                error: error.message,
            });
        }
    },

    async getEstoqueByName(req, res){
        try{
            const descricao = req.params.descricao;

            if(!descricao){
                return res.status(400).json({
                    msg: "Descrição não informado!",
                });
            }

            const estoque = await Estoque.getEstoqueByName(descricao);

            if (!estoque) {
                return res.status(404).json({
                    msg: "Nenhum estoque encontrado!",
                });
            }

            return res.status(200).json({
                msg: "OK!",
                data: estoque,
            });
        }catch (error){
            res.status(500).json({
                msg: "Erro interno do servidor!",
                error: error.message,
            });
        }
    },

    async getEstoqueByStatus(req, res){
        try{    
            const {status} = req.params;
            
            if(!status){
                return res.status(400).json({
                    msg: "Status não informado!",
                });
            }

            const estoque = await Estoque.getEstoqueByStatus(status);

            if (!estoque) {
                return res.status(404).json({
                    msg: "Nenhum estoque encontrado!",
                });
            }

            return res.status(200).json({
                msg: "OK!",
                data: estoque,
            });
        }catch (error) {
            res.status(500).json({
                msg: "Erro interno do servidor!",
                error: error.message,
            });
        }
    },

    async addEstoque(req, res){
        try{
            const {descricao, status, obs} = req.body;

            if(!descricao){
                return res.status(400).json({
                status: 400,
                msg: "Todos os campos devem ser preenchidos!",
                });
            }

            const result = await Estoque.addEstoque(descricao, status, obs);

            return res.status(201).json({
                msg: "Estoque criado com sucesso!",
                result,
            });
        }catch (error) {
            res.status(500).json({
                msg: "Erro interno do servidor!",
                error: error.message,
            });
        }
    },

    async updateEstoque(req, res){
        try{
            const {descricao, status, obs} = req.body;
            const id = req.params.id;

            if(!descricao && !status){
                return res.status(400).json({
                    msg: "Nenhum campo foi enviado para atualização!",
                });
            }

            const estoque = await Estoque.getEstoqueById(id);

            if(!estoque){
                return res.status(404).json({
                    msg: "Estoque não encontrado!",
                });
            }

            let updatedDescricao = descricao ?? estoque.descricao;
            let updateStatus = status ?? estoque.status;
            let updateObs = obs ?? estoque.obs ?? null;

            const result = await Estoque.updateEstoque(updatedDescricao.trim(), updateStatus, updateObs, id);

            return res.status(200).json({
                msg: "Estoque atualizado com sucesso!",
                result,
            });
        }catch (error) {
            res.status(500).json({
                msg: "Erro interno do servidor!",
                error: error.message,
            });
        }
    },

    async deleteEstoque(req, res){
        try{
            const id = req.params.id;

            const estoque = await Estoque.getEstoqueById(id);

            if(!estoque){
                return res.status(404).json({
                    msg: "Estoque não encontrado!",
                });
            }

            const result = await Estoque.deleteEstoque(id);

            return res.status(200).json({
                msg: "Estoque deletado com sucesso!",
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

export default EstoqueController;