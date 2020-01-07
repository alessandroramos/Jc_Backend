const moment = require('moment')

module.exports = app => {
    const getSelos = (req, res) => {
        app.db('selos')
            .orderBy('selosDataCadastro', 'selosHoraCadastro')
            .then(selos => res.json(selos))
            .catch(err => res.status(400).json(err))
    }
//-----------------------------------------------------------------------------------------
    const saveSelos = (req, res) => {       
                
        app.db('selos')
            .insert(req.body)
            .then(_ => res.status(204).send())
            .catch(err => res.status(401).json(err))
    }
//------------------------------------------------------------------------------------------------------
    const updateSelos = (req, res ) => {
        app.db('selos')
            .where({ selos_id: req.body.selos_id})
            .first()
            .then(selo => {
                if (!selo) {
                    const msg = `selo com id ${req.params.selos_id} não encontrada.`
                    return res.status(400).send(msg)
                }else{
                    app.db('selos')
                    .where({ selos_id: req.body.selos_id})
                    .update({   selosSetor: req.body.selosSetor,
                                selosProduto: req.body.selosProduto,
                                selosQuantidade: req.body.selosQuantidade,
                                selosPrevencao: req.body.selosPrevencao,
                                selosObservacao: req.body.selosObservacao,
                                selosDataUpdate: new Data(),
                                selosHoraUpdate: new Time() })
                        .then(_ => res.status(204).send())
                        .catch(err => res.status(400).json(err))            
                }
            })
            .catch(err => res.status(400).json(err)) 
    }
//-------------------------------------------------------------------------------------------------------------
   
    const buscaSelo = (req, res) => {
        app.db('selos')
            .where({ selos_id: req.params.selos_id })
            .then(selos => res.json(selos))
            .catch(err => res.status(400).json(err))   }

//-------------------------------------------------------------------------------------------------------------


    return { getSelos, saveSelos, updateSelos, buscaSelo }
}