import NotaFiscal from "../models/NotaFiscal.js";

const NotaFiscalController = {
    async getNotasFiscais(_, res) {
        try{
            const notas = await NotaFiscal.getNotasFiscais();

            if(!notas || notas.length === 0){
                return res.status(404).json({
                    status: 404,
                    msg: "Notas não encontradas!",
                });
            }

            return res.status(200).json({
                status: 200,
                notas,
            });
        }catch (error) {
            res.status(500).json({
                status: 500,
                data: error.message,
            });
        }
    },

    async getNotaFiscalByCod(req, res) {
        try{
            const codigo = req.params.codigo;

            if(!codigo || codigo.length === 0){
                return res.status(400).json({
                    status: 400,
                    msg: "Código não informado!",
                });
            }

            const nota = await NotaFiscal.getNotaFiscalByCod(codigo);

            if(!nota){
                return res.status(404).json({
                    status: 404,
                    msg: "Nota não encontrada!",
                });
            }

            return res.status(200).json({
                status: 200,
                nota,
            });
        }catch (error) {
            res.status(500).json({
                status: 500,
                data: error.message,
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
                status: 201,
                msg: "Nota Fiscal criada com sucesso!",
                data: result,
            });
        }catch (error) {
            res.status(500).json({
                status: 500,
                data: error.message,
            });
        }
    },

    async updateNotaFiscal(req, res) {
        try{
            const {quant_rolos, peso, data, obs, fornecedor} = req.body;
            const codigo = req.params.codigo;

            if(!quant_rolos && !peso && !data && !obs && !fornecedor){
                return res.status(400).json({
                    status: 400,
                    msg: "Nenhum campo foi enviado para atualização!",
                });
            }

            const nota = await NotaFiscal.getNotaFiscalByCod(codigo);

            if(!nota || nota.length === 0){
                return res.status(404).json({
                    status: 404,
                    msg: "Nota Fiscal não encontrada!",
                });
            }

            let updateQuant_rolos = quant_rolos ?? nota.quant_rolos;
            let updatePeso = peso ?? nota.peso;
            let updateData = data ?? nota.data;
            let updateObs = obs ?? nota.obs ?? null;
            let updateFornecedor = fornecedor ?? nota.fornecedor;

            const result = await NotaFiscal.updateNotaFiscal(updateQuant_rolos, updatePeso, updateData, updateObs, updateFornecedor, codigo);

            return res.status(200).json({
                status: 200,
                msg: "Nota Fiscal atualizada com sucesso!",
                data: result,
            });
        }catch (error) {
            res.status(500).json({
                status: 500,
                data: error.message,
            });
        }
    },

    async deleteNotaFiscal(req, res) {
        try{
            const codigo = req.params.codigo;

            const nota = await NotaFiscal.getNotaFiscalByCod(codigo);

            if(!nota || nota.length === 0){
                return res.status(404).json({
                    status: 404,
                    msg: "Nota Fiscal não encontrada!",
                });
            }

            const result = await NotaFiscal.deleteNotaFiscal(codigo);

            return res.status(200).json({
                status: 200,
                msg: "Nota Fiscal deletada com sucesso!",
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

export default NotaFiscalController;