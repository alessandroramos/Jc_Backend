const moment = require('moment')

module.exports = app => {
    const getSistemas = (req, res) => {
        app.db('sistemas')
            .orderBy('nomeSistema')
            .then(sistemas => res.json(sistemas))
            .catch(err => res.status(400).json(err))
    }

//-----------------------------------------------------------------------------------------
    const saveSistemas = (req, res) => {
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

//-----------------------------------------------------------------------------------------
    const removeSistemas = (req, res) => {
        app.db('sistemas')
        .where({ codigo: req.params.codigo })
        .first()
        .then(sistema => {
            if (!sistema) {
                const msg = `Sistema com codigo ${req.params.codigo} não encontrada.`
                return res.status(400).send(msg)
            }

            const dataCancel = empresa.dataCancel ? null : new Date()
            updateSistemaDataCancel(req, res, dataCancel)
        })
        .catch(err => res.status(400).json(err))
}

const updateSistemaDataCancel = (req, res, dataCancel) => {
    app.db('sistemas')
        .where({ codigo: req.params.codigo })
        .update({ dataCancel })
        .then(_ => res.status(204).send())
        .catch(err => res.status(400).json(err))
}

//-----------------------------------------------------------------------------------------
    const updateSistemas = (req, res ) => {
        console.log(req.body)
        app.db('sistemas')
        .where({ codigo: req.body.codigo})
        .first()
        .then(sistema => {
            if (!sistema) {
                const msg = `Sistema com codigo ${req.params.codigo} não encontrada.`
                return res.status(400).send(msg)
            }else{
                app.db('sistemas')
                    .where({ codigo: req.body.codigo})
                    .update({nomeSistema: req.body.nomeSistema, 
                            dataImplantação: req.body.dataImplantação,
                            dataUpdate: req.body.dataUpdate,
                            dataCancel: req.body.dataCancel})
                    .then(_ => res.status(204).send())
                    .catch(err => res.status(400).json(err))            
            }
        })
        .catch(err => res.status(400).json(err)) 
}

const toggleSistemas = (req, res) => {
    app.db('sistemas')
        .where({ codigo: req.params.codigo })
        .orderBy('nomeSistema')
        .then(sistemas => res.json(sistemas))
        .catch(err => res.status(400).json(err))
}

//-------------------------------------------------------------------------------------------------------------

    return { getSistemas, saveSistemas, removeSistemas, updateSistemas, toggleSistemas }
}