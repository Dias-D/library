<div class="portlet">
    <h3 class="portlet-title">
        <u>Autores</u>
    </h3>

    <?php if (\Auth::has_access('library.author[create]')): ?>
    <div class="row">
        <div class="form-group">
            <div class="pull-right">
                <div class="col-md-12">
                    <?php echo Html::anchor('library/author/create', '<i class="fa fa-plus"></i> Novo', array('class' => 'btn btn-secondary')); ?>
                </div>
            </div>
        </div>
    </div>
    <?php endif; ?>

    <br><br>
    <?php if ($author): ?>
    <div class="table-responsive">
        <table class="table table-bordered table-striped datatable">
            <thead>
                <tr>
                    <th class="text-center">Nome</th>
                    <th class="text-center">Sigla</th>
                    <th class="text-center">Status</th>
                    <th class="text-center">&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($author as $item): ?>
                <tr>
                    <td class="text-center"><?php echo $item->name; ?></td>
                    <td class="text-center"><?php echo $item->acronym; ?></td>
                    <td class="text-center"><?php echo ($item->active == 1) ? 'Ativo' : 'Inativo'; ?></td>
                    <td class="text-center">
                        <div class="btn-group">
                            <?php if (\Auth::has_access('library.author[update]')): ?>
                                <?php echo Html::anchor('library/author/edit/' . $item->id, '<i class="icon-wrench"></i> Editar', array('class' => 'btn btn-default btn-sm')); ?>
                            <?php endif; ?>
                            <?php if (\Auth::has_access('library.author[delete]')): ?>
                                <?php echo Html::anchor('javascript:void(0);', '<i class="icon-trash icon-white"></i> Remover', array('data-url' => 'author/delete/' . $item->id, 'class' => 'btn btn-sm btn-danger btn-delete')); ?>
                            <?php endif ?>
                        </div>
                    </td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>

    <?php else: ?>
    <p class="text-center">Não há Autores cadastrados</p>
    <?php endif; ?>
</div>