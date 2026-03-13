import Destino from "../models/Destino.js";

const DestinoController = {
    async getDestinos(_, res) {
        try{
            const destinos = await Destino.getDestinos();

            if(!destinos || destinos.length === 0){
                return res.status(404).json({
                    status: 404,
                    msg: "Destinos não encontrado!",
                });
            }

            return res.status(200).json({
                status: 200,
                destinos,
            });
        }catch (error) {
            res.status(500).json({
                msg: "Erro interno do servidor!",
                error: error.message,
            });
        }
    },

    async getDestinoById(req, res) {
        try{
            const id = req.params.id;

            const destinos = await Destino.getDestinoById(id);

            if(!destinos || destinos.length === 0){
                return res.status(404).json({
                    status: 404,
                    msg: "Destinos não encontrado!",
                });
            }

            return res.status(200).json({
                status: 200,
                data: destinos,
            });
        }catch (error) {
            res.status(500).json({
                msg: "Erro interno do servidor!",
                error: error.message,
            });
        }
    },

    async getDestinoByName(req, res){
        try{
            const descricao = req.params.descricao;

            if(!descricao){
                return res.status(400).json({
                    msg: "Descrição não informado!",
                });
            }

            const destino = await Destino.getDestinoByName(descricao);

            if (!destino) {
                return res.status(404).json({
                    msg: "Nenhum destino encontrado!",
                });
            }

            return res.status(200).json({
                msg: "OK!",
                data: destino,
            });
        }catch (error){
            res.status(500).json({
                msg: "Erro interno do servidor!",
                error: error.message,
            });
        }
    },

    async addDestino(req, res){
        try{
            const {descricao} = req.body;

            if(!descricao){
                return res.status(400).json({
                    msg: "Todos os campos devem ser preenchidos!",
                });
            }

            const result = await Destino.addDestino(descricao);

            return res.status(201).json({
                msg: "Destino criado com sucesso!",
                result,
            });
        }catch (error) {
            res.status(500).json({
                msg: "Erro interno do servidor!",
                error: error.message,
            });
        }
    },

    async updateDestino(req, res){
        try{
            const {descricao} = req.body;
            const id = req.params.id;

            if(!descricao){
                return res.status(400).json({
                    msg: "Nenhum campo foi enviado para atualização!",
                });
            }

            const destino = await Destino.getDestinoById(id);

            if(!destino){
                return res.status(404).json({
                    msg: "Destino não encontrado!",
                });
            }

            let updatedDescricao = descricao ?? destino.descricao;

            const result = await Destino.updateDestino(updatedDescricao.trim(), id);

            return res.status(200).json({
                msg: "Destino atualizado com sucesso!",
                result,
            });
        }catch (error) {
            res.status(500).json({
                msg: "Erro interno do servidor!",
                error: error.message,
            });
        }
    },

    async deleteDestino(req, res){
        try{
            const id = req.params.id;

            const destino = await Destino.getDestinoById(id);

            if(!destino){
                return res.status(404).json({
                    msg: "Destino não encontrado!",
                });
            }

            const result = await Destino.deleteDestino(id);

            return res.status(200).json({
                msg: "Destino deletado com sucesso!",
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

export default DestinoController;