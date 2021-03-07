<div class="portlet">

    <h3 class="portlet-title">
        <u>Registro de atividades</u>
    </h3>

    <form method="post">
        <div class="row">
            <div class="form-group">
                <div class="col-md-3">
                    <label>Data Início</label>
                    <input type="date" id="start_date" name="start_date" class="form-control parsley-validated" data-required="true" required>
                </div>

                <div class="col-md-3">
                    <label>Data Fim</label>
                    <input type="date" id="end_date" name="end_date" class="form-control parsley-validated" data-required="true" required>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="form-group">
                <div class="col-md-3">
                    <br><button type="submit" class="btn btn-secondary">
                        Buscar
                        <i class="fa fa-cog fa-spin hidden action-loader"></i>
                    </button>

                </div> 
            </div>
        </div>
    </form>

    <?php if (isset($records) && count($records)): ?>
        <br>
        <hr>

        <div class="table-responsive" style="overflow-x:auto;">
            <table class="table table-bordered table-hover" id="log-sheet">
                <thead>
                    <tr>
                        <td>Data</td>
                        <td>Usuário</td>
                        <td>Evento</td>
                        <td>Modulo</td>
                        <td>Registro Antigo</td>
                        <td>Registro Novo</td>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($records as $record): ?>
                        <tr>
                            <td><?php echo \Helper\Date::format($record->date); ?></td>
                            <td><?php echo $record->user->username; ?></td>
                            <td><?php echo $record->event ?></td>
                            <td><?php echo $record->module; ?></td>
                            <td><pre><?php echo $record->old_registry; ?></pre></td>
                            <td><pre><?php echo $record->new_registry ?></pre></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>

    <?php elseif (isset($records) && !count($records)): ?>
        <p class="text-center">
            Não houve resultados encontrados
        </p>
    <?php endif; ?>
</div>
