<style>
    .recipe-modal .modal-dialog {
        width: 85%;
    }

    .recipe-modal .modal-body {
        max-height: 400px;
        overflow-y: auto;
    }
</style>
<div class="portlet">
    <h4 class="portlet-title">
        <u>Gerenciamento de registros</u>
    </h4>

    <form method="post">
        <div class="row">
            <div class="form-group">
                <div class="col-md-2">
                    <label>Linha de produção</label>
                    <select id="production_line_id" name="production_line_id" class="form-control" required>
                        <option value="">- Selecione -</option>
                        <?php foreach ($productionLines as $item): ?>
                            <option value="<?php echo $item->id; ?>"><?php echo $item->name; ?></option>
                        <?php endforeach; ?>
                    </select>
                </div>

                <div class="col-md-2">
                    <label>Processo/Template</label>
                    <select id="machine_id" name="machine_id" class="form-control" required <?php (Input::post('machine_id') && (isset($variables_tag) && count($variables_tag))) && print 'readonly'; ?>>
                        <option value="">- Selecione -</option>
                    </select>
                </div>

                <div class="col-md-3">
                    <label>Data Início</label>
                    <input type="datetime-local" id="start_date" name="start_date" class="form-control parsley-validated" data-required="true" required disabled>
                </div> 

                <div class="col-md-3">
                    <label>Data Fim</label>
                    <input type="datetime-local" id="end_date" name="end_date" class="form-control parsley-validated" data-required="true" required disabled>
                </div> 
            </div>
        </div>

        <div class="row">
            <div class="form-group">
                <div class="col-md-3">
                    <br>
                    <button type="submit" class="btn btn-secondary">
                        Buscar
                        <i class="fa fa-cog fa-spin hidden action-loader"></i>
                    </button>
                </div> 
            </div>
        </div>
    </form>

    <br>

    <div class="portlet-body">
        <br>

        <?php if (isset($dataTable) && (count($dataTable['header']) && count($dataTable['data']))): ?>
            <input type="hidden" id="hidden_machine_id" value="<?php echo Input::post('machine_id', ''); ?>" />

            <div class="pull-right">
                <?php if (\Auth::has_access('admin.recordmanagement[update]')): ?>
                    <button id="edit-row"class="btn btn-secondary">Editar Selecionado</button>
                <?php endif; ?>

                <?php if (\Auth::has_access('admin.recordmanagement[delete]')): ?>
                    <button id="remove-row" class="btn btn-danger">Remover Selecionado(s)</button>
                <?php endif; ?>
            </div>
            <div class="clearfix"></div>
            <br>

            <div class="table-responsive" style="overflow-x:auto;">
                <table id="variable-values-tbl" class="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th width="100">
                                <input type="checkbox" id="select-all" />
                            </th>
                            <?php foreach ($dataTable['header'] as $h): ?>
                                <th class="text-center">
                                    <?php echo $h; ?>
                                </th>
                            <?php endforeach; ?>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($dataTable['data'] as $key => $item): ?>
                            <tr title="Clique para editar variáveis manuais" data-grouping-key="<?php echo $key; ?>">
                                <td class="text-center valign-middle"><input type="checkbox" /></td>
                                <?php
                                $currentIndex = 0;
                                foreach ($item as $val):
                                    ?>
                                    <td class="text-center valign-middle"><?php echo ($currentIndex > 2 && is_numeric($val)) ? number_format($val, 1, ',', '.') : $val; ?></td>

                                    <?php
                                    $currentIndex++;
                                endforeach;
                                ?>
                            </tr>
                        <?php endforeach; ?>	
                    </tbody>
                </table>
            </div>

        <?php endif; ?>
    </div> <!-- /.portlet-body -->      

    <br>
</div>

