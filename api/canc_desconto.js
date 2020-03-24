const moment = require('moment')

module.exports = app => {
    const getCanc_descontos = (req, res) => {
        app.db('canc_descontos')
            .orderBy('canc_descontosDataCadastro', 'canc_descontosHoraCadastro')
            .then(canc_descontos => res.json(canc_descontos))
            .catch(err => res.status(400).json(err))
    }
//-----------------------------------------------------------------------------------------
    const saveCanc_descontos = (req, res) => {  
        console.log(req.body)  
        app.db('canc_descontos')
            .insert(req.body)
            .returning('canc_descontos.canc_descontos_id')
            .then((canc_descontos_id) => res.json(canc_descontos_id[0]))
            .catch(err => res.status(403).json(err))
    }
//------------------------------------------------------------------------------------------------------
    const updateCanc_descontos = (req, res ) => {
        app.db('canc_descontos')
            .where({ canc_descontos_id: req.body.canc_descontos_id})
            .first()
            .then(canc_desconto => {
                if (!canc_desconto) {
                    const msg = `canc_desconto com id ${req.params.canc_descontos_id} não encontrada.`
                    return res.status(410).send(msg)
                }else{
                    app.db('canc_descontos')
                    .where({ canc_descontos_id: req.body.canc_descontos_id})
                    .update({   canc_descontosSetor: req.body.canc_descontosSetor,
                                canc_descontosProduto: req.body.canc_descontosProduto,
                                canc_descontosQuantidade: req.body.canc_descontosQuantidade,
                                canc_descontosPrevencao: req.body.canc_descontosPrevencao,
                                canc_descontosObservacao: req.body.canc_descontosObservacao,
                                canc_descontosDataUpdate: req.body.canc_descontosDataUpdate 
                            })
                        .then(_ => res.status(204).send())
                        .catch(err => res.status(405).json(err))            
                }
            })
            .catch(err => res.status(400).json(err)) 
    }
//-------------------------------------------------------------------------------------------------------------
   
    const buscaCanc_desconto = (req, res) => {
        app.db('canc_descontos')
            .where({ canc_descontos_id: req.params.canc_descontos_id })
            .then(canc_descontos => res.json(canc_descontos))
            .catch(err => res.status(400).json(err))   }

//-------------------------------------------------------------------------------------------------------------


    return { getCanc_descontos, saveCanc_descontos, updateCanc_descontos, buscaCanc_desconto }
}