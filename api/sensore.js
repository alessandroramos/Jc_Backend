const moment = require('moment')

module.exports = app => {
    const getSensores = (req, res) => {
        app.db('sensores')
            .orderBy('sensoresDataCadastro', 'sensoresHoraCadastro')
            .then(sensores => res.json(sensores))
            .catch(err => res.status(400).json(err))
    }
//-----------------------------------------------------------------------------------------
    const saveSensores = (req, res) => {    
        app.db('sensores')
            .insert(req.body)
            .returning('sensores.sensores_id')
            .then((sensores_id) => res.json(sensores_id[0]))
            .catch(err => res.status(403).json(err))
    }
//------------------------------------------------------------------------------------------------------
    const updateSensores = (req, res ) => {
        app.db('sensores')
            .where({ sensores_id: req.body.sensores_id})
            .first()
            .then(sensore => {
                if (!sensore) {
                    const msg = `sensore com id ${req.params.sensores_id} não encontrada.`
                    return res.status(410).send(msg)
                }else{
                    app.db('sensores')
                    .where({ sensores_id: req.body.sensores_id})
                    .update({   sensoresOperador: req.body.sensoresOperador,
                                sensoresValor: req.body.sensoresValor,
                                sensoresDifereca: req.body.sensoresDifereca,
                                sensoresDocOperador: req.body.sensoresDocOperador,
                                sensoresDocResponsavel: req.body.sensoresDocResponsavel,
                                sensoresDocPrevecao: req.body.sensoresDocPrevecao, 
                                sensoresObservacao: req.body.sensoresObservacao
                            })
                        .then(_ => res.status(204).send())
                        .catch(err => res.status(405).json(err))            
                }
            })
            .catch(err => res.status(400).json(err)) 
    }
//-------------------------------------------------------------------------------------------------------------
   
    const buscaSensore = (req, res) => {
        app.db('sensores')
            .where({ sensores_id: req.params.sensores_id })
            .then(sensores => res.json(sensores))
            .catch(err => res.status(400).json(err))   }

//-------------------------------------------------------------------------------------------------------------


    return { getSensores, saveSensores, updateSensores, buscaSensore }
}