const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const signin = async (req, res) => {
        if (!req.body.cpf || !req.body.password) {
            return res.status(400).send('Dados incompletos')
        }
//        console.log('user')
        const user = await app.db('users')
            .where({cpf : req.body.cpf})
            .first()
        if (user) {
            bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
                if (err || !isMatch) {
                    return res.status(401).send()
                }
//                console.log('acessoemps')
                app.db('acessoemps')
                    .where({ empresas_id: req.body.empresas_id, users_id: user.users_id, dataCancelAE: null})
                    .first()
                    .then(acessoemp => {
                        if (!acessoemp) {
                            res.status(400).send('Usuário não cadastrado!')
                        }else {
                            app.db('acessos')
                                .where({ sistemaId: req.body.sistemaId , userId: user.users_id, dataCancelA: null})
                          //      .first()
                                .then(acesso => {
//                                    console.log(acesso)
                                    if (!acesso) {
                                        res.status(400).send('Usuário não cadastrado!')
                                    }else {
                                        const payload = { id: user.users_id }
                                        res.json({
                                            name: user.name,
                                            email: user.email,
                                            userId: user.userId,
                                            token: jwt.encode(payload, authSecret),
                                            acessos: acesso
                                        }) 
                                    }
                                    
                                })
                        }
                    })                
            })
        } else {
            res.status(400).send('Usuário não cadastrado!')
        }
    }

    return { signin }
}