import Estoque from "../models/Estoque.js";

const EstoqueController = {
    async getEstoques(_, res) {
        try{
            const estoques = await Estoque.getEstoques();

            if(!estoques){
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
                status: 500,
                data: error.message,
            });
        }
    },

    async getEstoqueById(req, res) {
        try{
            const id = req.params.id;

            const estoques = await Estoque.getEstoqueById(id);

            if(!estoques){
                return res.status(404).json({
                    status: 404,
                    msg: "Estoques não encontrado!",
                });
            }

            return res.status(200).json({
                status: 200,
                data: estoques,
            });
        }catch (error) {
            res.status(500).json({
                status: 500,
                data: error.message,
            });
        }
    },

    async getEstoqueByName(req, res){
        try{
            const descricao = req.params.descricao;

            if(!descricao){
                return res.status(400).json({
                    status: 400,
                    msg: "Descrição não informado!",
                });
            }

            const estoque = await Estoque.getEstoqueByName(descricao);

            if (!estoque.length) {
                return res.status(404).json({
                    status: 404,
                    msg: "Nenhum estoque encontrado!",
                });
            }

            return res.status(200).json({
                status: 200,
                estoque,
            });
        }catch (error){
            res.status(500).json({
                status: 500,
                data: error.message,
            });
        }
    },

    async getEstoqueByStatus(req, res){
        try{    
            const {status} = req.params;
            
            if(!status){
                return res.status(400).json({
                    status: 400,
                    msg: "Status não informado!",
                });
            }

            const estoque = await Estoque.getEstoqueByStatus(status);

            if (!estoque.length) {
                return res.status(404).json({
                    status: 404,
                    msg: "Nenhum estoque encontrado!",
                });
            }

            return res.status(200).json({
                status: 200,
                estoque,
            });
        }catch (error) {
            res.status(500).json({
                status: 500,
                data: error.message,
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
                status: 201,
                msg: "Estoque criado com sucesso!",
                data: result,
            });
        }catch (error) {
            res.status(500).json({
                status: 500,
                data: error.message,
            });
        }
    },

    async updateEstoque(req, res){
        try{
            const {descricao, status, obs} = req.body;
            const id = req.params.id;

            if(!descricao){
                return res.status(400).json({
                    status: 400,
                    msg: "Nenhum campo foi enviado para atualização!",
                });
            }

            const estoque = await Estoque.getEstoqueById(id);

            if(!estoque){
                return res.status(404).json({
                    status: 404,
                    msg: "Estoque não encontrado!",
                });
            }

            let updatedDescricao = descricao ?? estoque.descricao;
            let updateStatus = status ?? estoque.status;
            let updateObs = obs ?? estoque.obs ?? null;

            const result = await Estoque.updateEstoque(updatedDescricao.trim(), updateStatus, updateObs, id);

            return res.status(200).json({
                status: 200,
                msg: "Estoque atualizado com sucesso!",
                data: result,
            });
        }catch (error) {
            res.status(500).json({
                status: 500,
                data: error.message,
            });
        }
    },

    async deleteEstoque(req, res){
        try{
            const id = req.params.id;

            const estoque = await Estoque.getEstoqueById(id);

            if(!estoque){
                return res.status(404).json({
                    status: 404,
                    msg: "Estoque não encontrado!",
                });
            }

            const result = await Estoque.deleteEstoque(id);

            return res.status(200).json({
                status: 200,
                msg: "Estoque deletado com sucesso!",
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

export default EstoqueController;