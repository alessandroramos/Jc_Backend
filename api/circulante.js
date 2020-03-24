const moment = require('moment')

module.exports = app => {
    const getCirculantes = (req, res) => {
        app.db('circulantes')
            .orderBy('circulantesDataCadastro')
            .then(circulantes => res.json(circulantes))
            .catch(err => res.status(400).json(err))
    }
//-----------------------------------------------------------------------------------------
    const saveCirculantes = (req, res) => {  
        console.log(req.body)  
        app.db('circulantes')
            .insert(req.body)
            .returning('circulantes.circulantes_id')
            .then((circulantes_id) => res.json(circulantes_id[0]))
            .catch(err => res.status(403).json(err))
    }
//------------------------------------------------------------------------------------------------------
    const updateCirculantes = (req, res ) => {
        app.db('circulantes')
            .where({ circulantes_id: req.body.circulantes_id})
            .first()
            .then(circulante => {
                if (!circulante) {
                    const msg = `circulante com id ${req.params.circulantes_id} não encontrada.`
                    return res.status(410).send(msg)
                }else{
                    app.db('circulantes')
                    .where({ circulantes_id: req.body.circulantes_id})
                    .update({   circulantesSetor: req.body.circulantesSetor,
                                circulantesProduto: req.body.circulantesProduto,
                                circulantesQuantidade: req.body.circulantesQuantidade,
                                circulantesPrevencao: req.body.circulantesPrevencao,
                                circulantesObservacao: req.body.circulantesObservacao,
                                circulantesDataUpdate: req.body.circulantesDataUpdate 
                            })
                        .then(_ => res.status(204).send())
                        .catch(err => res.status(405).json(err))            
                }
            })
            .catch(err => res.status(400).json(err)) 
    }
//-------------------------------------------------------------------------------------------------------------
   
    const buscaCirculante = (req, res) => {
        app.db('circulantes')
            .where({ circulantes_id: req.params.circulantes_id })
            .then(circulantes => res.json(circulantes))
            .catch(err => res.status(400).json(err))   }

//-------------------------------------------------------------------------------------------------------------


    return { getCirculantes, saveCirculantes, updateCirculantes, buscaCirculante }
}