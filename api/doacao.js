const moment = require('moment')

module.exports = app => {
    const getDoacaos = (req, res) => {
        app.db('doacaos')
            .orderBy('doacaosDataCadastro')
            .then(doacaos => res.json(doacaos))
            .catch(err => res.status(400).json(err))
    }
//-----------------------------------------------------------------------------------------
    const saveDoacaos = (req, res) => {  
        console.log(req.body)  
        app.db('doacaos')
            .insert(req.body)
            .returning('doacaos.doacaos_id')
            .then((doacaos_id) => res.json(doacaos_id[0]))
            .catch(err => res.status(403).json(err))
    }
//------------------------------------------------------------------------------------------------------
    const updateDoacaos = (req, res ) => {
        app.db('doacaos')
            .where({ doacaos_id: req.body.doacaos_id})
            .first()
            .then(doacao => {
                if (!doacao) {
                    const msg = `doacao com id ${req.params.doacaos_id} não encontrada.`
                    return res.status(410).send(msg)
                }else{
                    app.db('doacaos')
                    .where({ doacaos_id: req.body.doacaos_id})
                    .update({   doacaosSetor: req.body.doacaosSetor,
                                doacaosProduto: req.body.doacaosProduto,
                                doacaosQuantidade: req.body.doacaosQuantidade,
                                doacaosPrevencao: req.body.doacaosPrevencao,
                                doacaosObservacao: req.body.doacaosObservacao,
                                doacaosDataUpdate: req.body.doacaosDataUpdate 
                            })
                        .then(_ => res.status(204).send())
                        .catch(err => res.status(405).json(err))            
                }
            })
            .catch(err => res.status(400).json(err)) 
    }
//-------------------------------------------------------------------------------------------------------------
   
    const buscaDoacao = (req, res) => {
        app.db('doacaos')
            .where({ doacaos_id: req.params.doacaos_id })
            .then(doacaos => res.json(doacaos))
            .catch(err => res.status(400).json(err))   }

//-------------------------------------------------------------------------------------------------------------


    return { getDoacaos, saveDoacaos, updateDoacaos, buscaDoacao }
}