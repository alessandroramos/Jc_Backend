const moment = require('moment')

module.exports = app => {
    const getControle_descontos = (req, res) => {
        app.db('controle_descontos')
            .orderBy('controle_descontosDataCadastro')
            .then(controle_descontos => res.json(controle_descontos))
            .catch(err => res.status(400).json(err))
    }
//-----------------------------------------------------------------------------------------
    const saveControle_descontos = (req, res) => {  
        console.log(req.body)  
        app.db('controle_descontos')
            .insert(req.body)
            .returning('controle_descontos.controle_descontos_id')
            .then((controle_descontos_id) => res.json(controle_descontos_id[0]))
            .catch(err => res.status(403).json(err))
    }
//------------------------------------------------------------------------------------------------------
    const updateControle_descontos = (req, res ) => {
        app.db('controle_descontos')
            .where({ controle_descontos_id: req.body.controle_descontos_id})
            .first()
            .then(controle_desconto => {
                if (!controle_desconto) {
                    const msg = `controle_desconto com id ${req.params.controle_descontos_id} não encontrada.`
                    return res.status(410).send(msg)
                }else{
                    app.db('controle_descontos')
                    .where({ controle_descontos_id: req.body.controle_descontos_id})
                    .update({   controle_descontosSetor: req.body.controle_descontosSetor,
                                controle_descontosProduto: req.body.controle_descontosProduto,
                                controle_descontosQuantidade: req.body.controle_descontosQuantidade,
                                controle_descontosPrevencao: req.body.controle_descontosPrevencao,
                                controle_descontosObservacao: req.body.controle_descontosObservacao,
                                controle_descontosDataUpdate: req.body.controle_descontosDataUpdate 
                            })
                        .then(_ => res.status(204).send())
                        .catch(err => res.status(405).json(err))            
                }
            })
            .catch(err => res.status(400).json(err)) 
    }
//-------------------------------------------------------------------------------------------------------------
   
    const buscaControle_desconto = (req, res) => {
        app.db('controle_descontos')
            .where({ controle_descontos_id: req.params.controle_descontos_id })
            .then(controle_descontos => res.json(controle_descontos))
            .catch(err => res.status(400).json(err))   }

//-------------------------------------------------------------------------------------------------------------


    return { getControle_descontos, saveControle_descontos, updateControle_descontos, buscaControle_desconto }
}