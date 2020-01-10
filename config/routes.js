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














app.route('/tasks')
.all(app.config.passport.authenticate())
.get(app.api.task.getTasks)
.post(app.api.task.save)

app.route('/tasks/:id')
.all(app.config.passport.authenticate())
.delete(app.api.task.remove)

app.route('/tasks/:id/toggle')
.all(app.config.passport.authenticate())
.put(app.api.task.toggleTask) 
//-----------------------------------------------------------------------------
}