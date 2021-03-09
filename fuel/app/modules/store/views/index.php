<?php echo Asset::css('modules/store/bootstrap.min.css'); ?>
<h1 class="portlet-title">
    <u>Painel</u>
</h1>
<div class="row mb-3">
    <?php if ($store): ?>
    <div class="row">
        <?php foreach($store as $item): ?>
        <div class="col-md-3 mb-3">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-12">
                            <p> TESTE </p>
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