const moment = require('moment')

module.exports = app => {
    const getTroca_devolucaos = (req, res) => {
        app.db('troca_devolucaos')
            .orderBy('troca_devolucaosDataCadastro')
            .then(troca_devolucaos => res.json(troca_devolucaos))
            .catch(err => res.status(400).json(err))
    }
//-----------------------------------------------------------------------------------------
    const saveTroca_devolucaos = (req, res) => {  
        console.log(req.body)  
        app.db('troca_devolucaos')
            .insert(req.body)
            .returning('troca_devolucaos.troca_devolucaos_id')
            .then((troca_devolucaos_id) => res.json(troca_devolucaos_id[0]))
            .catch(err => res.status(403).json(err))
    }
//------------------------------------------------------------------------------------------------------
    const updateTroca_devolucaos = (req, res ) => {
        app.db('troca_devolucaos')
            .where({ troca_devolucaos_id: req.body.troca_devolucaos_id})
            .first()
            .then(troca_devolucao => {
                if (!troca_devolucao) {
                    const msg = `troca_devolucao com id ${req.params.troca_devolucaos_id} não encontrada.`
                    return res.status(410).send(msg)
                }else{
                    app.db('troca_devolucaos')
                    .where({ troca_devolucaos_id: req.body.troca_devolucaos_id})
                    .update({   troca_devolucaosSetor: req.body.troca_devolucaosSetor,
                                troca_devolucaosProduto: req.body.troca_devolucaosProduto,
                                troca_devolucaosQuantidade: req.body.troca_devolucaosQuantidade,
                                troca_devolucaosPrevencao: req.body.troca_devolucaosPrevencao,
                                troca_devolucaosObservacao: req.body.troca_devolucaosObservacao,
                                troca_devolucaosDataUpdate: req.body.troca_devolucaosDataUpdate 
                            })
                        .then(_ => res.status(204).send())
                        .catch(err => res.status(405).json(err))            
                }
            })
            .catch(err => res.status(400).json(err)) 
    }
//-------------------------------------------------------------------------------------------------------------
   
    const buscaTroca_devolucao = (req, res) => {
        app.db('troca_devolucaos')
            .where({ troca_devolucaos_id: req.params.troca_devolucaos_id })
            .then(troca_devolucaos => res.json(troca_devolucaos))
            .catch(err => res.status(400).json(err))   }

//-------------------------------------------------------------------------------------------------------------


    return { getTroca_devolucaos, saveTroca_devolucaos, updateTroca_devolucaos, buscaTroca_devolucao }
}