<br />
<div class="block">
    <div class="block-content">
        <h3 class="portlet-title">
            <u>Usuários</u>
        </h3>
        <?php if (\Auth::has_access('user.user[create]')): ?>
            <div class="row">
                <div class="form-group">
                    <div class="pull-right">
                        <div class="col-md-12">                                 
                            <?php echo Html::anchor('user/create', '<i class="fa fa-plus"></i> Inserir', array('class' => 'btn btn-secondary')); ?>
                        </div> 
                    </div>
                </div> 
            </div>
        <?php endif; ?>

        <br>
        <?php if ($users): ?>
            <div class="table-responsive">
                <table class="table table-bordered table-hover datatable">
                    <thead>
                        <tr>
                            <th class="text-center">Usuário</th>
                            <th class="text-center">Grupo</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($users as $item): ?>	
                            <tr>
                                <td class="text-center"><?php echo $item->username; ?></td>
                                <td class="text-center"><?php echo $item->group->name; ?></td>
                                <td class="text-center">
                                    <div class="btn-group">
                                        <?php if (\Auth::has_access('user.user[create]')): ?>
                                            <?php echo Html::anchor('user/edit/' . $item->id, '<i class="icon-wrench"></i> Editar', array('class' => 'btn btn-default btn-sm')); ?>
                                        <?php endif; ?>

                                        <?php if (\Auth::has_access('user.user[reset_password]')): ?>
                                            <?php print Html::anchor("user/resetpassword/{$item->id}", 'Resetar Senha', array('class' => 'btn btn-sm btn-default', 'title' => 'Resetar Senha')); ?>
                                        <?php endif; ?>

                                        <?php if (\Auth::has_access('user.user[delete]')): ?>
                                            <?php echo Html::anchor('', '<i class="icon-trash icon-white"></i> Deletar', array('data-url' => 'user/delete/' . $item->id, 'class' => 'btn btn-sm btn-danger btn-delete', 'onclick' => "return false;")); ?>
                                        <?php endif; ?>
                                    </div>
                                </td>
                            </tr>
                        <?php endforeach; ?>	
                    </tbody>
                </table>
            </div>

        <?php else: ?>
            <p>Não há usuarios no cadastro.</p>
        <?php endif; ?>
    </div>
</div>
