const moment = require('moment')

module.exports = app => {
    const getSistemas = (req, res) => {
        console.log('aqui')
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
        if (!req.body.dataImplantacao) {
            return res.status(400).send('Data de Implantação é um campo obrigatório')
        }
        console.log(req.body.sistemas_codigo)
        console.log(req.body.nomeSistema)
        console.log(req.body.dataImplantacao)
        console.log(req.body.dataCadastro)
        console.log(req.body.dataUpdate)
    
        app.db('sistemas')
            .insert(req.body)
            .then(_ => res.status(204).send())
            .catch(err => res.status(401).json(err))
    }

//-----------------------------------------------------------------------------------------
    const removeSistemas = (req, res) => {
        app.db('sistemas')
            .where({ sistemas_id: req.params.sistemas_id })
            .first()
            .then(sistema => {
                if (!sistema) {
                    const msg = `Sistema com id ${req.params.sistemas_id} não encontrada.`
                    return res.status(403).send(msg)
                }
            const dataCancel = sistema.dataCancel ? null : new Date()
            updateSistemaDataCancel(req, res, dataCancel)
        })
        .catch(err => res.status(400).json(err))
    }

    const updateSistemaDataCancel = (req, res, dataCancel) => {
    app.db('sistemas')
        .where({ sistemas_id: req.params.sistemas_id })
        .update({ dataCancel })
        .then(_ => res.status(204).send())
        .catch(err => res.status(400).json(err))
}

//-----------------------------------------------------------------------------------------
    const updateSistemas = (req, res ) => {
        console.log('fim')
        app.db('sistemas')
        .where({ sistemas_codigo: req.body.sistemas_codigo})
        .first()
        .then(sistema => {
            if (!sistema) {
                const msg = `Sistema com codigo ${req.params.sistemas_codigo} não encontrada.`
                return res.status(400).send(msg)
            }else{
                console.log(req.body.sistemas_codigo)
                console.log(req.body.nomeSistema)
                console.log(req.body.dataUpdate)
                app.db('sistemas')
                    .where({ sistemas_codigo: req.body.sistemas_codigo})
                    .update({nomeSistema: req.body.nomeSistema, 
                            dataUpdate: req.body.dataUpdate})
                    .then(_ => res.status(204).send())
                    .catch(err => res.status(400).json(err))            
            }

        })
        .catch(err => res.status(400).json(err)) 
}



const toggleSistemas = (req, res) => {
    app.db('sistemas')
        .where({ sistemas_codigo: req.params.sistemas_id })
        .orderBy('nomeSistema')
        .then(sistemas => res.json(sistemas))
        .catch(err => res.status(400).json(err))
}

const buscaSistemas = (req, res) => {
    app.db('sistemas')
        .where({ sistemas_id: req.params.sistemas_id })
        .orderBy('nomeSistema')
        .then(sistemas => res.json(sistemas))
        .catch(err => res.status(400).json(err))
}

//-------------------------------------------------------------------------------------------------------------

    return { getSistemas, saveSistemas, removeSistemas, updateSistemas, toggleSistemas, buscaSistemas }
}