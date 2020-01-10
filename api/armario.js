const moment = require('moment')

module.exports = app => {
    const getArmarios = (req, res) => {
        app.db('armarios')
            .orderBy('armariosDataCadastro', 'armariosHoraCadastro')
            .then(armarios => res.json(armarios))
            .catch(err => res.status(400).json(err))
    }
//-----------------------------------------------------------------------------------------
    const saveArmarios = (req, res) => {    
        app.db('armarios')
            .insert(req.body)
            .returning('armarios.armarios_id')
            .then((armarios_id) => res.json(armarios_id[0]))
            .catch(err => res.status(403).json(err))
    }
//------------------------------------------------------------------------------------------------------
    const updateArmarios = (req, res ) => {
        app.db('armarios')
            .where({ armarios_id: req.body.armarios_id})
            .first()
            .then(armario => {
                if (!armario) {
                    const msg = `armario com id ${req.params.armarios_id} não encontrada.`
                    return res.status(410).send(msg)
                }else{
                    app.db('armarios')
                    .where({ armarios_id: req.body.armarios_id})
                    .update({   armariosIdentificador: req.body.armariosIdentificador,
                                armariosColaborador: req.body.armariosColaborador,
                                armariosDocColaborador: req.body.armariosDocColaborador,
                                armariosPrevencao: req.body.armariosPrevencao
                            })
                        .then(_ => res.status(204).send())
                        .catch(err => res.status(405).json(err))            
                }
            })
            .catch(err => res.status(400).json(err)) 
    }
//-------------------------------------------------------------------------------------------------------------
   
    const buscaArmario = (req, res) => {
        app.db('armarios')
            .where({ armarios_id: req.params.armarios_id })
            .then(armarios => res.json(armarios))
            .catch(err => res.status(400).json(err))   }

//-------------------------------------------------------------------------------------------------------------


    return { getArmarios, saveArmarios, updateArmarios, buscaArmario }
}