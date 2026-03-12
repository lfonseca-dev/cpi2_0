import Lote from "../models/Lote.js";

const LoteController = {
    async getLotes(_, res) {
        try{
            const lotes = await Lote.getLotes();

            if(!lotes || lotes.length === 0){
                return res.status(404).json({
                    status: 404,
                    msg: "Lotes não encontrado!",
                });
            }

            return res.status(200).json({
                status: 200,
                lotes,
            });
        }catch (error) {
            res.status(500).json({
                status: 500,
                data: error.message,
            });
        }
    },

    async getLoteById(req, res) {
        try{
            const id = req.params.id;

            const lote = await Lote.getLoteById(id);

            if(!lote || lote.length === 0){
                return res.status(404).json({
                    status: 404,
                    msg: "Lote não encontrado!",
                });
            }

            return res.status(200).json({
                status: 200,
                lote,
            });
        }catch (error) {
            res.status(500).json({
                status: 500,
                data: error.message,
            });
        }
    },

    async getLoteByNum(req, res) {
        try{
            const numero = req.params.numero;

            if(!numero){
                return res.status(400).json({
                status: 400,
                msg: "Número não informado!",
            });
            }

            const lote = await Lote.getLoteByNum(numero);

            if(!lote || lote.length === 0){
                return res.status(404).json({
                    status: 404,
                    msg: "Lote não encontrado!",
                });
            }

            return res.status(200).json({
                status: 200,
                lote,
            });
        }catch (error) {
            res.status(500).json({
                status: 500,
                data: error.message,
            });
        }
    },

    async addLote(req, res) {
        try{
            const {numero, produto_final, produto_mp, status} = req.body;

            if(!numero || !produto_final || !produto_mp || !status){
                return res.status(400).json({
                status: 400,
                msg: "Todos os campos devem ser preenchidos!",
                });
            }

            const result = await Lote.addLote(numero, produto_final, produto_mp, status);

            return res.status(201).json({
                status: 201,
                msg: "Lote criado com sucesso!",
                data: result,
            });
        }catch (error) {
            res.status(500).json({
                status: 500,
                data: error.message,
            });
        }
    },

    async updateLote(req, res) {
        try{
            const {numero, produto_final, produto_mp, status} = req.body;
            const id = req.params.id;

            if(!numero && !produto_final && !produto_mp && !status){
                return res.status(400).json({
                status: 400,
                msg: "Nenhum campo foi enviado para atualização!",
                });
            }

            const lote = Lote.getLoteById(id);

            if(!lote || lote.length === 0){
                return res.status(404).json({
                    status: 404,
                    msg: "Lote não encontrado!",
                });
            }

            let updateNumero = numero ?? lote.numero;
            let updateProduto_f = produto_final ?? lote.produto_final;
            let updateProduto_mp = produto_mp ?? lote.produto_mp;
            let updateStatus = status ?? lote.status;

            const result = await Lote.updateLote(updateNumero, updateProduto_f, updateProduto_mp, updateStatus, id);

            return res.status(200).json({
                status: 200,
                msg: "Lote atualizado com sucesso!",
                data: result,
            });
        }catch (error) {
            res.status(500).json({
                status: 500,
                data: error.message,
            });
        }
    },

    async deleteLote(req, res) {
        try{
            const id = req.params.id;

            const lote = Lote.getLoteById(id);

            if(!lote || lote.length === 0){
                return res.status(404).json({
                    status: 404,
                    msg: "Lote não encontrado!",
                });
            }

            const result = await Lote.deleteLote(id);

            return res.status(200).json({
                status: 200,
                msg: "Lote deletado com sucesso!",
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

export default LoteController;