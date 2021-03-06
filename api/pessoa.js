const moment = require('moment')

module.exports = app => {
    const getPessoas = (req, res) => {
    app.db('pessoas')
        .orderBy('nome')
        .then(pessoas => res.json(pessoas))
        .catch(err => res.status(400).json(err))

    }
//---------------------------------------------------------------------------------------------------
    const savePessoas = (req, res) => {
        if (!req.body.nome.trim()) {
            return res.status(405).send('Nome é um campo obrigatório')
        }
        if (!req.body.cpf.trim()) {
            return res.status(405).send('CPF é um campo obrigatório')
        }
        if (!req.body.rg) {
            return res.status(405).send('RG é um campo obrigatório')
        }
        if (!req.body.dataNacimento.trim()) {
            return res.status(405).send('Data Nacimento é um campo obrigatório')
        }
        if (!req.body.mail.trim()) {
            return res.status(405).send('Email é um campo obrigatório')
        }
        app.db('pessoas')
            .insert(req.body)
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }
//-----------------------------------------------------------------------------------------------------
    const removePessoas = (req, res) => {
//        console.log(req.params.pessoas_id)
        app.db('pessoas')
            .where({ pessoas_id: req.params.pessoas_id })
            .first()
            .then(pessoa => {
                if (!pessoa) {
                    const msg = `Pessoa com id ${req.params.cpf} não encontrada.`
                    return res.status(400).send(msg)
                }

                const dataCancelP = pessoa.dataCancelP ? null : new Date()
                updatePessoadataCancelP(req, res, dataCancelP)
            })
            .catch(err => res.status(400).json(err))
    }

    const updatePessoadataCancelP = (req, res, dataCancelP) => {
        app.db('pessoas')
            .where({ pessoas_id: req.params.pessoas_id })
            .update({ dataCancelP })
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }
//-------------------------------------------------------------------------------------------------------------------
const updatePessoas = (req, res ) => {
            app.db('pessoas')
                .where({ cpf: req.body.cpf})
                .first()
                .then(pessoa => {
                    if (!pessoa) {
                        const msg = `Pessoa com CPF ${req.params.cpf} não encontrada.`
                        return res.status(400).send(msg)
                    }else{
                        app.db('pessoas')
                            .where({ cpf: req.body.cpf})
                            .update({nome: req.body.nome, 
                                    apelido: req.body.apelido,
                                    rg: req.body.rg,
                                    dataNacimento: req.body.dataNacimento,
                                    dataUpdate: req.body.dataUpdate,
                                    dataCancelP: req.body.dataCancelP,
                                    logradoro: req.body.logradoro,
                                    numero: req.body.numero,
                                    bairro: req.body.bairro,
                                    cidade: req.body.cidade,
                                    cep: req.body.cep,
                                    telefone: req.body.telefone,
                                    mail: req.body.mail})
                            .then(_ => res.status(204).send())
                            .catch(err => res.status(400).json(err))            
                    }    
                })
                .catch(err => res.status(400).json(err)) 
        }
        
        const togglePessoas = (req, res) => {
//            console.log(req.params.cpf)
            app.db('pessoas')
                .where({ cpf: req.params.cpf })
                .orderBy('nome')
                .then(pessoa => res.json(pessoa))
                .catch(err => res.status(400).json(err))
        }
    

    return { getPessoas, savePessoas, removePessoas, updatePessoas, togglePessoas }
}