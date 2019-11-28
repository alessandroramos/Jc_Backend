const moment = require('moment')

module.exports = app => {
    const getRotinas = (req, res) => {
        const date = req.query.date ? req.query.date
            : moment().endOf('day').toDate()

        app.db('rotinas')
            .orderBy('sistema_id')
            .then(rotinas => res.json(rotinas))
            .catch(err => res.status(400).json(err))
    }

    const save = (req, res) => {
        if (!req.body.nomeRotina.trim()) {
            return res.status(400).send('Nome Rotina é um campo obrigatório')
        }
        if (!req.body.dataImplantação.trim()) {
            return res.status(400).send('Data Implantação é um campo obrigatório')
        }
        if (!req.body.sistema_id) {
            return res.status(400).send('Sistema é um campo obrigatório')
        }
        
                
        app.db('rotinas')
            .insert(req.body)
            .then(_ => res.status(204).send())
            .catch(err => res.status(401).json(err))
    }

    const remove = (req, res) => {
        app.db('rotinas')
            .where({ id: req.params.id })
            .del()
            .then(rowsDeleted => {
                if (rowsDeleted > 0) {
                    res.status(204).send()
                } else {
                    const msg = `Não foi encontrada rotina com id ${req.params.id}.`
                    res.status(400).send(msg)
                }
            })
            .catch(err => res.status(400).json(err))
    }

    const update = (req, res ) => {
        console.log(req.body)
        app.db('rotinas')
            .where({ id: req.params.id})
            .update(req.body)
            .then(_ => res.status(204).send())
            .catch(err => res.status(401).json(err))
    }


    return { getRotinas, save, remove, update }
}