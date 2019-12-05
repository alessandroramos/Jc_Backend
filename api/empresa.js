const moment = require('moment')

module.exports = app => {
    const getEmpresas = (req, res) => {
//        const date = req.query.date ? req.query.date
//            : moment().endOf('day').toDate()
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
            .where({ id: req.params.id })
            .first()
            .then(empresa => {
                if (!empresa) {
                    const msg = `empresa com id ${req.params.id} não encontrada.`
                    return res.status(400).send(msg)
                }

                const dataCancel = empresa.dataCancel ? null : new Date()
                updateEmpresaDataCancel(req, res, dataCancel)
            })
            .catch(err => res.status(400).json(err))
    }

    const updateEmpresaDataCancel = (req, res, dataCancel) => {
        app.db('empresas')
            .where({ id: req.params.id })
            .update({ dataCancel })
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

//------------------------------------------------------------------------------------------------------
    const updateEmpresas = (req, res ) => {
//        console.log(req.body.id)
        app.db('empresas')
            .where({ cnpj: req.body.cnpj})
            .first()
            .then(empresa => {
                if (!empresa) {
                    const msg = `empresa com id ${req.params.id} não encontrada.`
                    return res.status(400).send(msg)
                }else{
                    app.db('empresas')
                        .where({ cnpj: req.body.cnpj})
                        .update({razao: req.body.razao, 
                                fantasia: req.body.fantasia,
                                dataAbertura: req.body.dataAbertura,
                                dodataEncerramentone: req.body.dodataEncerramentone,
                                dataUpdate: req.body.dataUpdate,
                                dataCancel: req.body.dataCancel,
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
        app.db('empresas')
            .where({ id: req.params.id })
            .orderBy('fantasia')
            .then(empresas => res.json(empresas))
            .catch(err => res.status(400).json(err))
    }
//-------------------------------------------------------------------------------------------------------------


    return { getEmpresas, saveEmpresas, removeEmpresas, updateEmpresas, toggleEmpresas }
}