<div class="portlet">
    <?php if (isset($book) && count($book)): ?>
    <h3 class="portlet-title">
        <u>
            Biblioteca
        </u>
    </h3>

    <table class="table table-bordered table-condensed datatable">
        <thead>
            <tr>
                <th class="text-center">Biblioteca</th>
                <th class="text-center">Autor/Sigla</th>
                <th class="text-center">Editora</th>
                <th class="text-center">Livro</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($book as $item): ?>
            <tr>
                <td class="text-center"><?php echo $item->library->name; ?></td>
                <td class="text-center"><?php echo $item->author->acronym; ?></td>
                <td class="text-center"><?php echo $item->publisher->name; ?></td>
                <td class="text-center"><?php echo $item->name; ?></td>
            </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
    <?php else: ?>
        <h3 class="portlet-title">
            <u>
                Biblioteca
            </u>
        </h3>
        <p class="text-center">Nenhum livro cadastrado.</p>
    <?php endif; ?>
</div>