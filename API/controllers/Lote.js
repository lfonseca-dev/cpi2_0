import Lote from "../models/Lote.js";

const LoteController = {
    async getLotes(_, res) {
        try{
            const lotes = await Lote.getLotes();

            if(!lotes){
                return res.status(404).json({
                    msg: "Lotes não encontrado!",
                });
            }

            return res.status(200).json({
                msg: "OK!",
                data: lotes,
            });
        }catch (error) {
            res.status(500).json({
                msg: "Erro interno do servidor!",
                error: error.message,
            });
        }
    },

    async getLoteById(req, res) {
        try{
            const id = req.params.id;

            const lote = await Lote.getLoteById(id);

            if(!lote){
                return res.status(404).json({
                    msg: "Lote não encontrado!",
                });
            }

            return res.status(200).json({
                msg: "OK!",
                data: lote,
            });
        }catch (error) {
            res.status(500).json({
                msg: "Erro interno do servidor!",
                error: error.message,
            });
        }
    },

    async getLoteByNum(req, res) {
        try{
            const numero = req.params.numero;

            if(!numero){
                return res.status(400).json({
                    msg: "Número não informado!",
                });
            }

            const lote = await Lote.getLoteByNum(numero);

            if(!lote){
                return res.status(404).json({
                    msg: "Lote não encontrado!",
                });
            }

            return res.status(200).json({
                msg: "OK!",
                data: lote,
            });
        }catch (error) {
            res.status(500).json({
                msg: "Erro interno do servidor!",
                error: error.message,
            });
        }
    },

    async addLote(req, res) {
        try{
            const {numero, produto_final, produto_mp, status} = req.body;

            if(!numero || !produto_final || !produto_mp || !status){
                return res.status(400).json({
                    msg: "Todos os campos devem ser preenchidos!",
                });
            }

            const result = await Lote.addLote(numero, produto_final, produto_mp, status);

            return res.status(201).json({
                msg: "Lote criado com sucesso!",
                data: result,
            });
        }catch (error) {
            res.status(500).json({
                msg: "Erro interno do servidor!",
                error: error.message,
            });
        }
    },

    async updateLote(req, res) {
        try{
            const {numero, produto_final, produto_mp, status} = req.body;
            const id = req.params.id;

            if(!numero && !produto_final && !produto_mp && !status){
                return res.status(400).json({
                    msg: "Nenhum campo foi enviado para atualização!",
                });
            }

            const lote = Lote.getLoteById(id);

            if(!lote){
                return res.status(404).json({
                    msg: "Lote não encontrado!",
                });
            }

            let updateNumero = numero ?? lote.numero;
            let updateProduto_f = produto_final ?? lote.produto_final;
            let updateProduto_mp = produto_mp ?? lote.produto_mp;
            let updateStatus = status ?? lote.status;

            const result = await Lote.updateLote(updateNumero, updateProduto_f, updateProduto_mp, updateStatus, id);

            return res.status(200).json({
                msg: "Lote atualizado com sucesso!",
                result,
            });
        }catch (error) {
            res.status(500).json({
                msg: "Erro interno do servidor!",
                error: error.message,
            });
        }
    },

    async deleteLote(req, res) {
        try{
            const id = req.params.id;

            const lote = Lote.getLoteById(id);

            if(!lote){
                return res.status(404).json({
                    msg: "Lote não encontrado!",
                });
            }

            const result = await Lote.deleteLote(id);

            return res.status(200).json({
                msg: "Lote deletado com sucesso!",
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

export default LoteController;