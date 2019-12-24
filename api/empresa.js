const moment = require('moment')

module.exports = app => {
    const getEmpresas = (req, res) => {
        app.db('empresas')
            .orderBy('fantasia')
            .then(empresas => res.json(empresas))
            .catch(err => res.status(400).json(err))
    }
//-----------------------------------------------------------------------------------------
    const saveEmpresas = (req, res) => {
        if (!req.body.razao.trim()) {
            return res.status(400).send('Razao Social é um campo obrigatório')
        }
        if (!req.body.cnpj.trim()) {
            return res.status(400).send('CNPJ é um campo obrigatório')
        }
        if (!req.body.dataAbertura) {
            return res.status(400).send('Data de Abertura é um campo obrigatório')
        }
        if (!req.body.mail.trim()) {
            return res.status(400).send('Email é um campo obrigatório')
        }
        
                
        app.db('empresas')
            .insert(req.body)
            .then(_ => res.status(204).send())
            .catch(err => res.status(401).json(err))
    }
//-------------------------------------------------------------------------------------------------------------
    const removeEmpresas = (req, res) => {
        app.db('empresas')
            .where({ empresas_id: req.params.empresas_id })
            .first()
            .then(empresa => {
                if (!empresa) {
                    const msg = `empresa com id ${req.params.empresas_id} não encontrada.`
                    return res.status(400).send(msg)
                }

                const dataCancelE = empresa.dataCancelE ? null : new Date()
                updateEmpresadataCancelE(req, res, dataCancelE)
            })
            .catch(err => res.status(400).json(err))
    }

    const updateEmpresadataCancelE = (req, res, dataCancelE) => {
        app.db('empresas')
            .where({ empresas_id: req.params.empresas_id })
            .update({ dataCancelE })
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

//------------------------------------------------------------------------------------------------------
    const updateEmpresas = (req, res ) => {
        app.db('empresas')
            .where({ cnpj: req.body.cnpj})
            .first()
            .then(empresa => {
                if (!empresa) {
                    const msg = `empresa com id ${req.params.empresas_id} não encontrada.`
                    return res.status(400).send(msg)
                }else{
                    app.db('empresas')
                        .where({ cnpj: req.body.cnpj})
                        .update({razao: req.body.razao, 
                                fantasia: req.body.fantasia,
                                dataAbertura: req.body.dataAbertura,
                                dodataEncerramentone: req.body.dodataEncerramentone,
                                dataUpdate: req.body.dataUpdate,
                                dataCancelE: req.body.dataCancelE,
                                logradoro: req.body.logradoro,
                                numero: req.body.numero,
                                bairro: req.body.bairro,
                                cidade: req.body.cidade,
                                cep: req.body.cep,
                                telefone: req.body.telefone,
                                mail: req.body.mail,
                                responsavel: req.body.responsavel,
                                contato: req.body.contato })
                        .then(_ => res.status(204).send())
                        .catch(err => res.status(400).json(err))            
                }


            })
            .catch(err => res.status(400).json(err)) 
    }
    
    const toggleEmpresas = (req, res) => {
        console.log('toggleEmpresas')
        app.db('empresas')
            .where({ empresas_id: req.params.empresas_id })
            .orderBy('fantasia')
            .then(empresas => res.json(empresas))
            .catch(err => res.status(400).json(err))
    }

    const buscaEmpresa = (req, res) => {
        const cn = req.params.cnpj.replace(",", "/")
        console.log('buscaEmpresa '+ cn)
        app.db('empresas')
            .where({ cnpj: cn })
            .orderBy('fantasia')
            .then(empresas => res.json(empresas))
            .catch(err => res.status(400).json(err))
    }
//-------------------------------------------------------------------------------------------------------------


    return { getEmpresas, saveEmpresas, removeEmpresas, updateEmpresas, toggleEmpresas, buscaEmpresa }
}