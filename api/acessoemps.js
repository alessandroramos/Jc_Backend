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
        console.log(req.params.users_id+'||'+req.params.empresas_id)   
        const pkUserEmp = req.params.users_id+req.params.empresas_id
        acesE = {
            dataImplantação: new Date(),
            dataCadastro: new Date(),
            dataUpdateAE: new Date(),
            users_id: req.params.users_id,
            empresas_id: req.params.empresas_id,
            useEmp: pkUserEmp
        };
        console.log(pkUserEmp)
        app.db('acessoemps')
            .insert(acesE)
            .then(_ => res.status(204).send())
            .catch(err => res.status(401).json('Usuario com acesso a esta Empresa!'))                                             



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