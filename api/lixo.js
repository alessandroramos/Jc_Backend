const moment = require('moment')

module.exports = app => {
    const getLixos = (req, res) => {
        app.db('lixos')
            .orderBy('lixosDataCadastro', 'lixosHoraCadastro')
            .then(lixos => res.json(lixos))
            .catch(err => res.status(400).json(err))
    }
//-----------------------------------------------------------------------------------------
    const saveLixos = (req, res) => {    
        app.db('lixos')
            .insert(req.body)
            .returning('lixos.lixos_id')
            .then((lixos_id) => res.json(lixos_id[0]))
            .catch(err => res.status(403).json(err))
    }
//------------------------------------------------------------------------------------------------------
    const updateLixos = (req, res ) => {
        app.db('lixos')
            .where({ lixos_id: req.body.lixos_id})
            .first()
            .then(lixo => {
                if (!lixo) {
                    const msg = `lixo com id ${req.params.lixos_id} não encontrada.`
                    return res.status(410).send(msg)
                }else{
                    app.db('lixos')
                    .where({ lixos_id: req.body.lixos_id})
                    .update({   lixosSetor: req.body.lixosSetor,
                                lixosIrregularida: req.body.lixosIrregularida,
                                lixosPrevencao: req.body.lixosPrevencao,
                                lixosObservacao: req.body.lixosObservacao,
                                lixosDataUpdate: req.body.lixosDataUpdate 
                            })
                        .then(_ => res.status(204).send())
                        .catch(err => res.status(405).json(err))            
                }
            })
            .catch(err => res.status(400).json(err)) 
    }
//-------------------------------------------------------------------------------------------------------------
   
    const buscaLixo = (req, res) => {
        app.db('lixos')
            .where({ lixos_id: req.params.lixos_id })
            .then(lixos => res.json(lixos))
            .catch(err => res.status(400).json(err))   }

//-------------------------------------------------------------------------------------------------------------


    return { getLixos, saveLixos, updateLixos, buscaLixo }
}