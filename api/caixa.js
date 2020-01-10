const moment = require('moment')

module.exports = app => {
    const getCaixas = (req, res) => {
        app.db('caixas')
            .orderBy('caixasDataCadastro', 'caixasHoraCadastro')
            .then(caixas => res.json(caixas))
            .catch(err => res.status(400).json(err))
    }
//-----------------------------------------------------------------------------------------
    const saveCaixas = (req, res) => {    
        app.db('caixas')
            .insert(req.body)
            .returning('caixas.caixas_id')
            .then((caixas_id) => res.json(caixas_id[0]))
            .catch(err => res.status(403).json(err))
    }
//------------------------------------------------------------------------------------------------------
    const updateCaixas = (req, res ) => {
        app.db('caixas')
            .where({ caixas_id: req.body.caixas_id})
            .first()
            .then(caixa => {
                if (!caixa) {
                    const msg = `caixa com id ${req.params.caixas_id} não encontrada.`
                    return res.status(410).send(msg)
                }else{
                    app.db('caixas')
                    .where({ caixas_id: req.body.caixas_id})
                    .update({   caixasOperador: req.body.caixasOperador,
                                caixasValor: req.body.caixasValor,
                                caixasDifereca: req.body.caixasDifereca,
                                caixasDocOperador: req.body.caixasDocOperador,
                                caixasDocResponsavel: req.body.caixasDocResponsavel,
                                caixasDocPrevecao: req.body.caixasDocPrevecao, 
                                caixasObservacao: req.body.caixasObservacao
                            })
                        .then(_ => res.status(204).send())
                        .catch(err => res.status(405).json(err))            
                }
            })
            .catch(err => res.status(400).json(err)) 
    }
//-------------------------------------------------------------------------------------------------------------
   
    const buscaCaixa = (req, res) => {
        app.db('caixas')
            .where({ caixas_id: req.params.caixas_id })
            .then(caixas => res.json(caixas))
            .catch(err => res.status(400).json(err))   }

//-------------------------------------------------------------------------------------------------------------


    return { getCaixas, saveCaixas, updateCaixas, buscaCaixa }
}