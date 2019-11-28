const moment = require('moment')

module.exports = app => {
    const getSistemas = (req, res) => {
        app.db('sistemas')
            .orderBy('nomeSistema')
            .then(sistemas => res.json(sistemas))
            .catch(err => res.status(400).json(err))
    }

    const save = (req, res) => {
        if (!req.body.nomeSistema.trim()) {
            return res.status(400).send('Nome Sistemal é um campo obrigatório')
        }
        if (!req.body.dataImplantação) {
            return res.status(400).send('Data de Implantação é um campo obrigatório')
        }
        
                
        app.db('sistemas')
            .insert(req.body)
            .then(_ => res.status(204).send())
            .catch(err => res.status(401).json(err))
    }

    const remove = (req, res) => {
        app.db('sistemas')
            .where({ id: req.params.id })
            .del()
            .then(rowsDeleted => {
                if (rowsDeleted > 0) {
                    res.status(204).send()
                } else {
                    const msg = `Não foi encontrada sistema com id ${req.params.id}.`
                    res.status(400).send(msg)
                }
            })
            .catch(err => res.status(400).json(err))
    }

    const update = (req, res ) => {
        console.log(req.body)
        app.db('sistemas')
            .where({ id: req.params.id})
            .update(req.body)
            .then(_ => res.status(204).send())
            .catch(err => res.status(401).json(err))
    }


    return { getSistemas, save, remove, update }
}