const moment = require('moment')

module.exports = app => {
    const getMalote_trocos = (req, res) => {
        app.db('malote_trocos')
            .orderBy('malote_trocosDataCadastro', 'malote_trocosHoraCadastro')
            .then(malote_trocos => res.json(malote_trocos))
            .catch(err => res.status(400).json(err))
    }
//-----------------------------------------------------------------------------------------
    const saveMalote_trocos = (req, res) => {    
        app.db('malote_trocos')
            .insert(req.body)
            .returning('malote_trocos.malote_trocos_id')
            .then((malote_trocos_id) => res.json(malote_trocos_id[0]))
            .catch(err => res.status(403).json(err))
    }
//------------------------------------------------------------------------------------------------------
    const updateMalote_trocos = (req, res ) => {
        app.db('malote_trocos')
            .where({ malote_trocos_id: req.body.malote_trocos_id})
            .first()
            .then(malote_troco => {
                if (!malote_troco) {
                    const msg = `malote_troco com id ${req.params.malote_trocos_id} não encontrada.`
                    return res.status(410).send(msg)
                }else{
                    app.db('malote_trocos')
                    .where({ malote_trocos_id: req.body.malote_trocos_id})
                    .update({   malote_trocosOperador: req.body.malote_trocosOperador,
                                malote_trocosValor: req.body.malote_trocosValor,
                                malote_trocosDocOperador: req.body.malote_trocosDocOperador,
                                malote_trocosResponsavel: req.body.malote_trocosResponsavel,
                                malote_trocosObservacao: req.body.malote_trocosObservacao
                            })
                        .then(_ => res.status(204).send())
                        .catch(err => res.status(405).json(err))            
                }
            })
            .catch(err => res.status(400).json(err)) 
    }
//-------------------------------------------------------------------------------------------------------------
   
    const buscaMalote_troco = (req, res) => {
        app.db('malote_trocos')
            .where({ malote_trocos_id: req.params.malote_trocos_id })
            .then(malote_trocos => res.json(malote_trocos))
            .catch(err => res.status(400).json(err))   }

//-------------------------------------------------------------------------------------------------------------


    return { getMalote_trocos, saveMalote_trocos, updateMalote_trocos, buscaMalote_troco }
}