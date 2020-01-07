const moment = require('moment')

module.exports = app => {
    const getLocalizacao = (req, res) => {
        app.db('localizacaos')
            .orderBy('localizacaosDataCadastro', 'localizacaosHoraCadastro')
            .then(localizacaos => res.json(localizacaos))
            .catch(err => res.status(400).json(err))
    }
//-----------------------------------------------------------------------------------------
    const saveLocalizacao = (req, res) => {    
        app.db('localizacaos')
            .insert(req.body)
            .returning('localizacaos.localizacaos_id')
            .then((localizacaos_id) => res.json(localizacaos_id[0]))
            .catch(err => res.status(403).json(err))
    }
//------------------------------------------------------------------------------------------------------
   
    const buscaLocalizacao = (req, res) => {
        app.db('localizacaos')
            .where({ localizacaos_id: req.params.localizacaos_id })
            .then(localizacaos => res.json(localizacaos))
            .catch(err => res.status(400).json(err))   }

//-------------------------------------------------------------------------------------------------------------


    return { getLocalizacao, saveLocalizacao, buscaLocalizacao }
}