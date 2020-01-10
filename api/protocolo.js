const moment = require('moment')

module.exports = app => {
    const getProtocolos = (req, res) => {
        app.db('protocolos')
            .orderBy('protocolosDataCadastro', 'protocolosHoraCadastro')
            .then(protocolos => res.json(protocolos))
            .catch(err => res.status(400).json(err))
    }
//-----------------------------------------------------------------------------------------
    const saveProtocolos = (req, res) => {    
        app.db('protocolos')
            .insert(req.body)
            .returning('protocolos.protocolos_id')
            .then((protocolos_id) => res.json(protocolos_id[0]))
            .catch(err => res.status(403).json(err))
    }
//------------------------------------------------------------------------------------------------------
    const updateProtocolos = (req, res ) => {
        app.db('protocolos')
            .where({ protocolos_id: req.body.protocolos_id})
            .first()
            .then(protocolo => {
                if (!protocolo) {
                    const msg = `protocolo com id ${req.params.protocolos_id} não encontrada.`
                    return res.status(410).send(msg)
                }else{
                    app.db('protocolos')
                    .where({ protocolos_id: req.body.protocolos_id})
                    .update({protocolosLacre: req.body.protocolosLacre,
                                protocolosDocEqui: req.body.protocolosDocEqui,
                                protocolosMotorista: req.body.protocolosMotorista,
                                protocolosDocMotorista: req.body.protocolosDocMotorista,
                                protocolosrecebimento: req.body.protocolosrecebimento,
                                protocolosExpedicao: req.body.protocolosExpedicao, 
                                protocolosPrevencao: req.body.protocolosPrevencao
                            })
                        .then(_ => res.status(204).send())
                        .catch(err => res.status(405).json(err))            
                }
            })
            .catch(err => res.status(400).json(err)) 
    }
//-------------------------------------------------------------------------------------------------------------
   
    const buscaProtocolo = (req, res) => {
        app.db('protocolos')
            .where({ protocolos_id: req.params.protocolos_id })
            .then(protocolos => res.json(protocolos))
            .catch(err => res.status(400).json(err))   }

//-------------------------------------------------------------------------------------------------------------


    return { getProtocolos, saveProtocolos, updateProtocolos, buscaProtocolo }
}