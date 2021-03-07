<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html lang="pt-br" class="no-js"> <!--<![endif]-->
    <head>
        <title>Novo Projeto - <?php echo $title; ?></title>

        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="MES">
        <meta name="author" content="BMS Tecnologia">

        <!-- Google Font: Open Sans -->
        <?php echo Asset::css('font-open-sans.css'); ?>
        <?php echo Asset::css('font-osvald.css'); ?>

        <!-- Font Awesome CSS -->
        <?php echo Asset::css('font-awesome.min.css'); ?>

        <!-- Bootstrap CSS -->
        <?php echo Asset::css('bootstrap.min.css'); ?>

        <!-- Datatables CSS -->
        <?php echo Asset::css('plugins/datatables/datatables.min.css'); ?>
        <?php echo Asset::css('plugins/datatables/buttons.dataTables.min.css'); ?>

        <!-- Select2 CSS -->
        <?php echo Asset::css('plugins/select2/select2.min.css'); ?>
        <?php echo Asset::css('plugins/select2/select2-bootstrap.css'); ?>

        <!-- App CSS -->
        <?php echo Asset::css('mvpready-admin.css'); ?>
        <?php echo Asset::css('mvpready-flat.css'); ?>
        <?php echo Asset::css('library/animate-icon.css'); ?>

        <link rel="stylesheet" href="<?php echo Asset::get_file('plugins/bootstrap-dialog/css/bootstrap-dialog.css', 'js'); ?>">

        <!-- <link href="./css/custom.css" rel="stylesheet">-->

        <?php isset($extra_css) && print $extra_css; ?>

        <style>
            .bootstrap-dialog .modal-header {
                padding: 10px 20px;
            }

            .loader-image{
                width: 40px;
                position: relative;
                left: 50%;
                margin-left: -20px;
            }
        </style>

        <!-- Favicon -->
        <link rel="shortcut icon" href="<?php echo Asset::get_file('favicon.png', 'img'); ?>">

        <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
        <![endif]-->
    </head>
    <body class=" ">
        <div id="wrapper"><!-- #wrapper -->
            <!-- header -->
            <?php isset($header) && print $header; ?>
            <!-- end header -->

            <!-- main content -->
            <div class="content">
                <div class="container">
                    <!--Mensagens alertas-->
                    <?php if (Session::get_flash('success')): ?>                                        
                        <div class="alert alert-success">
                            <a aria-hidden="true" href="#" data-dismiss="alert" class="close">×</a>
                            <?php echo implode('</p><p>', e((array) Session::get_flash('success'))); ?>
                        </div>
                    <?php endif; ?>
                    <?php if (Session::get_flash('error')): ?>
                        <div class="alert alert-danger text-center">
                            <a aria-hidden="true" href="#" data-dismiss="alert" class="close">×</a>
                            <?php echo implode('</p><p>', e((array) Session::get_flash('error'))); ?>
                        </div>
                    <?php endif; ?>
                    <?php if (Session::get_flash('warning')): ?>
                        <div class="alert alert-warning text-center">
                            <a aria-hidden="true" href="#" data-dismiss="alert" class="close">×</a>
                            <?php echo implode('</p><p>', e((array) Session::get_flash('warning'))); ?>
                        </div>
                    <?php endif; ?>
                    <!--end Mensagens alertas-->
                    <?php if (!empty($content)): ?>
                        <?php echo $content; ?>
                    <?php endif; ?>
                </div>
            </div>
        </div> <!-- /#wrapper -->

        <script>var host = "<?php echo uri::base(); ?>"</script>
        <?php isset($footer) && print $footer; ?>

        <!-- Bootstrap core JavaScript
        ================================================== -->
        <!-- Core JS -->
        <?php echo Asset::js('libs/jquery-1.10.2.min.js'); ?>
        <?php echo Asset::js('bootstrap.min.js'); ?>

        <!--[if lt IE 9]>
        <script src="./js/libs/excanvas.compiled.js"></script>
        <![endif]-->

        <!-- Datatables JS -->
        <?php echo Asset::js('plugins/datatables/datatables.min.js'); ?>

        <!-- Select2 JS -->
        <?php echo Asset::js('plugins/select2/select2.full.min.js'); ?>

        <!-- App JS -->
        <?php echo Asset::js('mvpready-core.js'); ?>
        <?php echo Asset::js('mvpready-admin.js'); ?>
        <?php echo Asset::js('plugins/parsley/parsley.js'); ?>
        <?php echo Asset::js('plugins/bootstrap-dialog/js/bootstrap-dialog.js'); ?>
        <?php echo Asset::js('main.js'); ?>

        <?php isset($extra_js) && print $extra_js; ?>

    </body>
</html>

