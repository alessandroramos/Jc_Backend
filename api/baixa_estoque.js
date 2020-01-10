const moment = require('moment')

module.exports = app => {
    const getBaixa_estoques = (req, res) => {
        app.db('cofres')
            .orderBy('cofresDataCadastro', 'cofresHoraCadastro')
            .then(cofres => res.json(cofres))
            .catch(err => res.status(400).json(err))
    }
//-----------------------------------------------------------------------------------------
    const saveBaixa_estoques = (req, res) => {    
        app.db('cofres')
            .insert(req.body)
            .returning('cofres.cofres_id')
            .then((cofres_id) => res.json(cofres_id[0]))
            .catch(err => res.status(403).json(err))
    }
//------------------------------------------------------------------------------------------------------
    const updateBaixa_estoques = (req, res ) => {
        app.db('cofres')
            .where({ cofres_id: req.body.cofres_id})
            .first()
            .then(cofre => {
                if (!cofre) {
                    const msg = `cofre com id ${req.params.cofres_id} não encontrada.`
                    return res.status(410).send(msg)
                }else{
                    app.db('cofres')
                    .where({ cofres_id: req.body.cofres_id})
                    .update({   cofresOperador: req.body.cofresOperador,
                                cofresValor: req.body.cofresValor,
                                cofresDifereca: req.body.cofresDifereca,
                                cofresDocOperador: req.body.cofresDocOperador,
                                cofresDocResponsavel: req.body.cofresDocResponsavel,
                                cofresDocPrevecao: req.body.cofresDocPrevecao, 
                                cofresObservacao: req.body.cofresObservacao
                            })
                        .then(_ => res.status(204).send())
                        .catch(err => res.status(405).json(err))            
                }
            })
            .catch(err => res.status(400).json(err)) 
    }
//-------------------------------------------------------------------------------------------------------------
   
    const buscaBaixa_estoque = (req, res) => {
        app.db('cofres')
            .where({ cofres_id: req.params.cofres_id })
            .then(cofres => res.json(cofres))
            .catch(err => res.status(400).json(err))   }

//-------------------------------------------------------------------------------------------------------------


    return { getBaixa_estoques, saveBaixa_estoques, updateBaixa_estoques, buscaBaixa_estoque }
}