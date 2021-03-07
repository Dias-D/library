<style>
    .inner-table{
        margin: 0 !important;
        padding: 0 !important;
    } 
    .inner-table td {
        border: none !important;
        width: 250px;
    }
    .inner-table .border-left {
        border-left: 1px solid #ccc !important;
    }

    .inner-table tr:not(:last-child) td {
        border-bottom: 1px solid #ccc !important;
    }

    .td-actions {
        width: 500px !important;
    }
</style>

<h3 class="portlet-title">
    <u>Permissões de grupo</u>
</h3>

<?php if (isset($groupId) && !empty($groupId)): /* Exists a groupId ? */ ?>

    <?php if (count($perms)): ?>
        <form class="" method="post" action="grouppermission/save">
            <input type="hidden" name="group_id" value="<?php echo $groupId; ?>" />
            <table class="table table-striped table-bordered thumbnail-table">
                <thead>
                    <tr>
                        <th class="text-center"><?php echo __('table.module'); ?></th>
                        <th class="text-center" style="width: 250px;"><?php echo __('table.screen'); ?></th>
                        <th class="text-center td-actions"><?php echo __('table.actions'); ?></th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($perms as $module => $areas): ?>
                        <tr>
                            <td class="text-center valign-middle">
                                <?php echo __('table.modules.' . $module); ?>
                            </td>
                            <td colspan="2" style="padding: 0;">
                                <table class="inner-table">
                                    <tbody>
                                        <?php foreach ($areas as $area => $actions): ?>
                                            <tr>
                                                <td class="text-center valign-middle">
                                                    <?php echo __('table.permission.' . $area); ?>
                                                </td>
                                                <td class="text-center valign-middle td-actions border-left">
                                                    <div class="form-group">
                                                        <div class="col-md-12">
                                                            <?php foreach ($actions['actions'] as $idx => $value): ?>
                                                                <div class="checkbox-inline">
                                                                    <label>
                                                                        <input <?php echo (isset($groupPerms[$actions['perm_id']]) && in_array($idx, $groupPerms[$actions['perm_id']]['actions'])) ? 'checked' : '' ?> value="<?php echo $value ?>" type="checkbox" name="perms[<?php echo $actions['perm_id']; ?>][<?php echo $idx; ?>]">
                                                                        <?php echo __('table.action.' . $value); ?>
                                                                    </label>
                                                                </div>
                                                            <?php endforeach; ?>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        <?php endforeach; ?>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>

            <?php if (\Auth::has_access('admin.grouppermission[update]')) : ?>
                <div class="form-group">
                    <?php echo Form::submit('submit', 'Salvar', array('class' => 'btn btn-secondary')); ?>	
                    <?php echo Html::anchor('admin/acl/grouppermission', __('cancel'), array('class' => 'btn btn-danger')); ?>
                </div>
            <?php endif; ?>
        </form>
    <?php else: ?>
        <table class="table table-striped table-bordered thumbnail-table">
            <thead>
            <th>&nbsp;</th>
        </thead>
        <tbody>
            <tr>
                <td class="text-center">
                    Não existe permissões cadastradas
                </td>
            </tr>
        </tbody>
        </table>
    <?php endif; ?>

<?php else: /* If not, you must select it (: */ ?>
    <?php echo Form::open(array("class" => "")); ?>

    <div class="row">
        <div class="form-group">
            <div class="col-md-3">
                <?php echo Form::label('Grupo', 'group_id', array('class' => 'control-label')); ?>
                <select id="group_id" name="group_id" class="form-control">
                    <option></option>
                    <?php foreach ($usersGroups as $item): ?>
                        <option value="<?php echo $item->id; ?>"><?php echo $item->name; ?></option>
                    <?php endforeach; ?>
                </select>
            </div>
        </div>
    </div>

    <br>

    <?php if (\Auth::has_access('admin.grouppermission[update]')) : ?>
        <div class="row">
            <div class="form-group">
                <div class="col-md-3">
                    <?php echo Form::submit('submit', 'Próximo', array('class' => 'btn btn-secondary')); ?>	
                </div>
            </div>
        </div>
    <?php endif; ?>
    <?php echo Form::close(); ?>
<?php endif; ?>
