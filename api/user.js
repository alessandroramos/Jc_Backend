const bcrypt = require('bcrypt-nodejs')

module.exports = app => {

    const getUsers = (req, res) => {
        app.db('users')
            .orderBy('name')
            .then(users => res.json(users))
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
            console.log(req.body.pessoa_id)
            app.db('users')
                .insert({ name: req.body.name, 
                          cpf: req.body.cpf, 
                          email: req.body.email, 
                          dataCadastro: new Date(), 
                          dataUpdate: new Date(), 
                          dataCancel: null,
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
            .then(user => {
                if (!user) {
                    const msg = `Usuario com codigo ${req.params.id} não encontrada.`
                    return res.status(403).send(msg)
                }

                const dataCancel = user.dataCancel ? null : new Date()
                updateUserDataCancel(req, res, dataCancel)
            })
            .catch(err => res.status(400).json(err))
    }

    const updateUserDataCancel = (req, res, dataCancel) => {
        app.db('users')
            .where({ id: req.params.id })
            .update({ dataCancel })
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

//-----------------------------------------------------------------------------------------
    const updateUsers = (req, res ) => {
        obterHash(req.body.password, hash => {
            const password = hash
            app.db('users')
                .where({ cpf: req.body.cpf})
                .first()
                .then(user => {
                    if (!user) {
                        const msg = `Users com codigo ${req.params.id} não encontrada.`
                        return res.status(400).send(msg)
                    }else{
                        app.db('users')
                            .where({ cpf: req.body.cpf})
                            .update({password, 
                                    dataUpdate: req.body.dataUpdate,
                                    dataCancel: req.body.dataCancel})
                            .then(_ => res.status(204).send())
                            .catch(err => res.status(400).json(err))            
                    }
                })
                .catch(err => res.status(400).json(err)) 
        })
    }
    
    const toggleUsers = (req, res) => {
        app.db('users')
            .where({ id: req.params.id })
            .orderBy('name')
            .then(user => res.json(user))
            .catch(err => res.status(400).json(err))
    }
    
    return { saveUsers, getUsers, removeUsers, updateUsers, toggleUsers }
}