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
//            console.log(req.body.pessoa_id)
            app.db('users')
                .insert({ name: req.body.name, 
                          cpf: req.body.cpf, 
                          email: req.body.email, 
                          dataCadastro: new Date(), 
                          dataUpdate: new Date(), 
                          dataCancelU: null,
                          pessoa_id: req.body.pessoa_id,
                          password })
                .then(_ => res.status(204).send())
                .catch(err => res.status(400).json(err))
        })
    }
//-----------------------------------------------------------------------------------------
    const removeUsers = (req, res) => {
        app.db('users')
            .where({ users_id: req.params.users_id })
            .first()
            .then(user => {
                if (!user) {
                    const msg = `Usuario com codigo ${req.params.users_id} não encontrada.`
                    return res.status(403).send(msg)
                }

                const dataCancelU = user.dataCancelU ? null : new Date()
                updateUserdataCancelU(req, res, dataCancelU)
            })
            .catch(err => res.status(400).json(err))
    }

    const updateUserdataCancelU = (req, res, dataCancelU) => {
        app.db('users')
            .where({ users_id: req.params.users_id })
            .update({ dataCancelU })
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
                        const msg = `Users com codigo ${req.params.users_id} não encontrada.`
                        return res.status(400).send(msg)
                    }else{
                        app.db('users')
                            .where({ cpf: req.body.cpf})
                            .update({password, 
                                    dataUpdate: req.body.dataUpdate,
                                    dataCancelU: req.body.dataCancelU})
                            .then(_ => res.status(204).send())
                            .catch(err => res.status(400).json(err))            
                    }
                })
                .catch(err => res.status(400).json(err)) 
        })
    }
    
    const toggleUsers = (req, res) => {
        app.db('users')
            .where({ users_id: req.params.users_id })
            .orderBy('name')
            .then(user => res.json(user))
            .catch(err => res.status(400).json(err))
    }
    
    return { saveUsers, getUsers, removeUsers, updateUsers, toggleUsers }
}