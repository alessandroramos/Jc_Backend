const moment = require('moment')

module.exports = app => {
    const getGeradores = (req, res) => {
        app.db('geradores')
            .orderBy('geradoresDataCadastro', 'geradoresHoraCadastro')
            .then(geradores => res.json(geradores))
            .catch(err => res.status(400).json(err))
    }
//-----------------------------------------------------------------------------------------
    const saveGeradores = (req, res) => {    
        app.db('geradores')
            .insert(req.body)
            .returning('geradores.geradores_id')
            .then((geradores_id) => res.json(geradores_id[0]))
            .catch(err => res.status(403).json(err))
    }
//------------------------------------------------------------------------------------------------------
    const updateGeradores = (req, res ) => {
        app.db('geradores')
            .where({ geradores_id: req.body.geradores_id})
            .first()
            .then(geradore => {
                if (!geradore) {
                    const msg = `geradore com id ${req.params.geradores_id} não encontrada.`
                    return res.status(410).send(msg)
                }else{
                    app.db('geradores')
                    .where({ geradores_id: req.body.geradores_id})
                    .update({   geradoresOperador: req.body.geradoresOperador,
                                geradoresValor: req.body.geradoresValor,
                                geradoresDifereca: req.body.geradoresDifereca,
                                geradoresDocOperador: req.body.geradoresDocOperador,
                                geradoresDocResponsavel: req.body.geradoresDocResponsavel,
                                geradoresDocPrevecao: req.body.geradoresDocPrevecao, 
                                geradoresObservacao: req.body.geradoresObservacao
                            })
                        .then(_ => res.status(204).send())
                        .catch(err => res.status(405).json(err))            
                }
            })
            .catch(err => res.status(400).json(err)) 
    }
//-------------------------------------------------------------------------------------------------------------
   
    const buscaGeradore = (req, res) => {
        app.db('geradores')
            .where({ geradores_id: req.params.geradores_id })
            .then(geradores => res.json(geradores))
            .catch(err => res.status(400).json(err))   }

//-------------------------------------------------------------------------------------------------------------


    return { getGeradores, saveGeradores, updateGeradores, buscaGeradore }
}