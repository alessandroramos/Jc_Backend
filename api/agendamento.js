const moment = require('moment')

module.exports = app => {
    const getAgendamentos = (req, res) => {
        app.db('agendamentos')
            .orderBy('agendamentosDataCadastro')
            .then(agendamentos => res.json(agendamentos))
            .catch(err => res.status(400).json(err))
    }
//-----------------------------------------------------------------------------------------
    const saveAgendamentos = (req, res) => {  
        console.log(req.body)  
        app.db('agendamentos')
            .insert(req.body)
            .returning('agendamentos.agendamentos_id')
            .then((agendamentos_id) => res.json(agendamentos_id[0]))
            .catch(err => res.status(403).json(err))
    }
//------------------------------------------------------------------------------------------------------
    const updateAgendamentos = (req, res ) => {
        app.db('agendamentos')
            .where({ agendamentos_id: req.body.agendamentos_id})
            .first()
            .then(agendamento => {
                if (!agendamento) {
                    const msg = `agendamento com id ${req.params.agendamentos_id} não encontrada.`
                    return res.status(410).send(msg)
                }else{
                    app.db('agendamentos')
                    .where({ agendamentos_id: req.body.agendamentos_id})
                    .update({   agendamentosSetor: req.body.agendamentosSetor,
                                agendamentosProduto: req.body.agendamentosProduto,
                                agendamentosQuantidade: req.body.agendamentosQuantidade,
                                agendamentosPrevencao: req.body.agendamentosPrevencao,
                                agendamentosObservacao: req.body.agendamentosObservacao,
                                agendamentosDataUpdate: req.body.agendamentosDataUpdate 
                            })
                        .then(_ => res.status(204).send())
                        .catch(err => res.status(405).json(err))            
                }
            })
            .catch(err => res.status(400).json(err)) 
    }
//-------------------------------------------------------------------------------------------------------------
   
    const buscaAgendamento = (req, res) => {
        app.db('agendamentos')
            .where({ agendamentos_id: req.params.agendamentos_id })
            .then(agendamentos => res.json(agendamentos))
            .catch(err => res.status(400).json(err))   }

//-------------------------------------------------------------------------------------------------------------


    return { getAgendamentos, saveAgendamentos, updateAgendamentos, buscaAgendamento }
}