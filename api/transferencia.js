const moment = require('moment')

module.exports = app => {
    const getTransferencias = (req, res) => {
        app.db('transferencias')
            .orderBy('transferenciasDataCadastro')
            .then(transferencias => res.json(transferencias))
            .catch(err => res.status(400).json(err))
    }
//-----------------------------------------------------------------------------------------
    const saveTransferencias = (req, res) => {  
        console.log(req.body)  
        app.db('transferencias')
            .insert(req.body)
            .returning('transferencias.transferencias_id')
            .then((transferencias_id) => res.json(transferencias_id[0]))
            .catch(err => res.status(403).json(err))
    }
//------------------------------------------------------------------------------------------------------
    const updateTransferencias = (req, res ) => {
        app.db('transferencias')
            .where({ transferencias_id: req.body.transferencias_id})
            .first()
            .then(transferencia => {
                if (!transferencia) {
                    const msg = `transferencia com id ${req.params.transferencias_id} não encontrada.`
                    return res.status(410).send(msg)
                }else{
                    app.db('transferencias')
                    .where({ transferencias_id: req.body.transferencias_id})
                    .update({   transferenciasSetor: req.body.transferenciasSetor,
                                transferenciasProduto: req.body.transferenciasProduto,
                                transferenciasQuantidade: req.body.transferenciasQuantidade,
                                transferenciasPrevencao: req.body.transferenciasPrevencao,
                                transferenciasObservacao: req.body.transferenciasObservacao,
                                transferenciasDataUpdate: req.body.transferenciasDataUpdate 
                            })
                        .then(_ => res.status(204).send())
                        .catch(err => res.status(405).json(err))            
                }
            })
            .catch(err => res.status(400).json(err)) 
    }
//-------------------------------------------------------------------------------------------------------------
   
    const buscaTransferencia = (req, res) => {
        app.db('transferencias')
            .where({ transferencias_id: req.params.transferencias_id })
            .then(transferencias => res.json(transferencias))
            .catch(err => res.status(400).json(err))   }

//-------------------------------------------------------------------------------------------------------------


    return { getTransferencias, saveTransferencias, updateTransferencias, buscaTransferencia }
}