import EntradaEstoque from "../models/EntradaEstoque.js";

const EntradaEstoqueController = {
    async getAllEntradasEstoque(_, res) {
        try{
            const entradas = await EntradaEstoque.getAllEntradasEstoque();

            return res.status(200).json({
                msg: "OK!",
                data: entradas,
            })
        }catch (error) {
            res.status(500).json({
                msg: "Erro interno do servidor!",
                error: error.message,
            });
        }
    },

    async getEntradaEstoqueById(req, res) {
        try{
            const { id } = req.params;

            const entrada = await EntradaEstoque.getEntradasEstoqueById(id);

            if(!entrada){
                return res.status(404).json({
                    msg: "Entrada não encontrada!"
                });
            }

            return res.status(200).json({
                msg: "OK!",
                data: entrada,
            })
        }catch (error) {
            res.status(500).json({
                msg: "Erro interno do servidor!",
                error: error.message,
            });
        }
    },

    async addEntradaEstoque(req, res) {
        try{
            const {numero_bobina, carbono, corrida, peso, nota_fiscal, local_estoque, produto} = req.body;

            if(!numero_bobina || !carbono || !corrida || !peso || !nota_fiscal || !local_estoque || !produto){
                return res.status(400).json({
                    msg: "Todos os campos devem ser preenchidos!",
                });   
            }

            const result = await EntradaEstoque.addEntradasEstoque(numero_bobina, carbono, corrida, peso, nota_fiscal, local_estoque, produto);

            return res.status(201).json({
                msg: "Entrada criada com sucesso!",
                result,
            })
        }catch (error) {
            res.status(500).json({
                msg: "Erro interno do servidor!",
                error: error.message,
            });
        }
    },

    async updateEntradaEstoque(req, res) {
        try{
            const {numero_bobina, carbono, corrida, peso, nota_fiscal, local_estoque, produto} = req.body;
            const { id } = req.params;

            if(!numero_bobina && !carbono && !corrida && !peso && !nota_fiscal && !local_estoque && !produto){
                return res.status(400).json({
                    msg: "Nenhum campo foi enviado para atualização!",
                });   
            }

            const entrada = await EntradaEstoque.getEntradasEstoqueById(id);

            if(!entrada){
                return res.status(404).json({
                    msg: "Entrada não encontrada!",
                });
            }

            let updateN_bobina = numero_bobina ?? entrada.numero_bobina;
            let updateCarbono = carbono ?? entrada.carbono;
            let updateCorrida = corrida ?? entrada.corrida;
            let updatePeso = peso ?? entrada.peso;
            let updateN_fiscal = nota_fiscal ?? entrada.nota_fiscal;
            let updateL_estoque = local_estoque ?? entrada.local_estoque;
            let updateProduto = produto ?? entrada.produto;

            const result = await EntradaEstoque.updateEntradasEstoque(
                updateN_bobina, updateCarbono, updateCorrida, updatePeso, updateN_fiscal, updateL_estoque, updateProduto, id);

            return res.status(200).json({
                msg: "Entrada atualizada com sucesso!",
                result,
            })
        }catch (error) {
            res.status(500).json({
                msg: "Erro interno do servidor!",
                error: error.message,
            });
        }
    },

    async deleteEntradaEstoque(req, res) {
        try{
            const { id } = req.params;

            const entrada = await EntradaEstoque.getEntradasEstoqueById(id);

            if(!entrada){
                return res.status(404).json({
                    msg: "Entrada não encontrada!",
                });
            }

            const result = await EntradaEstoque.deleteEntradasEstoque(id);

            return res.status(200).json({
                msg: "Entrada deletada com sucesso!",
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

export default EntradaEstoqueController;