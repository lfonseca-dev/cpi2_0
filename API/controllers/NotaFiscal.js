import NotaFiscal from "../models/NotaFiscal.js";

const NotaFiscalController = {
    async getAllNotasFiscais(_, res) {
        try{
            const notas = await NotaFiscal.getAllNotasFiscais();

            return res.status(200).json({
                msg: "OK!",
                data: notas,
            });
        }catch (error) {
            res.status(500).json({
                msg: "Erro interno do servidor!",
                error: error.message,
            });
        }
    },

    async getNotaFiscalByCod(req, res) {
        try{
            const { codigo } = req.params;

            if(!codigo){
                return res.status(400).json({
                    msg: "Código não informado!",
                });
            }

            const nota = await NotaFiscal.getNotaFiscalByCod(codigo);

            if(!nota){
                return res.status(404).json({
                    msg: "Nota não encontrada!",
                });
            }

            return res.status(200).json({
                msg: "OK!",
                data: nota,
            });
        }catch (error) {
            res.status(500).json({
                msg: "Erro interno do servidor!",
                error: error.message,
            });
        }
    },

    async addNotaFiscal(req, res) {
        try{
            const {codigo, quant_rolos, peso, data, certificado, obs, fornecedor} = req.body;

            if(!codigo || !quant_rolos || !peso || !data || !certificado|| !fornecedor){
                return res.status(400).json({
                status: 400,
                msg: "Todos os campos devem ser preenchidos!",
                });
            }

            const result = await NotaFiscal.addNotaFiscal(codigo, quant_rolos, peso, data, certificado, obs, fornecedor);


            return res.status(201).json({
                msg: "Nota Fiscal criada com sucesso!",
                result,
            });
        }catch (error) {
            res.status(500).json({
                msg: "Erro interno do servidor!",
                error: error.message,
            });
        }
    },

    async updateNotaFiscal(req, res) {
        try{
            const {quant_rolos, peso, data, obs, fornecedor} = req.body;
            const { codigo } = req.params;

            if(!quant_rolos && !peso && !data && !obs && !fornecedor){
                return res.status(400).json({
                    msg: "Nenhum campo foi enviado para atualização!",
                });
            }

            const nota = await NotaFiscal.getNotaFiscalByCod(codigo);

            if(!nota){
                return res.status(404).json({
                    msg: "Nota Fiscal não encontrada!",
                });
            }

            let updateQuant_rolos = quant_rolos ?? nota.quant_rolos;
            let updatePeso = peso ?? nota.peso;
            let updateData = data ?? nota.data;
            let updateObs = obs ?? nota.obs;
            let updateFornecedor = fornecedor ?? nota.fornecedor;

            const result = await NotaFiscal.updateNotaFiscal(updateQuant_rolos, updatePeso, updateData, updateObs, updateFornecedor, codigo);

            return res.status(200).json({
                msg: "Nota Fiscal atualizada com sucesso!",
                result,
            });
        }catch (error) {
            res.status(500).json({
                msg: "Erro interno do servidor!",
                error: error.message,
            });
        }
    },

    async deleteNotaFiscal(req, res) {
        try{
            const { codigo } = req.params;

            const nota = await NotaFiscal.getNotaFiscalByCod(codigo);

            if(!nota){
                return res.status(404).json({
                    msg: "Nota Fiscal não encontrada!",
                });
            }

            const result = await NotaFiscal.deleteNotaFiscal(codigo);

            return res.status(200).json({
                msg: "Nota Fiscal deletada com sucesso!",
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

export default NotaFiscalController;