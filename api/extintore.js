const moment = require('moment')

module.exports = app => {
    const getExtintores = (req, res) => {
        app.db('extintores')
            .orderBy('extintoresDataCadastro', 'extintoresHoraCadastro')
            .then(extintores => res.json(extintores))
            .catch(err => res.status(400).json(err))
    }
//-----------------------------------------------------------------------------------------
    const saveExtintores = (req, res) => {    
        app.db('extintores')
            .insert(req.body)
            .returning('extintores.extintores_id')
            .then((extintores_id) => res.json(extintores_id[0]))
            .catch(err => res.status(403).json(err))
    }
//------------------------------------------------------------------------------------------------------
    const updateExtintores = (req, res ) => {
        app.db('extintores')
            .where({ extintores_id: req.body.extintores_id})
            .first()
            .then(extintore => {
                if (!extintore) {
                    const msg = `extintore com id ${req.params.extintores_id} não encontrada.`
                    return res.status(410).send(msg)
                }else{
                    app.db('extintores')
                    .where({ extintores_id: req.body.extintores_id})
                    .update({   extintoresOperador: req.body.extintoresOperador,
                                extintoresValor: req.body.extintoresValor,
                                extintoresDifereca: req.body.extintoresDifereca,
                                extintoresDocOperador: req.body.extintoresDocOperador,
                                extintoresDocResponsavel: req.body.extintoresDocResponsavel,
                                extintoresDocPrevecao: req.body.extintoresDocPrevecao, 
                                extintoresObservacao: req.body.extintoresObservacao
                            })
                        .then(_ => res.status(204).send())
                        .catch(err => res.status(405).json(err))            
                }
            })
            .catch(err => res.status(400).json(err)) 
    }
//-------------------------------------------------------------------------------------------------------------
   
    const buscaExtintore = (req, res) => {
        app.db('extintores')
            .where({ extintores_id: req.params.extintores_id })
            .then(extintores => res.json(extintores))
            .catch(err => res.status(400).json(err))   }

//-------------------------------------------------------------------------------------------------------------


    return { getExtintores, saveExtintores, updateExtintores, buscaExtintore }
}