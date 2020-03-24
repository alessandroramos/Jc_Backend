const moment = require('moment')

module.exports = app => {
    const getEpis = (req, res) => {
        app.db('epis')
            .orderBy('episDataCadastro')
            .then(epis => res.json(epis))
            .catch(err => res.status(400).json(err))
    }
//-----------------------------------------------------------------------------------------
    const saveEpis = (req, res) => {  
        console.log(req.body)  
        app.db('epis')
            .insert(req.body)
            .returning('epis.epis_id')
            .then((epis_id) => res.json(epis_id[0]))
            .catch(err => res.status(403).json(err))
    }
//------------------------------------------------------------------------------------------------------
    const updateEpis = (req, res ) => {
        app.db('epis')
            .where({ epis_id: req.body.epis_id})
            .first()
            .then(epi => {
                if (!epi) {
                    const msg = `epi com id ${req.params.epis_id} não encontrada.`
                    return res.status(410).send(msg)
                }else{
                    app.db('epis')
                    .where({ epis_id: req.body.epis_id})
                    .update({   episSetor: req.body.episSetor,
                                episProduto: req.body.episProduto,
                                episQuantidade: req.body.episQuantidade,
                                episPrevencao: req.body.episPrevencao,
                                episObservacao: req.body.episObservacao,
                                episDataUpdate: req.body.episDataUpdate 
                            })
                        .then(_ => res.status(204).send())
                        .catch(err => res.status(405).json(err))            
                }
            })
            .catch(err => res.status(400).json(err)) 
    }
//-------------------------------------------------------------------------------------------------------------
   
    const buscaEpi = (req, res) => {
        app.db('epis')
            .where({ epis_id: req.params.epis_id })
            .then(epis => res.json(epis))
            .catch(err => res.status(400).json(err))   }

//-------------------------------------------------------------------------------------------------------------


    return { getEpis, saveEpis, updateEpis, buscaEpi }
}