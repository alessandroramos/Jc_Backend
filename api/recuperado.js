const moment = require('moment')

module.exports = app => {
    const getRecuperados = (req, res) => {
        app.db('recuperados')
            .orderBy('recuperadosDataCadastro')
            .then(recuperados => res.json(recuperados))
            .catch(err => res.status(400).json(err))
    }
//-----------------------------------------------------------------------------------------
    const saveRecuperados = (req, res) => {  
        console.log(req.body)  
        app.db('recuperados')
            .insert(req.body)
            .returning('recuperados.recuperados_id')
            .then((recuperados_id) => res.json(recuperados_id[0]))
            .catch(err => res.status(403).json(err))
    }
//------------------------------------------------------------------------------------------------------
    const updateRecuperados = (req, res ) => {
        app.db('recuperados')
            .where({ recuperados_id: req.body.recuperados_id})
            .first()
            .then(recuperado => {
                if (!recuperado) {
                    const msg = `recuperado com id ${req.params.recuperados_id} não encontrada.`
                    return res.status(410).send(msg)
                }else{
                    app.db('recuperados')
                    .where({ recuperados_id: req.body.recuperados_id})
                    .update({   recuperadosSetor: req.body.recuperadosSetor,
                                recuperadosProduto: req.body.recuperadosProduto,
                                recuperadosQuantidade: req.body.recuperadosQuantidade,
                                recuperadosPrevencao: req.body.recuperadosPrevencao,
                                recuperadosObservacao: req.body.recuperadosObservacao,
                                recuperadosDataUpdate: req.body.recuperadosDataUpdate 
                            })
                        .then(_ => res.status(204).send())
                        .catch(err => res.status(405).json(err))            
                }
            })
            .catch(err => res.status(400).json(err)) 
    }
//-------------------------------------------------------------------------------------------------------------
   
    const buscaRecuperado = (req, res) => {
        app.db('recuperados')
            .where({ recuperados_id: req.params.recuperados_id })
            .then(recuperados => res.json(recuperados))
            .catch(err => res.status(400).json(err))   }

//-------------------------------------------------------------------------------------------------------------


    return { getRecuperados, saveRecuperados, updateRecuperados, buscaRecuperado }
}