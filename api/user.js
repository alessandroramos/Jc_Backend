const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const obterHash = (password, callback) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, null, (err, hash) => callback(hash))
        })
    }

    const save = (req, res) => {
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

    return { save }
}