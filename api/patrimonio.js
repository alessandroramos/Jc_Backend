const moment = require('moment')

module.exports = app => {
    const getPatrimonios = (req, res) => {
        app.db('patrimonios')
            .orderBy('patrimoniosDataCadastro')
            .then(patrimonios => res.json(patrimonios))
            .catch(err => res.status(400).json(err))
    }
//-----------------------------------------------------------------------------------------
    const savePatrimonios = (req, res) => {  
        console.log(req.body)  
        app.db('patrimonios')
            .insert(req.body)
            .returning('patrimonios.patrimonios_id')
            .then((patrimonios_id) => res.json(patrimonios_id[0]))
            .catch(err => res.status(403).json(err))
    }
//------------------------------------------------------------------------------------------------------
    const updatePatrimonios = (req, res ) => {
        app.db('patrimonios')
            .where({ patrimonios_id: req.body.patrimonios_id})
            .first()
            .then(patrimonio => {
                if (!patrimonio) {
                    const msg = `patrimonio com id ${req.params.patrimonios_id} não encontrada.`
                    return res.status(410).send(msg)
                }else{
                    app.db('patrimonios')
                    .where({ patrimonios_id: req.body.patrimonios_id})
                    .update({   patrimoniosSetor: req.body.patrimoniosSetor,
                                patrimoniosProduto: req.body.patrimoniosProduto,
                                patrimoniosQuantidade: req.body.patrimoniosQuantidade,
                                patrimoniosPrevencao: req.body.patrimoniosPrevencao,
                                patrimoniosObservacao: req.body.patrimoniosObservacao,
                                patrimoniosDataUpdate: req.body.patrimoniosDataUpdate 
                            })
                        .then(_ => res.status(204).send())
                        .catch(err => res.status(405).json(err))            
                }
            })
            .catch(err => res.status(400).json(err)) 
    }
//-------------------------------------------------------------------------------------------------------------
   
    const buscaPatrimonio = (req, res) => {
        app.db('patrimonios')
            .where({ patrimonios_id: req.params.patrimonios_id })
            .then(patrimonios => res.json(patrimonios))
            .catch(err => res.status(400).json(err))   }

//-------------------------------------------------------------------------------------------------------------


    return { getPatrimonios, savePatrimonios, updatePatrimonios, buscaPatrimonio }
}