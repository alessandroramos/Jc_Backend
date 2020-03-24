const moment = require('moment')

module.exports = app => {
    const getControle_furtos = (req, res) => {
        app.db('controle_furtos')
            .orderBy('controle_furtosDataCadastro')
            .then(controle_furtos => res.json(controle_furtos))
            .catch(err => res.status(400).json(err))
    }
//-----------------------------------------------------------------------------------------
    const saveControle_furtos = (req, res) => {  
        console.log(req.body)  
        app.db('controle_furtos')
            .insert(req.body)
            .returning('controle_furtos.controle_furtos_id')
            .then((controle_furtos_id) => res.json(controle_furtos_id[0]))
            .catch(err => res.status(403).json(err))
    }
//------------------------------------------------------------------------------------------------------
    const updateControle_furtos = (req, res ) => {
        app.db('controle_furtos')
            .where({ controle_furtos_id: req.body.controle_furtos_id})
            .first()
            .then(controle_furto => {
                if (!controle_furto) {
                    const msg = `controle_furto com id ${req.params.controle_furtos_id} não encontrada.`
                    return res.status(410).send(msg)
                }else{
                    app.db('controle_furtos')
                    .where({ controle_furtos_id: req.body.controle_furtos_id})
                    .update({   controle_furtosSetor: req.body.controle_furtosSetor,
                                controle_furtosProduto: req.body.controle_furtosProduto,
                                controle_furtosQuantidade: req.body.controle_furtosQuantidade,
                                controle_furtosPrevencao: req.body.controle_furtosPrevencao,
                                controle_furtosObservacao: req.body.controle_furtosObservacao,
                                controle_furtosDataUpdate: req.body.controle_furtosDataUpdate 
                            })
                        .then(_ => res.status(204).send())
                        .catch(err => res.status(405).json(err))            
                }
            })
            .catch(err => res.status(400).json(err)) 
    }
//-------------------------------------------------------------------------------------------------------------
   
    const buscaControle_furto = (req, res) => {
        app.db('controle_furtos')
            .where({ controle_furtos_id: req.params.controle_furtos_id })
            .then(controle_furtos => res.json(controle_furtos))
            .catch(err => res.status(400).json(err))   }

//-------------------------------------------------------------------------------------------------------------


    return { getControle_furtos, saveControle_furtos, updateControle_furtos, buscaControle_furto }
}