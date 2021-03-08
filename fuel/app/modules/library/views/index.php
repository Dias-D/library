<div class="portlet">
    <h3 class="portlet-title">
        <u>Biblioteca</u>
    </h3>

    <?php if (\Auth::has_access('library.library[create]')): ?>
    <div class="row">
        <div class="form-group">
            <div class="pull-right">
                <div class="col-md-12">
                    <?php echo Html::anchor('library/create', '<i class="fa fa-plus"></i> Novo', array('class' => 'btn btn-secondary')); ?>
                </div>
            </div>
        </div>
    </div>
    <?php endif; ?>

    <br><br>
    <?php if ($library): ?>
    <div class="table-responsive">
        <table class="table table-bordered table-striped datatable">
            <thead>
                <tr>
                    <th class="text-center">Nome</th>
                    <th class="text-center">Descrição</th>
                    <th class="text-center">Status</th>
                    <th class="text-center">&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($library as $item): ?>
                <tr>
                    <td class="text-center"><?php echo $item->name; ?></td>
                    <td class="text-center"><?php echo $item->description; ?></td>
                    <td class="text-center"><?php echo $item->active; ?></td>
                    <td class="text-center">
                        <div class="btn-group">
                            <?php if (\Auth::has_access('library.library[update]')): ?>
                                <?php echo Html::anchor('library/edit/' . $item->id, '<i class="icon-wrench"></i> Editar', array('class' => 'btn btn-default btn-sm')); ?>
                            <?php endif; ?>
                            <?php if (\Auth::has_access('library.library[delete]')): ?>
                                <?php if($item->id == 1): ?>
                                    <?php echo Html::anchor('javascript:void(0);', '<i class="icon-trash icon-white"></i> Remover', array('class' => 'btn btn-sm btn-default')); ?>
                                <?php else: ?>
                                    <?php echo Html::anchor('javascript:void(0);', '<i class="icon-trash icon-white"></i> Remover', array('data-url' => 'library/delete/' . $item->id, 'class' => 'btn btn-sm btn-danger btn-delete')); ?>
                                <?php endif; ?>
                            <?php endif; ?>
                        </div>
                    </td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>

    <?php else: ?>
    <p class="text-center">Não há Bibliotecas cadastradas</p>
    <?php endif; ?>
</div>