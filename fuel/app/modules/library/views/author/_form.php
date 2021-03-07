<?php echo Form::open(array("class" => "")); ?>

<fieldset>
    <div class="row">
        <div class="form-group">
            <div class="col-md-3">
                <?php echo Form::label('Nome', 'name', array('class' => 'control-label')); ?>
                <?php echo Form::input('name', Input::post('name', isset($author) ? $author->name : ''), array('class' => 'col-md-4 form-control', 'placeholder' => 'Nome')); ?>
            </div>
            <div class="col-md-3">
                <?php echo Form::label('Sigla', 'acronym', array('class' => 'control-label')); ?>
                <?php echo Form::input('acronym', Input::post('acronym', isset($author) ? $author->acronym : ''), array('class' => 'col-md-4 form-control', 'placeholder' => 'Sigla')); ?>
            </div>
            <div class="col-md-3">
                <?php echo Form::label('Status', 'active', array('class' => 'control-label')); ?>
                <select class="form-control" name="active" id="active">
                    <option value="">Selecione...</option>
                    <option <?php (isset($author) && $author->active == 1) && print 'selected'?> 
                        value="1">Ativo</option>
                    <option <?php (isset($author) && $author->active == 0) && print 'selected'?> 
                        value="0">Inativo</option>
                </select>
            </div>
        </div>
    </div>

    <br><br>

    <div class="form-group">
        <?php echo Form::submit('submit', 'Salvar', array('class' => 'btn btn-secondary')); ?>
        <?php echo Html::anchor('library/author', 'Cancelar', array('class' => 'btn btn-danger')); ?>
    </div>
</fieldset>
<?php echo Form::close(); ?>