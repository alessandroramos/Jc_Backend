const moment = require('moment')

module.exports = app => {
    const getComodatos = (req, res) => {
        app.db('comodatos')
            .orderBy('comodatosDataCadastro')
            .then(comodatos => res.json(comodatos))
            .catch(err => res.status(400).json(err))
    }
//-----------------------------------------------------------------------------------------
    const saveComodatos = (req, res) => {  
        console.log(req.body)  
        app.db('comodatos')
            .insert(req.body)
            .returning('comodatos.comodatos_id')
            .then((comodatos_id) => res.json(comodatos_id[0]))
            .catch(err => res.status(403).json(err))
    }
//------------------------------------------------------------------------------------------------------
    const updateComodatos = (req, res ) => {
        app.db('comodatos')
            .where({ comodatos_id: req.body.comodatos_id})
            .first()
            .then(comodato => {
                if (!comodato) {
                    const msg = `comodato com id ${req.params.comodatos_id} não encontrada.`
                    return res.status(410).send(msg)
                }else{
                    app.db('comodatos')
                    .where({ comodatos_id: req.body.comodatos_id})
                    .update({   comodatosSetor: req.body.comodatosSetor,
                                comodatosProduto: req.body.comodatosProduto,
                                comodatosQuantidade: req.body.comodatosQuantidade,
                                comodatosPrevencao: req.body.comodatosPrevencao,
                                comodatosObservacao: req.body.comodatosObservacao,
                                comodatosDataUpdate: req.body.comodatosDataUpdate 
                            })
                        .then(_ => res.status(204).send())
                        .catch(err => res.status(405).json(err))            
                }
            })
            .catch(err => res.status(400).json(err)) 
    }
//-------------------------------------------------------------------------------------------------------------
   
    const buscaComodato = (req, res) => {
        app.db('comodatos')
            .where({ comodatos_id: req.params.comodatos_id })
            .then(comodatos => res.json(comodatos))
            .catch(err => res.status(400).json(err))   }

//-------------------------------------------------------------------------------------------------------------


    return { getComodatos, saveComodatos, updateComodatos, buscaComodato }
}