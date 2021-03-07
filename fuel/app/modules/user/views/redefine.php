<br>

<div class="portlet">
    <form method="post">
        <h3 class="portlet-title">
            <u>Redefinir Senha</u>
        </h3>
        <div class="portlet-body">
            <div class="row">
                <div class="form-group">
                    <div class="col-md-2">
                        <label for="old-password">Senha atual</label>
                        <input type="password"  id="old-password" name="old_password" class="form-control parsley-validated" data-required="true">
                    </div>

                    <div class="col-md-2">
                        <label for="new-password">Nova senha</label>
                        <input id="new-password" type="password"  name="new_password" class="form-control parsley-validated" data-required="true">
                    </div>

                    <div class="col-md-2">
                        <label for="access">Confimar nova senha</label>
                        <input id="retype-new-password" type="password"  name="retype_new_password" class="form-control parsley-validated" data-required="true">
                    </div>
                </div> <!-- /.form-group -->
            </div>

            <br />
            <div class="row">
                <div class="pull-left">
                    <div class="col-md-12">
                        <br>
                        <button type="submit" class="btn btn-secondary">
                            Alterar
                            <span class="loader hidden">
                                <span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>
                                ...
                            </span>
                        </button>
                    </div> 
                </div>
            </div>
        </div> <!-- /.portlet-body -->
    </form>
</div>