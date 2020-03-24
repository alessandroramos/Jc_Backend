const moment = require('moment')

module.exports = app => {
    const getSangrias = (req, res) => {
        app.db('sangrias')
            .orderBy('sangriasDataCadastro')
            .then(sangrias => res.json(sangrias))
            .catch(err => res.status(400).json(err))
    }
//-----------------------------------------------------------------------------------------
    const saveSangrias = (req, res) => {  
        console.log(req.body)  
        app.db('sangrias')
            .insert(req.body)
            .returning('sangrias.sangrias_id')
            .then((sangrias_id) => res.json(sangrias_id[0]))
            .catch(err => res.status(403).json(err))
    }
//------------------------------------------------------------------------------------------------------
    const updateSangrias = (req, res ) => {
        app.db('sangrias')
            .where({ sangrias_id: req.body.sangrias_id})
            .first()
            .then(sangria => {
                if (!sangria) {
                    const msg = `sangria com id ${req.params.sangrias_id} não encontrada.`
                    return res.status(410).send(msg)
                }else{
                    app.db('sangrias')
                    .where({ sangrias_id: req.body.sangrias_id})
                    .update({   sangriasSetor: req.body.sangriasSetor,
                                sangriasProduto: req.body.sangriasProduto,
                                sangriasQuantidade: req.body.sangriasQuantidade,
                                sangriasPrevencao: req.body.sangriasPrevencao,
                                sangriasObservacao: req.body.sangriasObservacao,
                                sangriasDataUpdate: req.body.sangriasDataUpdate 
                            })
                        .then(_ => res.status(204).send())
                        .catch(err => res.status(405).json(err))            
                }
            })
            .catch(err => res.status(400).json(err)) 
    }
//-------------------------------------------------------------------------------------------------------------
   
    const buscaSangria = (req, res) => {
        app.db('sangrias')
            .where({ sangrias_id: req.params.sangrias_id })
            .then(sangrias => res.json(sangrias))
            .catch(err => res.status(400).json(err))   }

//-------------------------------------------------------------------------------------------------------------


    return { getSangrias, saveSangrias, updateSangrias, buscaSangria }
}