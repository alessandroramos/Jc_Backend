const moment = require('moment')

module.exports = app => {
    const getPapelaos = (req, res) => {
        app.db('papelaos')
            .orderBy('papelaosDataCadastro')
            .then(papelaos => res.json(papelaos))
            .catch(err => res.status(400).json(err))
    }
//-----------------------------------------------------------------------------------------
    const savePapelaos = (req, res) => {  
        console.log(req.body)  
        app.db('papelaos')
            .insert(req.body)
            .returning('papelaos.papelaos_id')
            .then((papelaos_id) => res.json(papelaos_id[0]))
            .catch(err => res.status(403).json(err))
    }
//------------------------------------------------------------------------------------------------------
    const updatePapelaos = (req, res ) => {
        app.db('papelaos')
            .where({ papelaos_id: req.body.papelaos_id})
            .first()
            .then(papelao => {
                if (!papelao) {
                    const msg = `papelao com id ${req.params.papelaos_id} não encontrada.`
                    return res.status(410).send(msg)
                }else{
                    app.db('papelaos')
                    .where({ papelaos_id: req.body.papelaos_id})
                    .update({   papelaosSetor: req.body.papelaosSetor,
                                papelaosProduto: req.body.papelaosProduto,
                                papelaosQuantidade: req.body.papelaosQuantidade,
                                papelaosPrevencao: req.body.papelaosPrevencao,
                                papelaosObservacao: req.body.papelaosObservacao,
                                papelaosDataUpdate: req.body.papelaosDataUpdate 
                            })
                        .then(_ => res.status(204).send())
                        .catch(err => res.status(405).json(err))            
                }
            })
            .catch(err => res.status(400).json(err)) 
    }
//-------------------------------------------------------------------------------------------------------------
   
    const buscaPapelao = (req, res) => {
        app.db('papelaos')
            .where({ papelaos_id: req.params.papelaos_id })
            .then(papelaos => res.json(papelaos))
            .catch(err => res.status(400).json(err))   }

//-------------------------------------------------------------------------------------------------------------


    return { getPapelaos, savePapelaos, updatePapelaos, buscaPapelao }
}