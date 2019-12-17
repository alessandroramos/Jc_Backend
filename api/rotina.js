const moment = require('moment')

module.exports = app => {
    const getRotinas = (req, res) => {
        app.db('rotinas')
            .innerJoin('sistemas', 'rotinas.sistema_id', 'sistemas.sistemas_id')
            .orderBy('sistemas.nomeSistema' && 'rotinas.nomeRotina')
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
            .where({ rotinas_id: req.params.rotinas_id })
            .first()
            .then(rotina => {
                if (!rotina) {
                    const msg = `Rotinas com codigo ${req.params.rotinas_id} não encontrada.`
                    return res.status(403).send(msg)
                }
                const dataCancelR = rotina.dataCancelR ? null : new Date()
            updateRotinadataCancelR(req, res, dataCancelR)
        })
        .catch(err => res.status(402).json(err))
    }

    const updateRotinadataCancelR = (req, res, dataCancelR) => {
//        console.log(dataCancelR)

        app.db('rotinas')
            .where({ rotinas_id: req.params.rotinas_id })
            .update({ dataCancelR })
            .then(_ => res.status(204).send())
            .catch(err => res.status(401).json(err)) 
    }
    

    const updateRotinas = (req, res ) => {
//        console.log ('aa'+req.body.rotinas_id)
        app.db('rotinas')
        .where({ rotinas_id: req.body.rotinas_id})
        .first()
        .then(rotina => {
            if (!rotina) {
                const msg = `Rotina com codigo ${req.params.codigo} não encontrada.`
                return res.status(401).send(msg)
            }else{
                app.db('rotinas')
                    .where({ rotinas_id: req.body.rotinas_id})
                    .update({nomeRotina: req.body.nomeRotina, 
                            dataUpdate: req.body.dataUpdate,
                            dataCancelR: req.body.dataCancelR})
                    .then(_ => res.status(204).send())
                    .catch(err => res.status(402).json(err))            
            }
        })
        .catch(err => res.status(403).json(err)) 
    }

    const toggleRotina = (req, res) => {
//        console.log('aqui'+req.params.rotinas_id)
        app.db('rotinas')
            .where( 'rotinas_id', req.params.rotinas_id )
            .then(rotina => res.json(rotina))
            .catch(err => res.status(400).json(err))
    }




    return { getRotinas, saveRotinas, removeRotinas, updateRotinas, toggleRotina}
}