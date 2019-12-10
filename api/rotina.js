const moment = require('moment')

module.exports = app => {
    const getRotinas = (req, res) => {
        app.db('rotinas')
            .orderBy('sistema_id')
            .then(rotinas => res.json(rotinas))
            .catch(err => res.status(400).json(err))
    }

    const saveRotinas = (req, res) => {
        if (!req.body.nomeRotina.trim()) {
            return res.status(400).send('Nome Rotina é um campo obrigatório')
        }
        if (!req.body.dataCadastro) {
            return res.status(402).send('Data Cadastro é um campo obrigatório')
        }
        if (!req.body.sistema_id) {
            return res.status(403).send('Sistema é um campo obrigatório')
        }
        app.db('rotinas')
            .insert(req.body)
            .then(_ => res.status(204).send())
            .catch(err => res.status(401).json(err))
    }

    const removeRotinas = (req, res) => {
        app.db('rotinas')
            .where({ id: req.params.id })
            .first()
            .then(rotina => {
                if (!rotina) {
                    const msg = `Rotinas com codigo ${req.params.id} não encontrada.`
                    return res.status(403).send(msg)
                }
                console.log(rotina.id)
                const dataCancel = rotina.dataCancel ? null : new Date()
            updateRotinaDataCancel(req, res, dataCancel)
        })
        .catch(err => res.status(402).json(err))
    }

    const updateRotinaDataCancel = (req, res, dataCancel) => {
        console.log(dataCancel)

        app.db('rotinas')
            .where({ id: req.params.id })
            .update({ dataCancel })
            .then(_ => res.status(204).send())
            .catch(err => res.status(401).json(err)) 
    }
    

    const updateRotinas = (req, res ) => {
        console.log (req.body.id)
        app.db('rotinas')
        .where({ id: req.body.id})
        .first()
        .then(rotina => {
            if (!rotina) {
                const msg = `Rotina com codigo ${req.params.codigo} não encontrada.`
                return res.status(401).send(msg)
            }else{
                app.db('rotinas')
                    .where({ id: req.body.id})
                    .update({nomeRotina: req.body.nomeRotina, 
                            dataUpdate: req.body.dataUpdate,
                            dataCancel: req.body.dataCancel})
                    .then(_ => res.status(204).send())
                    .catch(err => res.status(402).json(err))            
            }
        })
        .catch(err => res.status(403).json(err)) 
    }

    const toggleRotinas = (req, res) => {
        app.db('rotinas')
            .where({ id: req.params.id })
            .orderBy('sistema_id')
            .then(rotina => res.json(rotina))
            .catch(err => res.status(400).json(err))
    }




    return { getRotinas, saveRotinas, removeRotinas, updateRotinas, toggleRotinas}
}