import Ensaio from "../models/Ensaio.js";

const EnsaioContoller = {
    async getAllEnsaios(_, res) {
        try{
            const ensaios = await Ensaio.getAllEnsaios();

            return res.status(200).json({
                msg: "OK!",
                data: ensaios,
            });
        }catch (error) {
            res.status(500).json({
                msg: "Erro interno do servidor!",
                error: error.message,
            });
        }
    },

    async getEnsaiobyId(req, res) {
        try{
            const { id } = req.params;
            const ensaio = await Ensaio.getEnsaioById(id);

            if (!ensaio) {
                return res.status(404).json({
                    msg: "Ensaio não encontrado!",
                });
            }

            return res.status(200).json({
                msg: "OK!",
                data: ensaio,
            });
        }catch (error) {
            res.status(500).json({
                msg: "Erro interno do servidor!",
                error: error.message,
            });
        }
    },

    async addEnsaio(req, res) {
        try{
            const {massa, lr, le, lr_le, lu, lo, alng, dobr, caracteristicaGEO, num_ensaio,  ocorrencia, lote, responsavel} = req.body;

            if( !lote || !responsavel){
                return res.status(400).json({
                    msg: "Obrigatório preencher lote e responsável!",
                    });
            }

            const result = await Ensaio.addEnsaio(massa, lr, le, lr_le, lu, lo, alng, dobr, caracteristicaGEO, num_ensaio,  ocorrencia, lote, responsavel);

            return res.status(201).json({
                msg: "Ensaio criado com sucesso!",
                result,
            });
        }catch (error) {
            res.status(500).json({
                msg: "Erro interno do servidor!",
                error: error.message,
            });
        }
    },

    async updateEnsaio(req, res) {
        try{
            const {massa, lr, le, lr_le, lu, lo, alng, dobr, caracteristicaGEO, num_ensaio,  ocorrencia, lote, responsavel} = req.body;
            const { id } = req.params;

            const ensaio = await Ensaio.getEnsaioById(id);

            if (!ensaio) {
                return res.status(404).json({
                    msg: "Ensaio não encontrado!",
                });
            }

            if(!massa && !lr && !le && !lr_le && !lu && !lo && !alng && !dobr && !caracteristicaGEO && !num_ensaio && !lote && !responsavel){
                return res.status(400).json({
                    msg: "Nenhum dado enviado para alteração!",
                    });
            }

            let updateMassa = massa ?? ensaio.massa;
            let updateLr = lr ?? ensaio.lr;
            let updateLe = le ?? ensaio.le;
            let updateLr_le = lr_le ?? ensaio.lr_le;
            let updateLu = lu ?? ensaio.lu;
            let updateLo = lo ?? ensaio.lo;
            let updateAlng = alng ?? ensaio.alng;
            let updateDobr = dobr ?? ensaio.dobr;
            let updateCaracteristicaGEO = caracteristicaGEO ?? ensaio.caracteristicaGEO;
            let updateNum_ensaio = num_ensaio ?? ensaio.num_ensaio;
            let updateOcorrencia = ocorrencia ?? ensaio.ocorrencia;
            let updateLote = lote ?? ensaio.lote;
            let updateResponsavel = responsavel ?? ensaio.responsavel;

            const result = await Ensaio.updateEnsaio(
                updateMassa, updateLr, updateLe, updateLr_le, updateLu, updateLo, updateAlng, updateDobr, 
                updateCaracteristicaGEO, updateNum_ensaio, updateOcorrencia, updateLote, updateResponsavel, id);

            return res.status(201).json({
                msg: "Ensaio atualizado com sucesso!",
                result,
            });
        }catch (error) {
            res.status(500).json({
                msg: "Erro interno do servidor!",
                error: error.message,
            });
        }
    },

    async deleteEnsaio(req, res) {
        try{
            const { id } = req.params;
            const ensaio = await Ensaio.getEnsaioById(id);

            if (!ensaio) {
                return res.status(404).json({
                     msg: "Ensaio não encontrado!",
                });
            }

            const result = await Ensaio.deleteEnsaio(id);

            return res.status(201).json({
                msg: "Ensaio deletado com sucesso!",
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

export default EnsaioContoller;