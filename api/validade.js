const moment = require('moment')

module.exports = app => {
    const getValidades = (req, res) => {
        app.db('validades')
            .orderBy('validadesDataCadastro', 'validadesHoraCadastro')
            .then(validades => res.json(validades))
            .catch(err => res.status(400).json(err))
    }
//-----------------------------------------------------------------------------------------
    const saveValidades = (req, res) => {    
        app.db('validades')
            .insert(req.body)
            .returning('validades.validades_id')
            .then((validades_id) => res.json(validades_id[0]))
            .catch(err => res.status(403).json(err))
    }
//------------------------------------------------------------------------------------------------------
    const updateValidades = (req, res ) => {
        app.db('validades')
            .where({ validades_id: req.body.validades_id})
            .first()
            .then(validade => {
                if (!validade) {
                    const msg = `validade com id ${req.params.validades_id} não encontrada.`
                    return res.status(410).send(msg)
                }else{
                    app.db('validades')
                    .where({ validades_id: req.body.validades_id})
                    .update({   validadesOperador: req.body.validadesOperador,
                                validadesValor: req.body.validadesValor,
                                validadesDifereca: req.body.validadesDifereca,
                                validadesDocOperador: req.body.validadesDocOperador,
                                validadesDocResponsavel: req.body.validadesDocResponsavel,
                                validadesDocPrevecao: req.body.validadesDocPrevecao, 
                                validadesObservacao: req.body.validadesObservacao
                            })
                        .then(_ => res.status(204).send())
                        .catch(err => res.status(405).json(err))            
                }
            })
            .catch(err => res.status(400).json(err)) 
    }
//-------------------------------------------------------------------------------------------------------------
   
    const buscaValidade = (req, res) => {
        app.db('validades')
            .where({ validades_id: req.params.validades_id })
            .then(validades => res.json(validades))
            .catch(err => res.status(400).json(err))   }

//-------------------------------------------------------------------------------------------------------------


    return { getValidades, saveValidades, updateValidades, buscaValidade }
}