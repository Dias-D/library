<?php echo Form::open(array("class" => "")); ?>

<div class="row">
    <div class="form-group">
        <div class="col-sm-3">
            <?php echo Form::label('Nome', 'name', array('class' => 'control-label')); ?>

            <?php echo Form::input('name', Input::post('name', isset($usersGroup) ? $usersGroup->name : ''), array('class' => 'col-md-4 form-control', 'placeholder' => __('name'))); ?>
        </div>
    </div>
</div>

<br>

<div class="row">
    <div class="form-group">
        <div class="col-sm-3">
            <?php echo Form::submit('submit', 'Salvar', array('class' => 'btn btn-secondary')); ?>	
            <?php echo Html::anchor('admin/acl/group', 'Cancelar', array('class' => 'btn btn-danger')); ?>
        </div>
    </div>
</div>
<?php echo Form::close(); ?>