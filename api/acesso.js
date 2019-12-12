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

    const saveAcessos = (req, res) => {       
                
        app.db('acessos')
            .insert(req.body)
            .then(_ => res.status(204).send())
            .catch(err => res.status(401).json(err))
    }
    return { getAcessos, saveAcessos }

}