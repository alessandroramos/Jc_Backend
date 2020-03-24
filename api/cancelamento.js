const moment = require('moment')

module.exports = app => {
    const getCancelamentos = (req, res) => {
        app.db('cancelamentos')
            .orderBy('cancelamentosDataCadastro')
            .then(cancelamentos => res.json(cancelamentos))
            .catch(err => res.status(400).json(err))
    }
//-----------------------------------------------------------------------------------------
    const saveCancelamentos = (req, res) => {  
        console.log(req.body)  
        app.db('cancelamentos')
            .insert(req.body)
            .returning('cancelamentos.cancelamentos_id')
            .then((cancelamentos_id) => res.json(cancelamentos_id[0]))
            .catch(err => res.status(403).json(err))
    }
//------------------------------------------------------------------------------------------------------
    const updateCancelamentos = (req, res ) => {
        app.db('cancelamentos')
            .where({ cancelamentos_id: req.body.cancelamentos_id})
            .first()
            .then(cancelamento => {
                if (!cancelamento) {
                    const msg = `cancelamento com id ${req.params.cancelamentos_id} não encontrada.`
                    return res.status(410).send(msg)
                }else{
                    app.db('cancelamentos')
                    .where({ cancelamentos_id: req.body.cancelamentos_id})
                    .update({   cancelamentosSetor: req.body.cancelamentosSetor,
                                cancelamentosProduto: req.body.cancelamentosProduto,
                                cancelamentosQuantidade: req.body.cancelamentosQuantidade,
                                cancelamentosPrevencao: req.body.cancelamentosPrevencao,
                                cancelamentosObservacao: req.body.cancelamentosObservacao,
                                cancelamentosDataUpdate: req.body.cancelamentosDataUpdate 
                            })
                        .then(_ => res.status(204).send())
                        .catch(err => res.status(405).json(err))            
                }
            })
            .catch(err => res.status(400).json(err)) 
    }
//-------------------------------------------------------------------------------------------------------------
   
    const buscaCancelamento = (req, res) => {
        app.db('cancelamentos')
            .where({ cancelamentos_id: req.params.cancelamentos_id })
            .then(cancelamentos => res.json(cancelamentos))
            .catch(err => res.status(400).json(err))   }

//-------------------------------------------------------------------------------------------------------------


    return { getCancelamentos, saveCancelamentos, updateCancelamentos, buscaCancelamento }
}