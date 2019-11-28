const moment = require('moment')

module.exports = app => {
    const getPessoas = (req, res) => {
        const date = req.query.date ? req.query.date
            : moment().endOf('day').toDate()

        app.db('pessoas')
            .orderBy('nome')
            .then(pessoas => res.json(pessoas))
            .catch(err => res.status(400).json(err))
    }

    const save = (req, res) => {
        if (!req.body.nome.trim()) {
            return res.status(400).send('Nome é um campo obrigatório')
        }
        if (!req.body.cpf.trim()) {
            return res.status(400).send('CPF é um campo obrigatório')
        }
        if (!req.body.rg) {
            return res.status(400).send('RG é um campo obrigatório')
        }
        if (!req.body.dataNacimento.trim()) {
            return res.status(400).send('Data Nacimento é um campo obrigatório')
        }
        if (!req.body.mail.trim()) {
            return res.status(400).send('Email é um campo obrigatório')
        }
        
                
        app.db('pessoas')
            .insert(req.body)
            .then(_ => res.status(204).send())
            .catch(err => res.status(401).json(err))
    }

    const remove = (req, res) => {
        app.db('pessoas')
            .where({ id: req.params.id })
            .del()
            .then(rowsDeleted => {
                if (rowsDeleted > 0) {
                    res.status(204).send()
                } else {
                    const msg = `Não foi encontrada pessoas com id ${req.params.id}.`
                    res.status(400).send(msg)
                }
            })
            .catch(err => res.status(400).json(err))
    }

    const update = (req, res ) => {
        console.log(req.body)
        app.db('pessoas')
            .where({ id: req.params.id})
            .update(req.body)
            .then(_ => res.status(204).send())
            .catch(err => res.status(401).json(err))
    }


    return { getPessoas, save, remove, update }
}