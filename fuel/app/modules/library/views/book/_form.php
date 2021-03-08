<?php echo Form::open(array("class" => "")); ?>

<fieldset>
    <div class="row">
        <div class="form-group">
            <div class="col-md-3">
                <?php echo Form::label('Biblioteca', 'library', array('class' => 'control-label')); ?>
                <select name="library_id" class="col-md-4 form-control">
                    <option selected value="">Selecione...</option>
                    <?php foreach ($tplData['library'] as $item): ?>
                    <option <?php  (isset($book) && $book->library_id == $item->id) && print "selected";  ?>
                        value="<?php echo $item->id ?>"> <?php echo $item->name; ?></option>
                    <?php endforeach; ?>
                </select>
            </div>
            <div class="col-md-3">
                <?php echo Form::label('Autor', 'author', array('class' => 'control-label')); ?>
                <select name="author_id" class="col-md-4 form-control">
                    <option selected value="">Selecione...</option>
                    <?php foreach ($tplData['author'] as $item): ?>
                    <option <?php  (isset($book) && $book->author_id == $item->id) && print "selected";  ?>
                        value="<?php echo $item->id ?>"> <?php echo $item->name; ?></option>
                    <?php endforeach; ?>
                </select>
            </div>
            <div class="col-md-3">
                <?php echo Form::label('Editora', 'publisher', array('class' => 'control-label')); ?>
                <select name="publisher_id" class="col-md-4 form-control">
                    <option value="">Selecione...</option>
                    <?php foreach ($tplData['publisher'] as $item) : ?>
                    <option <?php (isset($book) && $book->publisher_id == $item->id) && print "selected"; ?>
                        value="<?php echo $item->id; ?>"><?php echo $item->name; ?></option>
                    <?php endforeach ?>
                </select>
            </div>
            <div class="col-md-3">
                <?php echo Form::label('Nome', 'name', array('class' => 'control-label')); ?>
                <?php echo Form::input('name', Input::post('name', isset($book) ? $book->name : ''), array('class' => 'col-md-4 form-control', 'placeholder' => 'Nome')); ?>
            </div>
            <div class="col-md-3">
                <?php echo Form::label('Status', 'active', array('class' => 'control-label')); ?>
                <select class="form-control" name="active" id="active">
                    <option value="">Selecione...</option>
                    <option <?php (isset($book) && $book->active == 1) && print 'selected'?> value="1">Ativo
                    </option>
                    <option <?php (isset($book) && $book->active == 0) && print 'selected'?> value="0">Inativo
                    </option>
                </select>
            </div>
        </div>
    </div>

    <br><br>

    <div class="form-group">
        <?php echo Form::submit('submit', 'Salvar', array('class' => 'btn btn-secondary')); ?>
        <?php echo Html::anchor('library/book', 'Cancelar', array('class' => 'btn btn-danger')); ?>
    </div>
</fieldset>
<?php echo Form::close(); ?>