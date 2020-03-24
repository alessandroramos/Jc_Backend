const routes = require('express').Router();
const multer =require('multer');
const multerConfig = require("../config/multer")

module.exports = app => {
    app.post('/signup', app.api.user.saveUsers)
    app.post('/signin', app.api.auth.signin)
//---------------------------------------------------------------------
    app.route('/empresas')
        .all(app.config.passport.authenticate())
        .get(app.api.empresa.getEmpresas)
        .post(app.api.empresa.saveEmpresas)

    app.route('/empresas/:empresas_id/remove')
        .all(app.config.passport.authenticate())
        .put(app.api.empresa.removeEmpresas)

    app.route('/empresas/atualisa')
        .all(app.config.passport.authenticate())
        .put(app.api.empresa.updateEmpresas)

    app.route('/empresas/:empresas_id/toggle')
        .all(app.config.passport.authenticate())
        .get(app.api.empresa.toggleEmpresas)


    app.route('/empresas/:cnpj/buscaEmpresa')
//        .all(app.config.passport.authenticate())
        .get(app.api.empresa.buscaEmpresa)
   
//------------------------------------------------------------------------------        
    app.route('/pessoas')
        .all(app.config.passport.authenticate())
        .get(app.api.pessoa.getPessoas)
        .post(app.api.pessoa.savePessoas)

    app.route('/pessoas/:pessoas_id/remove')
        .all(app.config.passport.authenticate())
        .put(app.api.pessoa.removePessoas)

    app.route('/pessoas/atualisa')
        .all(app.config.passport.authenticate())
        .put(app.api.pessoa.updatePessoas)

    app.route('/pessoas/:cpf/toggle')
        .all(app.config.passport.authenticate())
        .get(app.api.pessoa.togglePessoas)
        
    app.route('/pessoas/:cpf/toggleagr')
//        .all(app.config.passport.authenticate())
        .get(app.api.pessoa.togglePessoas)
//------------------------------------------------------------------------------        
    app.route('/users')
        .all(app.config.passport.authenticate())
        .get(app.api.user.getUsers)
        .post(app.api.user.saveUsers)

    app.route('/users/:users_id/remove')
        .all(app.config.passport.authenticate())
        .put(app.api.user.removeUsers)

    app.route('/users/atualisa')
        .all(app.config.passport.authenticate())
        .put(app.api.user.updateUsers)

    app.route('/users/:users_id/toggle')
        .all(app.config.passport.authenticate())
        .get(app.api.user.toggleUsers)

    app.route('/users/:pessoa_id/pessoa')
        .all(app.config.passport.authenticate())
        .get(app.api.user.togglePessoaUsers)
//------------------------------------------------------------------------------        
    app.route('/sistemas')
        .all(app.config.passport.authenticate())
        .get(app.api.sistema.getSistemas)
        .post(app.api.sistema.saveSistemas)

    app.route('/sistemas/:sistemas_id/remove')
        .all(app.config.passport.authenticate())
        .put(app.api.sistema.removeSistemas)

    app.route('/sistemas/atualisa')
        .all(app.config.passport.authenticate())
        .put(app.api.sistema.updateSistemas)

    app.route('/sistemas/:sistemas_id/toggle')
        .all(app.config.passport.authenticate())
        .get(app.api.sistema.toggleSistemas)

    app.route('/sistemas/:sistemas_id/busca')
        .all(app.config.passport.authenticate())
        .get(app.api.sistema.buscaSistemas)
//------------------------------------------------------------------------------        
    app.route('/rotinas')
        .all(app.config.passport.authenticate())
        .get(app.api.rotina.getRotinas)
        .post(app.api.rotina.saveRotinas)

    app.route('/rotinas/:rotinas_id/remove')
        .all(app.config.passport.authenticate())
        .put(app.api.rotina.removeRotinas)

    app.route('/rotinas/atualisa')
        .all(app.config.passport.authenticate())
        .put(app.api.rotina.updateRotinas)

    app.route('/rotinas/:rotinas_id/toggle')
        .all(app.config.passport.authenticate())
        .get(app.api.rotina.toggleRotina)
//------------------------------------------------------------------------------        
    app.route('/acessos/:userId/:sistemaId/acesso')
        .all(app.config.passport.authenticate())
        .get(app.api.acesso.getAcessos)
        .post(app.api.acesso.addAcessos)

    app.route('/acessos/:acessos_id/cancelar')
        .all(app.config.passport.authenticate())
        .put(app.api.acesso.cancelaAcesso)

    app.route('/acessos/:userId/:rotinaId/rotina')
        .all(app.config.passport.authenticate())
        .get(app.api.acesso.getAcessoRot)

//------------------------------------------------------------------------------        

    app.route('/acessoemps/:users_id/acessoemp')
        .all(app.config.passport.authenticate())
        .get(app.api.acessoemps.getAcessoemps)

    app.route('/acessoemps/:users_id/:empresas_id/acessoemp')
        .all(app.config.passport.authenticate())
        .post(app.api.acessoemps.addAcessoemps)

    app.route('/acessoemps/:acessoemps_id/cancelar')
        .all(app.config.passport.authenticate())
        .put(app.api.acessoemps.cancelaAcessoemps)

//------------------------------------------------------------------------------
//------------------------------Auditoria---------------------------------------
//------------------------------------------------------------------------------        
    app.route('/selos')
        .all(app.config.passport.authenticate())
        .get(app.api.selo.getSelos)
        .post(app.api.selo.saveSelos)

    app.route('/selos/atualisa')
        .all(app.config.passport.authenticate())
        .put(app.api.selo.updateSelos)

    app.route('/selos/:selos_id/buscaSelo')
        .all(app.config.passport.authenticate())
        .get(app.api.selo.buscaSelo)

//------------------------------------------------------------------------------
    app.route('/localizacaos')
        .all(app.config.passport.authenticate())
        .get(app.api.localizacao.getLocalizacao)
        .post(app.api.localizacao.saveLocalizacao)

    app.route('/localizacaos/:localizacaos_id/buscaLocalizacaos')
        .all(app.config.passport.authenticate())
        .get(app.api.localizacao.buscaLocalizacao)

//------------------------------------------------------------------------------
    app.route('/lixos')
        .all(app.config.passport.authenticate())
        .get(app.api.lixo.getLixos)
        .post(app.api.lixo.saveLixos)

    app.route('/lixos/atualisa')
        .all(app.config.passport.authenticate())
        .put(app.api.lixo.updateLixos)

    app.route('/lixos/:lixos_id/buscalixo')
        .all(app.config.passport.authenticate())
        .get(app.api.lixo.buscaLixo)

//------------------------------------------------------------------------------
    app.route('/notas')
        .all(app.config.passport.authenticate())
        .get(app.api.nota.getNotas)
        .post(app.api.nota.saveNotas)

    app.route('/notas/atualisa')
        .all(app.config.passport.authenticate())
        .put(app.api.nota.updateNotas)

    app.route('/notas/:notas_id/buscaNota')
        .all(app.config.passport.authenticate())
        .get(app.api.nota.buscaNota)

//------------------------------------------------------------------------------
    app.route('/protocolos')
        .all(app.config.passport.authenticate())
        .get(app.api.protocolo.getProtocolos)
        .post(app.api.protocolo.saveProtocolos)

    app.route('/protocolos/atualisa')
        .all(app.config.passport.authenticate())
        .put(app.api.protocolo.updateProtocolos)

    app.route('/protocolos/:protocolos_id/buscaProtocolo')
        .all(app.config.passport.authenticate())
        .get(app.api.protocolo.buscaProtocolo)
//------------------------------------------------------------------------------
    app.route('/armarios')
        .all(app.config.passport.authenticate())
        .get(app.api.armario.getArmarios)
        .post(app.api.armario.saveArmarios)

    app.route('/armarios/atualisa')
        .all(app.config.passport.authenticate())
        .put(app.api.armario.updateArmarios)

    app.route('/armarios/:armarios_id/buscaArmario')
        .all(app.config.passport.authenticate())
        .get(app.api.armario.buscaArmario)

//------------------------------------------------------------------------------
    app.route('/caixas')
        .all(app.config.passport.authenticate())
        .get(app.api.caixa.getCaixas)
        .post(app.api.caixa.saveCaixas)

    app.route('/caixas/atualisa')
        .all(app.config.passport.authenticate())
        .put(app.api.caixa.updateCaixas)

    app.route('/caixas/:caixas_id/buscaCaixa')
        .all(app.config.passport.authenticate())
        .get(app.api.caixa.buscaCaixa)
//------------------------------------------------------------------------------
    app.route('/malote_trocos')
        .all(app.config.passport.authenticate())
        .get(app.api.malote_troco.getMalote_trocos)
        .post(app.api.malote_troco.saveMalote_trocos)

    app.route('/malote_trocos/atualisa')
        .all(app.config.passport.authenticate())
        .put(app.api.malote_troco.updateMalote_trocos)

    app.route('/malote_trocos/:malote_trocos_id/buscaMalote_troco')
        .all(app.config.passport.authenticate())
        .get(app.api.malote_troco.buscaMalote_troco)
//------------------------------------------------------------------------------
    app.route('/cofres')
        .all(app.config.passport.authenticate())
        .get(app.api.cofre.getCofres)
        .post(app.api.cofre.saveCofres)

    app.route('/cofres/atualisa')
        .all(app.config.passport.authenticate())
        .put(app.api.cofre.updateCofres)

    app.route('/cofres/:cofres_id/buscaCofre')
        .all(app.config.passport.authenticate())
        .get(app.api.cofre.buscaCofre)
//------------------------------------------------------------------------------
    app.route('/extintores')
        .all(app.config.passport.authenticate())
        .get(app.api.extintore.getExtintores)
        .post(app.api.extintore.saveExtintores)

    app.route('/extintores/atualisa')
        .all(app.config.passport.authenticate())
        .put(app.api.extintore.updateExtintores)

    app.route('/extintores/:extintores_id/buscaExtintore')
        .all(app.config.passport.authenticate())
        .get(app.api.extintore.buscaExtintore)
//------------------------------------------------------------------------------
    app.route('/sensores')
        .all(app.config.passport.authenticate())
        .get(app.api.sensore.getSensores)
        .post(app.api.sensore.saveSensores)

    app.route('/sensores/atualisa')
        .all(app.config.passport.authenticate())
        .put(app.api.sensore.updateSensores)

    app.route('/sensores/:sensores_id/buscaSensore')
        .all(app.config.passport.authenticate())
        .get(app.api.sensore.buscaSensore)
//------------------------------------------------------------------------------
    app.route('/geradores')
        .all(app.config.passport.authenticate())
        .get(app.api.geradore.getGeradores)
        .post(app.api.geradore.saveGeradores)

    app.route('/geradores/atualisa')
        .all(app.config.passport.authenticate())
        .put(app.api.geradore.updateGeradores)

    app.route('/geradores/:geradores_id/buscaGeradore')
        .all(app.config.passport.authenticate())
        .get(app.api.geradore.buscaGeradore)

//------------------------------------------------------------------------------
    app.route('/baixa_estoques')
        .all(app.config.passport.authenticate())
        .get(app.api.baixa_estoque.getBaixa_estoques)
        .post(app.api.baixa_estoque.saveBaixa_estoques)

    app.route('/baixa_estoques/atualisa')
        .all(app.config.passport.authenticate())
        .put(app.api.baixa_estoque.updateBaixa_estoques)

    app.route('/baixa_estoques/:baixa_estoques_id/buscaBaixa_estoque')
        .all(app.config.passport.authenticate())
        .get(app.api.baixa_estoque.buscaBaixa_estoque)

//------------------------------------------------------------------------------

    app.route('/validades')
        .all(app.config.passport.authenticate())
        .get(app.api.validade.getValidades)
        .post(app.api.validade.saveValidades)

    app.route('/validades/atualisa')
        .all(app.config.passport.authenticate())
        .put(app.api.validade.updateValidades)

    app.route('/validades/:validades_id/buscaValidade')
        .all(app.config.passport.authenticate())
        .get(app.api.validade.buscaValidade)

//------------------------------------------------------------------------------
    app.route('/imagens')
        .all(app.config.passport.authenticate())
        .get(app.api.imagen.getImagens)
        .post(app.api.imagen.saveImagens)

    app.route('/imagens/atualisa')
        .all(app.config.passport.authenticate())
        .put(app.api.imagen.updateImagens)

    app.route('/imagens/:imagens_id/buscaImagen')
        .all(app.config.passport.authenticate())
        .get(app.api.imagen.buscaImagen)

//------------------------------------------------------------------------------
//---------------------------Controle-------------------------------------------
//------------------------------------------------------------------------------
    app.route('/temperaturas')
        .all(app.config.passport.authenticate())
        .get(app.api.temperatura.getTemperaturas)
        .post(app.api.temperatura.saveTemperaturas)

    app.route('/temperaturas/atualisa')
        .all(app.config.passport.authenticate())
        .put(app.api.temperatura.updateTemperaturas)

    app.route('/temperaturas/:temperaturas_id/buscaTemperatura')
        .all(app.config.passport.authenticate())
        .get(app.api.temperatura.buscaTemperatura)

//------------------------------------------------------------------------------
    app.route('/prest_servicos')
        .all(app.config.passport.authenticate())
        .get(app.api.prest_servico.getPrest_servicos)
        .post(app.api.prest_servico.savePrest_servicos)

    app.route('/prest_servicos/atualisa')
        .all(app.config.passport.authenticate())
        .put(app.api.prest_servico.updatePrest_servicos)

    app.route('/prest_servicos/:prest_servicos_id/buscaPrest_servico')
        .all(app.config.passport.authenticate())
        .get(app.api.prest_servico.buscaPrest_servico)

//------------------------------------------------------------------------------
    app.route('/agendamentos')
        .all(app.config.passport.authenticate())
        .get(app.api.agendamento.getAgendamentos)
        .post(app.api.agendamento.saveAgendamentos)

    app.route('/agendamentos/atualisa')
        .all(app.config.passport.authenticate())
        .put(app.api.agendamento.updateAgendamentos)

    app.route('/agendamentos/:agendamentos_id/buscaAgendamento')
        .all(app.config.passport.authenticate())
        .get(app.api.agendamento.buscaAgendamento)

//------------------------------------------------------------------------------
    app.route('/doacaos')
        .all(app.config.passport.authenticate())
        .get(app.api.doacao.getDoacaos)
        .post(app.api.doacao.saveDoacaos)

    app.route('/doacaos/atualisa')
        .all(app.config.passport.authenticate())
        .put(app.api.doacao.updateDoacaos)

    app.route('/doacaos/:doacaos_id/buscaDoacao')
        .all(app.config.passport.authenticate())
        .get(app.api.doacao.buscaDoacao)

//------------------------------------------------------------------------------
    app.route('/papelaos')
        .all(app.config.passport.authenticate())
        .get(app.api.papelao.getPapelaos)
        .post(app.api.papelao.savePapelaos)

    app.route('/papelaos/atualisa')
        .all(app.config.passport.authenticate())
        .put(app.api.papelao.updatePapelaos)

    app.route('/papelaos/:papelaos_id/buscaPapelao')
        .all(app.config.passport.authenticate())
        .get(app.api.papelao.buscaPapelao)

//------------------------------------------------------------------------------
    app.route('/recebimentos')
        .all(app.config.passport.authenticate())
        .get(app.api.recebimento.getRecebimentos)
        .post(app.api.recebimento.saveRecebimentos)

    app.route('/recebimentos/atualisa')
        .all(app.config.passport.authenticate())
        .put(app.api.recebimento.updateRecebimentos)

    app.route('/recebimentos/:recebimentos_id/buscaRecebimento')
        .all(app.config.passport.authenticate())
        .get(app.api.recebimento.buscaRecebimento)

//------------------------------------------------------------------------------
    app.route('/transferencias')
        .all(app.config.passport.authenticate())
        .get(app.api.transferencia.getTransferencias)
        .post(app.api.transferencia.saveTransferencias)

    app.route('/transferencias/atualisa')
        .all(app.config.passport.authenticate())
        .put(app.api.transferencia.updateTransferencias)

    app.route('/transferencias/:transferencias_id/buscaTransferencia')
        .all(app.config.passport.authenticate())
        .get(app.api.transferencia.buscaTransferencia)

//------------------------------------------------------------------------------
    app.route('/comodatos')
        .all(app.config.passport.authenticate())
        .get(app.api.comodato.getComodatos)
        .post(app.api.comodato.saveComodatos)

    app.route('/comodatos/atualisa')
        .all(app.config.passport.authenticate())
        .put(app.api.comodato.updateComodatos)

    app.route('/comodatos/:comodatos_id/buscaComodato')
        .all(app.config.passport.authenticate())
        .get(app.api.comodato.buscaComodato)

//------------------------------------------------------------------------------
    app.route('/recuperados')
        .all(app.config.passport.authenticate())
        .get(app.api.recuperado.getRecuperados)
        .post(app.api.recuperado.saveRecuperados)

    app.route('/recuperados/atualisa')
        .all(app.config.passport.authenticate())
        .put(app.api.recuperado.updateRecuperados)

    app.route('/recuperados/:recuperados_id/buscaRecuperado')
        .all(app.config.passport.authenticate())
        .get(app.api.recuperado.buscaRecuperado)

//------------------------------------------------------------------------------
    app.route('/cancelamentos')
        .all(app.config.passport.authenticate())
        .get(app.api.cancelamento.getCancelamentos)
        .post(app.api.cancelamento.saveCancelamentos)

    app.route('/cancelamentos/atualisa')
        .all(app.config.passport.authenticate())
        .put(app.api.cancelamento.updateCancelamentos)

    app.route('/cancelamentos/:cancelamentos_id/buscaCancelamento')
        .all(app.config.passport.authenticate())
        .get(app.api.cancelamento.buscaCancelamento)

//------------------------------------------------------------------------------
    app.route('/canc_descontos')
        .all(app.config.passport.authenticate())
        .get(app.api.canc_desconto.getCanc_descontos)
        .post(app.api.canc_desconto.saveCanc_descontos)

    app.route('/canc_descontos/atualisa')
        .all(app.config.passport.authenticate())
        .put(app.api.canc_desconto.updateCanc_descontos)

    app.route('/canc_descontos/:canc_descontos_id/buscaCanc_desconto')
        .all(app.config.passport.authenticate())
        .get(app.api.canc_desconto.buscaCanc_desconto)

//------------------------------------------------------------------------------
    app.route('/controle_descontos')
        .all(app.config.passport.authenticate())
        .get(app.api.controle_desconto.getControle_descontos)
        .post(app.api.controle_desconto.saveControle_descontos)

    app.route('/controle_descontos/atualisa')
        .all(app.config.passport.authenticate())
        .put(app.api.controle_desconto.updateControle_descontos)

    app.route('/controle_descontos/:controle_descontos_id/buscaControle_desconto')
        .all(app.config.passport.authenticate())
        .get(app.api.controle_desconto.buscaControle_desconto)

//------------------------------------------------------------------------------
    app.route('/reg_precos')
        .all(app.config.passport.authenticate())
        .get(app.api.reg_preco.getReg_precos)
        .post(app.api.reg_preco.saveReg_precos)

    app.route('/reg_precos/atualisa')
        .all(app.config.passport.authenticate())
        .put(app.api.reg_preco.updateReg_precos)

    app.route('/reg_precos/:reg_precos_id/buscaReg_preco')
        .all(app.config.passport.authenticate())
        .get(app.api.reg_preco.buscaReg_preco)

//------------------------------------------------------------------------------
    app.route('/controle_furtos')
        .all(app.config.passport.authenticate())
        .get(app.api.controle_furto.getControle_furtos)
        .post(app.api.controle_furto.saveControle_furtos)

    app.route('/controle_furtos/atualisa')
        .all(app.config.passport.authenticate())
        .put(app.api.controle_furto.updateControle_furtos)

    app.route('/controle_furtos/:controle_furtos_id/buscaControle_furto')
        .all(app.config.passport.authenticate())
        .get(app.api.controle_furto.buscaControle_furto)

//------------------------------------------------------------------------------
    app.route('/troca_devolucaos')
        .all(app.config.passport.authenticate())
        .get(app.api.troca_devolucao.getTroca_devolucaos)
        .post(app.api.troca_devolucao.saveTroca_devolucaos)

    app.route('/troca_devolucaos/atualisa')
        .all(app.config.passport.authenticate())
        .put(app.api.troca_devolucao.updateTroca_devolucaos)

    app.route('/troca_devolucaos/:troca_devolucaos_id/buscaTroca_devolucao')
        .all(app.config.passport.authenticate())
        .get(app.api.troca_devolucao.buscaTroca_devolucao)

//------------------------------------------------------------------------------
    app.route('/esquecimentos')
        .all(app.config.passport.authenticate())
        .get(app.api.esquecimento.getEsquecimentos)
        .post(app.api.esquecimento.saveEsquecimentos)

    app.route('/esquecimentos/atualisa')
        .all(app.config.passport.authenticate())
        .put(app.api.esquecimento.updateEsquecimentos)

    app.route('/esquecimentos/:esquecimentos_id/buscaEsquecimento')
        .all(app.config.passport.authenticate())
        .get(app.api.esquecimento.buscaEsquecimento)

//------------------------------------------------------------------------------
    app.route('/sangrias')
        .all(app.config.passport.authenticate())
        .get(app.api.sangria.getSangrias)
        .post(app.api.sangria.saveSangrias)

    app.route('/sangrias/atualisa')
        .all(app.config.passport.authenticate())
        .put(app.api.sangria.updateSangrias)

    app.route('/sangrias/:sangrias_id/buscaSangria')
        .all(app.config.passport.authenticate())
        .get(app.api.sangria.buscaSangria)

//------------------------------------------------------------------------------
    app.route('/acerto_caixas')
        .all(app.config.passport.authenticate())
        .get(app.api.acerto_caixa.getAcerto_caixas)
        .post(app.api.acerto_caixa.saveAcerto_caixas)

    app.route('/caixas/atualisa')
        .all(app.config.passport.authenticate())
        .put(app.api.acerto_caixa.updateAcerto_caixas)

    app.route('/caixas/:caixas_id/buscaCaixa')
        .all(app.config.passport.authenticate())
        .get(app.api.acerto_caixa.buscaAcerto_caixa)

//------------------------------------------------------------------------------
    app.route('/tesourarias')
        .all(app.config.passport.authenticate())
        .get(app.api.tesouraria.getTesourarias)
        .post(app.api.tesouraria.saveTesourarias)

    app.route('/tesourarias/atualisa')
        .all(app.config.passport.authenticate())
        .put(app.api.tesouraria.updateTesourarias)

    app.route('/tesourarias/:tesourarias_id/buscaTesouraria')
        .all(app.config.passport.authenticate())
        .get(app.api.tesouraria.buscaTesouraria)

//------------------------------------------------------------------------------
    app.route('/circulantes')
        .all(app.config.passport.authenticate())
        .get(app.api.circulante.getCirculantes)
        .post(app.api.circulante.saveCirculantes)

    app.route('/circulantes/atualisa')
        .all(app.config.passport.authenticate())
        .put(app.api.circulante.updateCirculantes)

    app.route('/circulantes/:circulantes_id/buscaCirculante')
        .all(app.config.passport.authenticate())
        .get(app.api.circulante.buscaCirculante)

//------------------------------------------------------------------------------
    app.route('/epis')
        .all(app.config.passport.authenticate())
        .get(app.api.epi.getEpis)
        .post(app.api.epi.saveEpis)

    app.route('/epis/atualisa')
        .all(app.config.passport.authenticate())
        .put(app.api.epi.updateEpis)

    app.route('/epis/:epis_id/buscaEpi')
        .all(app.config.passport.authenticate())
        .get(app.api.epi.buscaEpi)

//------------------------------------------------------------------------------
    app.route('/patrimonios')
        .all(app.config.passport.authenticate())
        .get(app.api.patrimonio.getPatrimonios)
        .post(app.api.patrimonio.savePatrimonios)

    app.route('/patrimonios/atualisa')
        .all(app.config.passport.authenticate())
        .put(app.api.patrimonio.updatePatrimonios)

    app.route('/patrimonios/:patrimonios_id/buscaPatrimonio')
        .all(app.config.passport.authenticate())
        .get(app.api.patrimonio.buscaPatrimonio)

//------------------------------------------------------------------------------
    app.route('/emprestimos')
        .all(app.config.passport.authenticate())
        .get(app.api.emprestimo.getEmprestimos)
        .post(app.api.emprestimo.saveEmprestimos)

    app.route('/emprestimos/atualisa')
        .all(app.config.passport.authenticate())
        .put(app.api.emprestimo.updateEmprestimos)

    app.route('/emprestimos/:emprestimos_id/buscaEmprestimo')
        .all(app.config.passport.authenticate())
        .get(app.api.emprestimo.buscaEmprestimo)

//------------------------------------------------------------------------------
    app.route('/manifestos')
        .all(app.config.passport.authenticate())
        .get(app.api.manifesto.getManifestos)
        .post(app.api.manifesto.saveManifestos)

    app.route('/manifestos/atualisa') 
        .all(app.config.passport.authenticate())
        .put(app.api.manifesto.updateManifestos)

    app.route('/manifestos/:manifestos_id/buscaManifesto')
        .all(app.config.passport.authenticate())
        .get(app.api.manifesto.buscaManifesto)

//------------------------------------------------------------------------------
//---------------------------Uploud Imagens-------------------------------------
//------------------------------------------------------------------------------
    app.post("/uplouds", multer(multerConfig).single('file'), (req, res) => {
//        const { originalname: name, size, filename: key, location: url = "" } = req.file
        console.log(req.file);        
        return res.json(req.file);
    }); 
//-----------------------------------------------------------------------------
}