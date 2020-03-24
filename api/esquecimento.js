const moment = require('moment')

module.exports = app => {
    const getEsquecimentos = (req, res) => {
        app.db('esquecimentos')
            .orderBy('esquecimentosDataCadastro')
            .then(esquecimentos => res.json(esquecimentos))
            .catch(err => res.status(400).json(err))
    }
//-----------------------------------------------------------------------------------------
    const saveEsquecimentos = (req, res) => {  
        console.log(req.body)  
        app.db('esquecimentos')
            .insert(req.body)
            .returning('esquecimentos.esquecimentos_id')
            .then((esquecimentos_id) => res.json(esquecimentos_id[0]))
            .catch(err => res.status(403).json(err))
    }
//------------------------------------------------------------------------------------------------------
    const updateEsquecimentos = (req, res ) => {
        app.db('esquecimentos')
            .where({ esquecimentos_id: req.body.esquecimentos_id})
            .first()
            .then(esquecimento => {
                if (!esquecimento) {
                    const msg = `esquecimento com id ${req.params.esquecimentos_id} não encontrada.`
                    return res.status(410).send(msg)
                }else{
                    app.db('esquecimentos')
                    .where({ esquecimentos_id: req.body.esquecimentos_id})
                    .update({   esquecimentosSetor: req.body.esquecimentosSetor,
                                esquecimentosProduto: req.body.esquecimentosProduto,
                                esquecimentosQuantidade: req.body.esquecimentosQuantidade,
                                esquecimentosPrevencao: req.body.esquecimentosPrevencao,
                                esquecimentosObservacao: req.body.esquecimentosObservacao,
                                esquecimentosDataUpdate: req.body.esquecimentosDataUpdate 
                            })
                        .then(_ => res.status(204).send())
                        .catch(err => res.status(405).json(err))            
                }
            })
            .catch(err => res.status(400).json(err)) 
    }
//-------------------------------------------------------------------------------------------------------------
   
    const buscaEsquecimento = (req, res) => {
        app.db('esquecimentos')
            .where({ esquecimentos_id: req.params.esquecimentos_id })
            .then(esquecimentos => res.json(esquecimentos))
            .catch(err => res.status(400).json(err))   }

//-------------------------------------------------------------------------------------------------------------


    return { getEsquecimentos, saveEsquecimentos, updateEsquecimentos, buscaEsquecimento }
}