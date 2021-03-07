<div class="portlet">
    <h3 class="portlet-title">
        <u>Editoras</u>
    </h3>

    <?php if (\Auth::has_access('library.book[create]')): ?>
    <div class="row">
        <div class="form-group">
            <div class="pull-right">
                <div class="col-md-12">
                    <?php echo Html::anchor('library/book/create', '<i class="fa fa-plus"></i> Novo', array('class' => 'btn btn-secondary')); ?>
                </div>
            </div>
        </div>
    </div>
    <?php endif; ?>

    <br><br>
    <?php if ($book): ?>
    <div class="table-responsive">
        <table class="table table-bordered table-striped datatable">
            <thead>
                <tr>
                    <th class="text-center">Autor</th>
                    <th class="text-center">Editor</th>
                    <th class="text-center">Nome</th>
                    <th class="text-center">Status</th>
                    <th class="text-center">&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($book as $item): ?>
                <tr>
                    <td class="text-center"><?php echo $item->author->name; ?></td>
                    <td class="text-center"><?php echo $item->publisher->name; ?></td>
                    <td class="text-center"><?php echo $item->name; ?></td>
                    <td class="text-center"><?php echo $item->active; ?></td>
                    <td class="text-center">
                        <div class="btn-group">
                            <?php if (\Auth::has_access('library.book[update]')): ?>
                                <?php echo Html::anchor('library/book/edit/' . $item->id, '<i class="icon-wrench"></i> Editar', array('class' => 'btn btn-default btn-sm')); ?>
                            <?php endif; ?>
                            <?php if (\Auth::has_access('library.book[delete]')): ?>
                                <?php echo Html::anchor('javascript:void(0);', '<i class="icon-trash icon-white"></i> Remover', array('data-url' => 'book/delete/' . $item->id, 'class' => 'btn btn-sm btn-danger btn-delete')); ?>
                            <?php endif ?>
                        </div>
                    </td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>

    <?php else: ?>
    <p class="text-center">Não há Livros cadastrados</p>
    <?php endif; ?>
</div>