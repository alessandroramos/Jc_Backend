const moment = require('moment')

module.exports = app => {
    const getEmpresas = (req, res) => {
        const date = req.query.date ? req.query.date
            : moment().endOf('day').toDate()

        app.db('empresas')
            .orderBy('fantasia')
            .then(empresas => res.json(empresas))
            .catch(err => res.status(400).json(err))
    }

    const save = (req, res) => {
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
        
       // Console.log(req.body.dataAbertura)
                
        app.db('empresas')
            .insert(req.body)
            .then(_ => res.status(204).send())
            .catch(err => res.status(401).json(err))
    }

    const remove = (req, res) => {
        app.db('empresas')
            .where({ id: req.params.id })
            .del()
            .then(rowsDeleted => {
                if (rowsDeleted > 0) {
                    res.status(204).send()
                } else {
                    const msg = `Não foi encontrada empresa com id ${req.params.id}.`
                    res.status(400).send(msg)
                }
            })
            .catch(err => res.status(400).json(err))
    }

    const update = (req, res ) => {
        console.log(req.body)
        app.db('empresas')
            .where({ id: req.params.id})
            .update(req.body)
            .then(_ => res.status(204).send())
            .catch(err => res.status(401).json(err))
    }


    return { getEmpresas, save, remove, update }
}