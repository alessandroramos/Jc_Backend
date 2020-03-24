const moment = require('moment')

module.exports = app => {
    const getTesourarias = (req, res) => {
        app.db('tesourarias')
            .orderBy('tesourariasDataCadastro')
            .then(tesourarias => res.json(tesourarias))
            .catch(err => res.status(400).json(err))
    }
//-----------------------------------------------------------------------------------------
    const saveTesourarias = (req, res) => {  
        console.log(req.body)  
        app.db('tesourarias')
            .insert(req.body)
            .returning('tesourarias.tesourarias_id')
            .then((tesourarias_id) => res.json(tesourarias_id[0]))
            .catch(err => res.status(403).json(err))
    }
//------------------------------------------------------------------------------------------------------
    const updateTesourarias = (req, res ) => {
        app.db('tesourarias')
            .where({ tesourarias_id: req.body.tesourarias_id})
            .first()
            .then(tesouraria => {
                if (!tesouraria) {
                    const msg = `tesouraria com id ${req.params.tesourarias_id} não encontrada.`
                    return res.status(410).send(msg)
                }else{
                    app.db('tesourarias')
                    .where({ tesourarias_id: req.body.tesourarias_id})
                    .update({   tesourariasSetor: req.body.tesourariasSetor,
                                tesourariasProduto: req.body.tesourariasProduto,
                                tesourariasQuantidade: req.body.tesourariasQuantidade,
                                tesourariasPrevencao: req.body.tesourariasPrevencao,
                                tesourariasObservacao: req.body.tesourariasObservacao,
                                tesourariasDataUpdate: req.body.tesourariasDataUpdate 
                            })
                        .then(_ => res.status(204).send())
                        .catch(err => res.status(405).json(err))            
                }
            })
            .catch(err => res.status(400).json(err)) 
    }
//-------------------------------------------------------------------------------------------------------------
   
    const buscaTesouraria = (req, res) => {
        app.db('tesourarias')
            .where({ tesourarias_id: req.params.tesourarias_id })
            .then(tesourarias => res.json(tesourarias))
            .catch(err => res.status(400).json(err))   }

//-------------------------------------------------------------------------------------------------------------


    return { getTesourarias, saveTesourarias, updateTesourarias, buscaTesouraria }
}