module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
//---------------------------------------------------------------------
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
    app.route('/empresas')
        .all(app.config.passport.authenticate())
        .get(app.api.empresa.getEmpresas)
        .post(app.api.empresa.save)

    app.route('/empresas/:id')
        .all(app.config.passport.authenticate())
        .delete(app.api.empresa.remove)

    app.route('/empresas/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.empresa.update)
//------------------------------------------------------------------------------        
app.route('/acessos')
.all(app.config.passport.authenticate())
.get(app.api.acesso.getAcessos)
.post(app.api.acesso.save)

app.route('/acessos/:id')
.all(app.config.passport.authenticate())
.delete(app.api.acesso.remove)

app.route('/acessos/:id')
.all(app.config.passport.authenticate())
.put(app.api.acesso.update)
//------------------------------------------------------------------------------        
app.route('/pessoas')
.all(app.config.passport.authenticate())
.get(app.api.pessoa.getPessoas)
.post(app.api.pessoa.save)

app.route('/pessoas/:id')
.all(app.config.passport.authenticate())
.delete(app.api.pessoa.remove)

app.route('/pessoas/:id')
.all(app.config.passport.authenticate())
.put(app.api.pessoa.update)
//------------------------------------------------------------------------------        
app.route('/rotinas')
.all(app.config.passport.authenticate())
.get(app.api.rotina.getRotinas)
.post(app.api.rotina.save)

app.route('/rotinas/:id')
.all(app.config.passport.authenticate())
.delete(app.api.rotina.remove)

app.route('/rotinas/:id')
.all(app.config.passport.authenticate())
.put(app.api.rotina.update)
//------------------------------------------------------------------------------        
app.route('/sistemas')
.all(app.config.passport.authenticate())
.get(app.api.sistema.getSistemas)
.post(app.api.sistema.save)

app.route('/sistemas/:id')
.all(app.config.passport.authenticate())
.delete(app.api.sistema.remove)

app.route('/sistemas/:id')
.all(app.config.passport.authenticate())
.put(app.api.sistema.update)
//------------------------------------------------------------------------------        
}