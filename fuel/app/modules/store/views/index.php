<?php echo Asset::css('modules/store/bootstrap.min.css'); ?>
<h1 class="portlet-title">
    <u>Livraria</u>
</h1>
<div class="row mb-3">
    <?php if ($store): ?>
    <div class="row">
        <?php foreach($store as $item): ?>
        <div class="col-md-3 mb-3">
            <div class="card">
                <div class="card-body" data-book="<?php echo $item->id;?>">
                    <div class="row">
                        <div class="col-md-12">
                            <h5><?php echo $item->name;?></h5>
                            <img src="<?php echo Asset::get_file('background.png', 'img');?>" alt="Teste" width="100%" height="100%">  
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php endforeach; ?>
    </div>
    <?php endif; ?>
</div>
<?php echo Asset::js('module/store/bootstrap.min.js'); ?>