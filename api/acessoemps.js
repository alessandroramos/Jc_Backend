const moment = require('moment')

module.exports = app => {
    const getAcessoemps = (req, res) => {
//        console.log('teste'+req.params)
        app.db('acessoemps')
            .innerJoin('empresas', 'acessoemps.empresas_id', 'empresas.empresas_id')
            .where({ users_id: req.params.users_id})
            .orderBy('fantasia')
            .then(acessoemps => res.json(acessoemps))
            .catch(err => res.status(410).json(err)) 
    }

    //-----------------------------------------------------------------------------------------------

    const addAcessoemps = (req, res) => { 
        console.log()      
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
    }
//-------------------------------------------------------------------------------    
    const cancelaAcessoemps = (req, res) => {
        app.db('acessos')
            .where({ acessos_id: req.params.acessos_id })
            .first()
            .then(acessos => {
                if (!acessos) {
                    const msg = `acesso com id ${req.params.acessos_id} não encontrada.`
                    return res.status(400).send(msg)
                }
            const updateAcessoempdataCancelAE = acessos.updateAcessoempdataCancelAE ? null : new Date()
            updateAcessoempupdateAcessoempdataCancelAE(req, res, updateAcessoempdataCancelAE)
            })
            .catch(err => res.status(400).json(err))
    }
    const updateAcessoempupdateAcessoempdataCancelAE = (req, res, updateAcessoempdataCancelAE) => {
        app.db('acessos')
            .where({ acessos_id: req.params.acessos_id })
            .update({ updateAcessoempdataCancelAE })
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }
//------------------------------------------------------------------------------- 
    return { getAcessoemps, addAcessoemps, cancelaAcessoemps }
}