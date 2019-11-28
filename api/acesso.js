const moment = require('moment')

module.exports = app => {
    const getAcessos = (req, res) => {
        const date = req.query.date ? req.query.date
            : moment().endOf('day').toDate()

        app.db('acessos')
            .orderBy('sistemaId')
            .then(acessos => res.json(acessos))
            .catch(err => res.status(400).json(err))
    }

    const save = (req, res) => {
        if (!req.body.userId.trim()) {
            return res.status(400).send('Informe o Usuario')
        }
        if (!req.body.sistemaId.trim()) {
            return res.status(400).send('Informe o Sistema')
        }
        if (!req.body.rotinaId) {
            return res.status(400).send('Informe a Rotina')
        }
        
                
        app.db('acessos')
            .insert(req.body)
            .then(_ => res.status(204).send())
            .catch(err => res.status(401).json(err))
    }

    const remove = (req, res) => {
        app.db('acessos')
            .where({ id: req.params.id })
            .del()
            .then(rowsDeleted => {
                if (rowsDeleted > 0) {
                    res.status(204).send()
                } else {
                    const msg = `Não foi encontrada acessos com id ${req.params.id}.`
                    res.status(400).send(msg)
                }
            })
            .catch(err => res.status(400).json(err))
    }

    const update = (req, res ) => {
        console.log(req.body)
        app.db('acessos')
            .where({ id: req.params.id})
            .update(req.body)
            .then(_ => res.status(204).send())
            .catch(err => res.status(401).json(err))
    }


    return { getAcessos, save, remove, update }
}