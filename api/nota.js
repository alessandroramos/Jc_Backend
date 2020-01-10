const moment = require('moment')

module.exports = app => {
    const getNotas = (req, res) => {
        app.db('notas')
            .orderBy('notasDataCadastro', 'notasHoraCadastro')
            .then(notas => res.json(notas))
            .catch(err => res.status(400).json(err))
    }
//-----------------------------------------------------------------------------------------
    const saveNotas = (req, res) => {    
        app.db('notas')
            .insert(req.body)
            .returning('notas.notas_id')
            .then((notas_id) => res.json(notas_id[0]))
            .catch(err => res.status(403).json(err))
    }
//------------------------------------------------------------------------------------------------------
    const updateNotas = (req, res ) => {
        app.db('notas')
            .where({ notas_id: req.body.notas_id})
            .first()
            .then(nota => {
                if (!nota) {
                    const msg = `nota com id ${req.params.notas_id} não encontrada.`
                    return res.status(410).send(msg)
                }else{
                    app.db('notas')
                    .where({ notas_id: req.body.notas_id})
                    .update({   notasNumero: req.body.notasNumero,
                                notasObs: req.body.notasObs,
                                notasQuantidade: req.body.notasQuantidade,
                                notasPrevencao: req.body.notasPrevencao,
                                notasObservacao: req.body.notasObservacao,
                                notasDataUpdate: req.body.notasDataUpdate, 
                                notasResponsavel: req.body.notasResponsavel
                            })
                        .then(_ => res.status(204).send())
                        .catch(err => res.status(405).json(err))            
                }
            })
            .catch(err => res.status(400).json(err)) 
    }
//-------------------------------------------------------------------------------------------------------------
   
    const buscaNota = (req, res) => {
        app.db('notas')
            .where({ notas_id: req.params.notas_id })
            .then(notas => res.json(notas))
            .catch(err => res.status(400).json(err))   }

//-------------------------------------------------------------------------------------------------------------


    return { getNotas, saveNotas, updateNotas, buscaNota }
}