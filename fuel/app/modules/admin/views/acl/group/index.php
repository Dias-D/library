<h3 class="portlet-title">
    <u>
        Grupos
    </u>
</h3>
<?php if (\Auth::has_access('admin.group[create]')): ?>
    <div class="row">
        <div class="form-group">
            <div class="pull-right">
                <div class="col-md-12">                                 
                    <?php echo Html::anchor('admin/acl/group/create', '<i class="fa fa-plus"></i> Novo', array('class' => 'btn btn-secondary')); ?>
                </div> 
            </div>
        </div> 
    </div>
<?php endif; ?>
<br>

<?php if ($usersGroups): ?>
    <table class="table table-striped table-bordered datatable">
        <thead>
            <tr>
                <th class="text-center">Nome</th>
                <th>&nbsp;</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($usersGroups as $item): ?>	
                <tr>
                    <td class="text-center valign-middle"><?php echo $item->name; ?></td>
                    <td class="text-center valign-middle">
                        <?php if (!in_array($item->id, $disallowedEditDelete)): ?>
                            <?php \Auth::has_access('admin.group[update]') && print Html::anchor('admin/acl/group/edit/' . $item->id, '<i class="icon-wrench"></i> Editar', array('class' => 'btn btn-default btn-sm')); ?>			
                            <?php \Auth::has_access('admin.group[delete]') && print Html::anchor('admin/acl/group/delete/' . $item->id, '<i class="icon-trash icon-white"></i> Remover', array('class' => 'btn btn-sm btn-danger', 'onclick' => "return confirm('Esta certo disso?')")); ?>	
                        <?php else: ?>
                            <?php echo Html::anchor('#', '<i class="icon-wrench"></i> Editar', array('class' => 'btn btn-default btn-sm', 'disabled' => 'disabled')); ?>			
                            <?php echo Html::anchor('#', '<i class="icon-trash icon-white"></i> Remover', array('class' => 'btn btn-sm btn-danger', 'disabled' => 'disabled')); ?>	
                        <?php endif; ?>
                    </td>
                </tr>
            <?php endforeach; ?>	
        </tbody>
    </table>

<?php else: ?>
    <p>
        Não há grupos cadastrados
    </p>
<?php endif; ?>
