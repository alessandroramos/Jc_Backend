const bcrypt = require('bcrypt-nodejs')

module.exports = app => {

    const getUsers = (req, res) => {
        app.db('users')
            .orderBy('nome')
            .then(sistemas => res.json(sistemas))
            .catch(err => res.status(400).json(err))
    }

//-----------------------------------------------------------------------------------------

    const obterHash = (password, callback) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, null, (err, hash) => callback(hash))
        })
    }

    const saveUsers = (req, res) => {
        obterHash(req.body.password, hash => {
            const password = hash

            app.db('users')
                .insert({ name: req.body.name, 
                          cpf: req.body.cpf, 
                          email: req.body.email, 
                          dataCadastro: new Date(), 
                          dataUpdate: new Date(), 
                          dataCancel: null,
                          cancel: false,
                          pessoa_id: req.body.pessoa_id,
                          password })
                .then(_ => res.status(204).send())
                .catch(err => res.status(400).json(err))
        })
    }
//-----------------------------------------------------------------------------------------
    const removeUsers = (req, res) => {
        app.db('users')
            .where({ id: req.params.id })
            .first()
            .then(sistema => {
                if (!sistema) {
                    const msg = `Usuario com codigo ${req.params.id} não encontrada.`
                    return res.status(403).send(msg)
                }

                const dataCancel = sistema.dataCancel ? null : new Date()
                updateSistemaDataCancel(req, res, dataCancel)
            })
            .catch(err => res.status(400).json(err))
    }

    const updateUsersDataCancel = (req, res, dataCancel) => {
        app.db('users')
            .where({ id: req.params.id })
            .update({ dataCancel })
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

//-----------------------------------------------------------------------------------------
    const updateUsers = (req, res ) => {
        console.log(req.body)
        app.db('users')
            .where({ codigo: req.body.codigo})
            .first()
            .then(sistema => {
                if (!sistema) {
                    const msg = `Users com codigo ${req.params.codigo} não encontrada.`
                    return res.status(400).send(msg)
                }else{
                    app.db('users')
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
    const toggleUsers = (req, res) => {
        console.log('id: '+req.params.id)
        console.log('codigo: '+req.params.codigo)
        app.db('users')
            .where({ codigo: req.params.id })
            .orderBy('nomeSistema')
            .then(sistemas => res.json(sistemas))
            .catch(err => res.status(400).json(err))
    }
    
    return { saveUsers, getUsers, removeUsers, updateUsers, toggleUsers }
}