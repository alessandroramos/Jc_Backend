const moment = require('moment')

module.exports = app => {
    const getEmprestimos = (req, res) => {
        app.db('emprestimos')
            .orderBy('emprestimosDataCadastro')
            .then(emprestimos => res.json(emprestimos))
            .catch(err => res.status(400).json(err))
    }
//-----------------------------------------------------------------------------------------
    const saveEmprestimos = (req, res) => {  
        console.log(req.body)  
        app.db('emprestimos')
            .insert(req.body)
            .returning('emprestimos.emprestimos_id')
            .then((emprestimos_id) => res.json(emprestimos_id[0]))
            .catch(err => res.status(403).json(err))
    }
//------------------------------------------------------------------------------------------------------
    const updateEmprestimos = (req, res ) => {
        app.db('emprestimos')
            .where({ emprestimos_id: req.body.emprestimos_id})
            .first()
            .then(emprestimo => {
                if (!emprestimo) {
                    const msg = `emprestimo com id ${req.params.emprestimos_id} não encontrada.`
                    return res.status(410).send(msg)
                }else{
                    app.db('emprestimos')
                    .where({ emprestimos_id: req.body.emprestimos_id})
                    .update({   emprestimosSetor: req.body.emprestimosSetor,
                                emprestimosProduto: req.body.emprestimosProduto,
                                emprestimosQuantidade: req.body.emprestimosQuantidade,
                                emprestimosPrevencao: req.body.emprestimosPrevencao,
                                emprestimosObservacao: req.body.emprestimosObservacao,
                                emprestimosDataUpdate: req.body.emprestimosDataUpdate 
                            })
                        .then(_ => res.status(204).send())
                        .catch(err => res.status(405).json(err))            
                }
            })
            .catch(err => res.status(400).json(err)) 
    }
//-------------------------------------------------------------------------------------------------------------
   
    const buscaEmprestimo = (req, res) => {
        app.db('emprestimos')
            .where({ emprestimos_id: req.params.emprestimos_id })
            .then(emprestimos => res.json(emprestimos))
            .catch(err => res.status(400).json(err))   }

//-------------------------------------------------------------------------------------------------------------


    return { getEmprestimos, saveEmprestimos, updateEmprestimos, buscaEmprestimo }
}