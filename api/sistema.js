const moment = require('moment')

module.exports = app => {
    const getSistemas = (req, res) => {
        app.db('sistemas')
            .orderBy('sistemas_codigo')
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
//        console.log(req.body.dataUpdate)
    
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
            const dataCancelS = sistema.dataCancelS ? null : new Date()
            updateSistemadataCancelS(req, res, dataCancelS)
        })
        .catch(err => res.status(400).json(err))
    }

    const updateSistemadataCancelS = (req, res, dataCancelS) => {
    app.db('sistemas')
        .where({ sistemas_id: req.params.sistemas_id })
        .update({ dataCancelS })
        .then(_ => res.status(204).send())
        .catch(err => res.status(400).json(err))
}

//-----------------------------------------------------------------------------------------
    const updateSistemas = (req, res ) => {
        app.db('sistemas')
        .where({ sistemas_codigo: req.body.sistemas_codigo})
        .first()
        .then(sistema => {
            if (!sistema) {
                const msg = `Sistema com codigo ${req.params.sistemas_codigo} não encontrada.`
                return res.status(400).send(msg)
            }else{
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
        .orderBy('sistemas_codigo')
        .then(sistemas => res.json(sistemas))
        .catch(err => res.status(400).json(err))
}

const buscaSistemas = (req, res) => {
    app.db('sistemas')
        .where({ sistemas_id: req.params.sistemas_id })
        .orderBy('sistemas_codigo')
        .then(sistemas => res.json(sistemas))
        .catch(err => res.status(400).json(err))
}

//-------------------------------------------------------------------------------------------------------------

    return { getSistemas, saveSistemas, removeSistemas, updateSistemas, toggleSistemas, buscaSistemas }
}