<style>
    table  td {
        vertical-align: middle !important;
        text-align: center;
    }

    .reset-cell {
        margin: 0 !important;
        padding: 0 !important;
    }
    .inner-table{
        margin: 0 !important;
        padding: 0 !important;
        width: 100% ;
        border: none;
    }

    .inner-table td {
        border: none !important;
        /*width: 200px*/;
    }

    .inner-table .cell-border {
        border: 1px solid #ddd !important;
        border-left: none !important;
        border-top: none !important;
    }

    .inner-table tr:not(:last-child) td {
        border-bottom: 1px solid #ddd !important;
    }

    /*.inner-table .border-left {
        border-left: 1px solid #ccc !important;
    }

    */
</style>

<?php echo Form::open(array("class" => "form-horizontal")); ?>
<input type="hidden" name="id" value="<?php echo Input::post('id', isset($user) ? $user->id : '') ?>" />
<fieldset>
    <div class="row">
        <div class="col-sm-12">
            <div class="form-group">
                <div class="col-sm-2">
                    <?php echo Form::label('Nome de usuário', 'username', array('class' => 'control-label')); ?>
                    <?php echo Form::input('username', Input::post('username', isset($user) ? $user->username : ''), array('class' => 'col-md-4 form-control', 'placeholder' => 'Usuário')); ?>
                </div>

                <?php if ($isRoot): ?>
                    <div class="col-sm-2">
                        <?php echo Form::label('Grupo', 'group_id', array('class' => 'control-label', 'required')); ?>
                        <select name="group_id" id="group_id" class="form-control">
                            <option value=""></option>
                            <?php foreach ($roles as $item): ?>
                                <option <?php (isset($user) && $item->id == $user->group_id) && print "selected"; ?> value="<?php echo $item->id ?>"><?php echo __($item->name); ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </div>

    <hr>

    <h3 class="portlet-title">
        <u>Acessos de Máquina</u>
    </h3>
    <table class="table table-bordered">
        <thead>
            <tr>
                <th>Unidade de negócio</th>
                <th>Célula</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($groupedHierarchy as $unit => $cell): ?>
                <tr>
                    <td>
                        <?php echo $unit; ?>
                        <input type="checkbox" />
                    </td>
                    <td class="reset-cell">
                        <table class="inner-table">
                            <?php foreach ($cell as $cellName => $factory): ?>
                                <tr><!-- Cells -->
                                    <td class="cell-border" width="200">
                                        <?php echo $cellName; ?>
                                        <input type="checkbox" />
                                    </td>
                                    <td class="reset-cell" width="200"><!-- Factories  -->
                                        <table class="inner-table factories">
                                            <?php foreach ($factory as $facName => $productionLine): ?>
                                                <tr>
                                                    <td class="cell-border" width="200">
                                                        <?php echo $facName; ?>
                                                        <input type="checkbox" />
                                                    </td>
                                                    <td class="reset-cell" width="200"><!-- production lines -->
                                                        <table class="inner-table production-line">
                                                            <?php foreach ($productionLine as $lineName => $machines): ?>
                                                                <tr>
                                                                    <td class="cell-border" width="200">
                                                                        <?php echo $lineName; ?>
                                                                        <input type="checkbox" />
                                                                    </td>
                                                                    <td class="reset-cell" width="400"> <!-- machines -->
                                                                        <table class="inner-table machines">
                                                                            <?php foreach ($machines as $machineId => $machine): ?>
                                                                                <tr>
                                                                                    <td width="200">
                                                                                        <?php echo $machine; ?>
                                                                                        <input type="checkbox" name="machines[]" />
                                                                                    </td>
                                                                                </tr>
                                                                            <?php endforeach; ?>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            <?php endforeach; ?>
                                                        </table>
                                                    </td>
                                                </tr>
                                            <?php endforeach; ?>
                                        </table>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        </table>
                    </td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>

    <div class="form-group">
        <div class="col-sm-4">
            <?php echo Form::submit('submit', 'Salvar', array('class' => 'btn btn-secondary')); ?>
            <?php echo Html::anchor('user', 'Cancelar', array('class' => 'btn btn-danger')); ?>
        </div>
    </div>
</fieldset>
<?php echo Form::close(); ?>
