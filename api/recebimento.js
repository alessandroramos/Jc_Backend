const moment = require('moment')

module.exports = app => {
    const getRecebimentos = (req, res) => {
        app.db('recebimentos')
            .orderBy('recebimentosDataCadastro')
            .then(recebimentos => res.json(recebimentos))
            .catch(err => res.status(400).json(err))
    }
//-----------------------------------------------------------------------------------------
    const saveRecebimentos = (req, res) => {  
        console.log(req.body)  
        app.db('recebimentos')
            .insert(req.body)
            .returning('recebimentos.recebimentos_id')
            .then((recebimentos_id) => res.json(recebimentos_id[0]))
            .catch(err => res.status(403).json(err))
    }
//------------------------------------------------------------------------------------------------------
    const updateRecebimentos = (req, res ) => {
        app.db('recebimentos')
            .where({ recebimentos_id: req.body.recebimentos_id})
            .first()
            .then(recebimento => {
                if (!recebimento) {
                    const msg = `recebimento com id ${req.params.recebimentos_id} não encontrada.`
                    return res.status(410).send(msg)
                }else{
                    app.db('recebimentos')
                    .where({ recebimentos_id: req.body.recebimentos_id})
                    .update({   recebimentosSetor: req.body.recebimentosSetor,
                                recebimentosProduto: req.body.recebimentosProduto,
                                recebimentosQuantidade: req.body.recebimentosQuantidade,
                                recebimentosPrevencao: req.body.recebimentosPrevencao,
                                recebimentosObservacao: req.body.recebimentosObservacao,
                                recebimentosDataUpdate: req.body.recebimentosDataUpdate 
                            })
                        .then(_ => res.status(204).send())
                        .catch(err => res.status(405).json(err))            
                }
            })
            .catch(err => res.status(400).json(err)) 
    }
//-------------------------------------------------------------------------------------------------------------
   
    const buscaRecebimento = (req, res) => {
        app.db('recebimentos')
            .where({ recebimentos_id: req.params.recebimentos_id })
            .then(recebimentos => res.json(recebimentos))
            .catch(err => res.status(400).json(err))   }

//-------------------------------------------------------------------------------------------------------------


    return { getRecebimentos, saveRecebimentos, updateRecebimentos, buscaRecebimento }
}