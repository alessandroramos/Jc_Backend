const moment = require('moment')

module.exports = app => {
    const getTemperaturas = (req, res) => {
        app.db('temperaturas')
            .orderBy('temperaturasDataCadastro')
            .then(temperaturas => res.json(temperaturas))
            .catch(err => res.status(400).json(err))
    }
//-----------------------------------------------------------------------------------------
    const saveTemperaturas = (req, res) => {  
        console.log(req.body)  
        app.db('temperaturas')
            .insert(req.body)
            .returning('temperaturas.temperaturas_id')
            .then((temperaturas_id) => res.json(temperaturas_id[0]))
            .catch(err => res.status(403).json(err))
    }
//------------------------------------------------------------------------------------------------------
    const updateTemperaturas = (req, res ) => {
        app.db('temperaturas')
            .where({ temperaturas_id: req.body.temperaturas_id})
            .first()
            .then(temperatura => {
                if (!temperatura) {
                    const msg = `temperatura com id ${req.params.temperaturas_id} não encontrada.`
                    return res.status(410).send(msg)
                }else{
                    app.db('temperaturas')
                    .where({ temperaturas_id: req.body.temperaturas_id})
                    .update({   temperaturasSetor: req.body.temperaturasSetor,
                                temperaturasProduto: req.body.temperaturasProduto,
                                temperaturasQuantidade: req.body.temperaturasQuantidade,
                                temperaturasPrevencao: req.body.temperaturasPrevencao,
                                temperaturasObservacao: req.body.temperaturasObservacao,
                                temperaturasDataUpdate: req.body.temperaturasDataUpdate 
                            })
                        .then(_ => res.status(204).send())
                        .catch(err => res.status(405).json(err))            
                }
            })
            .catch(err => res.status(400).json(err)) 
    }
//-------------------------------------------------------------------------------------------------------------
   
    const buscaTemperatura = (req, res) => {
        app.db('temperaturas')
            .where({ temperaturas_id: req.params.temperaturas_id })
            .then(temperaturas => res.json(temperaturas))
            .catch(err => res.status(400).json(err))   }

//-------------------------------------------------------------------------------------------------------------


    return { getTemperaturas, saveTemperaturas, updateTemperaturas, buscaTemperatura }
}