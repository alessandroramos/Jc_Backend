const moment = require('moment')

module.exports = app => {
    const getAcessos = (req, res) => {
//        console.log('Inicio getAcessos')
        app.db('sistemas')
            .where({ sistemas_codigo: req.params.sistemaId})
            .first()
            .then(sistema => {
                if (!sistema) {
                    const msg = `Sistema com id ${req.params.sistemas_id} não encontrada.`
                    return res.status(403).send(msg)
                }
//                console.log(req.params.userId)
                app.db('acessos')
                    .where({ sistemaId: sistema.sistemas_id,  userId: req.params.userId})
                    .orderBy('sistemaId')
//                    console.log('Quantidade de Registros de acesso'+acessos.length)
                    .then(acessos => res.json(acessos))
                    .catch(err => res.status(410).json(err)) 
                })
            .catch(err => res.status(405).json(err))
//            console.log('Fim getAcessos')

    }

    const addAcessos = (req, res) => {       
        app.db('sistemas')
            .where({ sistemas_codigo: req.params.sistemaId})
            .first()
            .then(sistema => {
                if (!sistema) {
                    const msg = `Sistema com id ${req.params.sistemas_id} não encontrada.`
                    return res.status(403).send(msg)
                }else{
                    app.db('rotinas')
                        .where({ sistema_id: sistema.sistemas_id })
                        .then(rotina => {
                            if (!rotina) {
                                const msg = `Rotinas com codigo ${req.params.rotinas_id} não encontrada.`
                                return res.status(433).send(msg)
                            }else{
                                for(i=0; i < rotina.length;i++){
                                    console.log(i)
                                    pkUseSisRot = req.params.userId+sistema.sistemas_id+rotina[i].rotinas_id
                                    console.log(pkUseSisRot)
                                    aces = {
                                        dataImplantação: new Date(),
                                        dataCadastro: new Date(),
                                        dataUpdateA: new Date(),
                                        userId: req.params.userId,
                                        sistemaId: sistema.sistemas_id,
                                        rotinaId: rotina[i].rotinas_id,
                                        useSisRot: pkUseSisRot
                                    };
                                    console.log(aces.sistemaId+'||'+aces.userId+'||'+aces.rotinaId)
                                    app.db('acessos')
                                        .insert(aces)
                                        .catch(() => {})                                             
                                }
                                app.db('acessos')
                                    .where({ sistemaId: sistema.sistemas_id,  userId: req.params.userId})
                                    .orderBy('sistemaId')
                                    .then(acessos => res.json(acessos))
                                    .catch(err => res.status(410).json(err)) 
                            }        
                        })
                        .catch(err => res.status(402).json(err))
                }  
            })
            .catch(err => res.status(410).json(err))  
//            console.log('registro AGR')
    }

//-------------------------------------------------------------------------------    
    const cancelaAcesso = (req, res) => {
        app.db('acessos')
            .where({ acessos_id: req.params.acessos_id })
            .first()
            .then(acesso => {
                if (!acesso) {
                    const msg = `acesso com id ${req.params.acessos_id} não encontrada.`
                    return res.status(400).send(msg)
                }

                const dataCancelA = acessos.dataCancelA ? null : new Date()
                updateAcessodataCancelA(req, res, dataCancelA)
            })
            .catch(err => res.status(400).json(err))
    }
    const updateAcessodataCancelA = (req, res, dataCancelA) => {
        app.db('acessos')
            .where({ acessos_id: req.params.acessos_id })
            .update({ dataCancelA })
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }
//-----------------------------------------------------------------------------------------------------    
    
    return { getAcessos, addAcessos, cancelaAcesso }

}