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
        .get(app.api.rotina.toggleRotinas)
//------------------------------------------------------------------------------        
    app.route('/acessos')
        .all(app.config.passport.authenticate())
        .get(app.api.acesso.getAcessos)
        .post(app.api.acesso.saveAcessos)
/*
app.route('/acessos/:id')
.all(app.config.passport.authenticate())
.delete(app.api.acesso.remove)

app.route('/acessos/:id')
.all(app.config.passport.authenticate())
.put(app.api.acesso.update)
//------------------------------------------------------------------------------        
*/
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