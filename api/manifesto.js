const moment = require('moment')

module.exports = app => {
    const getManifestos = (req, res) => {
        app.db('manifestos')
            .orderBy('manifestosDataCadastro')
            .then(manifestos => res.json(manifestos))
            .catch(err => res.status(400).json(err))
    }
//-----------------------------------------------------------------------------------------
    const saveManifestos = (req, res) => {  
        console.log(req.body)  
        app.db('manifestos')
            .insert(req.body)
            .returning('manifestos.manifestos_id')
            .then((manifestos_id) => res.json(manifestos_id[0]))
            .catch(err => res.status(403).json(err))
    }
//------------------------------------------------------------------------------------------------------
    const updateManifestos = (req, res ) => {
        app.db('manifestos')
            .where({ manifestos_id: req.body.manifestos_id})
            .first()
            .then(manifesto => {
                if (!manifesto) {
                    const msg = `manifesto com id ${req.params.manifestos_id} não encontrada.`
                    return res.status(410).send(msg)
                }else{
                    app.db('manifestos')
                    .where({ manifestos_id: req.body.manifestos_id})
                    .update({   manifestosSetor: req.body.manifestosSetor,
                                manifestosProduto: req.body.manifestosProduto,
                                manifestosQuantidade: req.body.manifestosQuantidade,
                                manifestosPrevencao: req.body.manifestosPrevencao,
                                manifestosObservacao: req.body.manifestosObservacao,
                                manifestosDataUpdate: req.body.manifestosDataUpdate 
                            })
                        .then(_ => res.status(204).send())
                        .catch(err => res.status(405).json(err))            
                }
            })
            .catch(err => res.status(400).json(err)) 
    }
//-------------------------------------------------------------------------------------------------------------
   
    const buscaManifesto = (req, res) => {
        app.db('manifestos')
            .where({ manifestos_id: req.params.manifestos_id })
            .then(manifestos => res.json(manifestos))
            .catch(err => res.status(400).json(err))   }

//-------------------------------------------------------------------------------------------------------------


    return { getManifestos, saveManifestos, updateManifestos, buscaManifesto }
}