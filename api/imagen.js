const moment = require('moment')

module.exports = app => {
    const getImagens = (req, res) => {
        app.db('imagens')
            .orderBy('imagensDataCadastro', 'imagensHoraCadastro')
            .then(imagens => res.json(imagens))
            .catch(err => res.status(400).json(err))
    }
//-----------------------------------------------------------------------------------------
    const saveImagens = (req, res) => {  
        console.log(JSON.stringify(req.body.imagensImagem))  
        app.db('imagens')
            .insert(req.body)
            .returning('imagens.imagens_id')
            .then((imagens_id) => res.json(imagens_id[0]))
            .catch(err => res.status(403).json(err))
    }
//------------------------------------------------------------------------------------------------------
    const updateImagens = (req, res ) => {
        app.db('imagens')
            .where({ imagens_id: req.body.imagens_id})
            .first()
            .then(imagen => {
                if (!imagen) {
                    const msg = `imagen com id ${req.params.imagens_id} não encontrada.`
                    return res.status(410).send(msg)
                }else{
/*                    app.db('imagens')
                    .where({ imagens_id: req.body.imagens_id})
                    .update({   imagensOperador: req.body.imagensOperador,
                                imagensValor: req.body.imagensValor,
                                imagensDifereca: req.body.imagensDifereca,
                                imagensDocOperador: req.body.imagensDocOperador,
                                imagensDocResponsavel: req.body.imagensDocResponsavel,
                                imagensDocPrevecao: req.body.imagensDocPrevecao, 
                                imagensObservacao: req.body.imagensObservacao
                            })
                        .then(_ => res.status(204).send())
                        .catch(err => res.status(405).json(err))            
                        */         }
            })
            .catch(err => res.status(400).json(err)) 
    }
//-------------------------------------------------------------------------------------------------------------
   
    const buscaImagen = (req, res) => {
        app.db('imagens')
            .where({ imagens_id: req.params.imagens_id })
            .then(imagens => res.json(imagens))
            .catch(err => res.status(400).json(err))   }

//-------------------------------------------------------------------------------------------------------------
const uploudsImagens = (req, res) => {  
    console.log(JSON.stringify(req.body))
}

    return { getImagens, saveImagens, updateImagens, buscaImagen, uploudsImagens }
}