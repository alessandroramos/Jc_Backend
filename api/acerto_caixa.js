const moment = require('moment')

module.exports = app => {
    const getAcerto_caixas = (req, res) => {
        app.db('acerto_caixas')
            .orderBy('acerto_caixasDataCadastro')
            .then(acerto_caixas => res.json(acerto_caixas))
            .catch(err => res.status(400).json(err))
    }
//-----------------------------------------------------------------------------------------
    const saveAcerto_caixas = (req, res) => {  
        console.log(req.body)  
        app.db('acerto_caixas')
            .insert(req.body)
            .returning('acerto_caixas.acerto_caixas_id')
            .then((acerto_caixas_id) => res.json(acerto_caixas_id[0]))
            .catch(err => res.status(403).json(err))
    }
//------------------------------------------------------------------------------------------------------
    const updateAcerto_caixas = (req, res ) => {
        app.db('acerto_caixas')
            .where({ acerto_caixas_id: req.body.acerto_caixas_id})
            .first()
            .then(acerto_caixa => {
                if (!acerto_caixa) {
                    const msg = `acerto_caixa com id ${req.params.acerto_caixas_id} não encontrada.`
                    return res.status(410).send(msg)
                }else{
                    app.db('acerto_caixas')
                    .where({ acerto_caixas_id: req.body.acerto_caixas_id})
                    .update({   acerto_caixasSetor: req.body.acerto_caixasSetor,
                                acerto_caixasProduto: req.body.acerto_caixasProduto,
                                acerto_caixasQuantidade: req.body.acerto_caixasQuantidade,
                                acerto_caixasPrevencao: req.body.acerto_caixasPrevencao,
                                acerto_caixasObservacao: req.body.acerto_caixasObservacao,
                                acerto_caixasDataUpdate: req.body.acerto_caixasDataUpdate 
                            })
                        .then(_ => res.status(204).send())
                        .catch(err => res.status(405).json(err))            
                }
            })
            .catch(err => res.status(400).json(err)) 
    }
//-------------------------------------------------------------------------------------------------------------
   
    const buscaAcerto_caixa = (req, res) => {
        app.db('acerto_caixas')
            .where({ acerto_caixas_id: req.params.acerto_caixas_id })
            .then(acerto_caixas => res.json(acerto_caixas))
            .catch(err => res.status(400).json(err))   }

//-------------------------------------------------------------------------------------------------------------


    return { getAcerto_caixas, saveAcerto_caixas, updateAcerto_caixas, buscaAcerto_caixa }
}