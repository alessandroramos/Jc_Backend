const moment = require('moment')

module.exports = app => {
    const getReg_precos = (req, res) => {
        app.db('reg_precos')
            .orderBy('reg_precosDataCadastro')
            .then(reg_precos => res.json(reg_precos))
            .catch(err => res.status(400).json(err))
    }
//-----------------------------------------------------------------------------------------
    const saveReg_precos = (req, res) => {  
        console.log(req.body)  
        app.db('reg_precos')
            .insert(req.body)
            .returning('reg_precos.reg_precos_id')
            .then((reg_precos_id) => res.json(reg_precos_id[0]))
            .catch(err => res.status(403).json(err))
    }
//------------------------------------------------------------------------------------------------------
    const updateReg_precos = (req, res ) => {
        app.db('reg_precos')
            .where({ reg_precos_id: req.body.reg_precos_id})
            .first()
            .then(reg_preco => {
                if (!reg_preco) {
                    const msg = `reg_preco com id ${req.params.reg_precos_id} não encontrada.`
                    return res.status(410).send(msg)
                }else{
                    app.db('reg_precos')
                    .where({ reg_precos_id: req.body.reg_precos_id})
                    .update({   reg_precosSetor: req.body.reg_precosSetor,
                                reg_precosProduto: req.body.reg_precosProduto,
                                reg_precosQuantidade: req.body.reg_precosQuantidade,
                                reg_precosPrevencao: req.body.reg_precosPrevencao,
                                reg_precosObservacao: req.body.reg_precosObservacao,
                                reg_precosDataUpdate: req.body.reg_precosDataUpdate 
                            })
                        .then(_ => res.status(204).send())
                        .catch(err => res.status(405).json(err))            
                }
            })
            .catch(err => res.status(400).json(err)) 
    }
//-------------------------------------------------------------------------------------------------------------
   
    const buscaReg_preco = (req, res) => {
        app.db('reg_precos')
            .where({ reg_precos_id: req.params.reg_precos_id })
            .then(reg_precos => res.json(reg_precos))
            .catch(err => res.status(400).json(err))   }

//-------------------------------------------------------------------------------------------------------------


    return { getReg_precos, saveReg_precos, updateReg_precos, buscaReg_preco }
}