const moment = require('moment')

module.exports = app => {
    const getPrest_servicos = (req, res) => {
        app.db('prest_servicos')
            .orderBy('prest_servicosDataCadastro')
            .then(prest_servicos => res.json(prest_servicos))
            .catch(err => res.status(400).json(err))
    }
//-----------------------------------------------------------------------------------------
    const savePrest_servicos = (req, res) => {  
        console.log(req.body)  
        app.db('prest_servicos')
            .insert(req.body)
            .returning('prest_servicos.prest_servicos_id')
            .then((prest_servicos_id) => res.json(prest_servicos_id[0]))
            .catch(err => res.status(403).json(err))
    }
//------------------------------------------------------------------------------------------------------
    const updatePrest_servicos = (req, res ) => {
        app.db('prest_servicos')
            .where({ prest_servicos_id: req.body.prest_servicos_id})
            .first()
            .then(prest_servico => {
                if (!prest_servico) {
                    const msg = `prest_servico com id ${req.params.prest_servicos_id} não encontrada.`
                    return res.status(410).send(msg)
                }else{
                    app.db('prest_servicos')
                    .where({ prest_servicos_id: req.body.prest_servicos_id})
                    .update({   prest_servicosSetor: req.body.prest_servicosSetor,
                                prest_servicosProduto: req.body.prest_servicosProduto,
                                prest_servicosQuantidade: req.body.prest_servicosQuantidade,
                                prest_servicosPrevencao: req.body.prest_servicosPrevencao,
                                prest_servicosObservacao: req.body.prest_servicosObservacao,
                                prest_servicosDataUpdate: req.body.prest_servicosDataUpdate 
                            })
                        .then(_ => res.status(204).send())
                        .catch(err => res.status(405).json(err))            
                }
            })
            .catch(err => res.status(400).json(err)) 
    }
//-------------------------------------------------------------------------------------------------------------
   
    const buscaPrest_servico = (req, res) => {
        app.db('prest_servicos')
            .where({ prest_servicos_id: req.params.prest_servicos_id })
            .then(prest_servicos => res.json(prest_servicos))
            .catch(err => res.status(400).json(err))   }

//-------------------------------------------------------------------------------------------------------------


    return { getPrest_servicos, savePrest_servicos, updatePrest_servicos, buscaPrest_servico }
}