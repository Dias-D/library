<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html lang="pt-br" class="no-js"> <!--<![endif]-->
    <head>
        <title>Login</title>

        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="Sistema de controle de processo">
        <meta name="author" content="BMS Tecnologia">

        <!-- Google Font: Open Sans -->
        <?php echo Asset::css('font-open-sans.css'); ?>
        <?php echo Asset::css('font-osvald.css'); ?>

        <!-- Font Awesome CSS -->
        <?php echo Asset::css('font-awesome.min.css'); ?>

        <!-- Bootstrap CSS -->
        <?php echo Asset::css('bootstrap.min.css'); ?>

        <!-- App CSS -->
        <?php echo Asset::css('mvpready-admin.css'); ?>
        <?php echo Asset::css('mvpready-flat.css'); ?>
        <!-- <link href="./css/custom.css" rel="stylesheet">-->

        <!-- Favicon -->
        <link rel="shortcut icon" href="<?php echo Asset::get_file('favicon.png', 'img'); ?>">

        <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
        <![endif]-->
    </head>

    <body class="account-bg">

        <header class="navbar navbar-inverse" role="banner">

            <div class="container">

                <div class="navbar-header">

                </div> <!-- /.navbar-header -->

            </div> <!-- /.container -->

        </header>

        <div class="account-wrapper">

            <div class="account-body">

                <h3>ACESSE SUA CONTA</h3>

                <h5></h5>

                <?php if (Session::get_flash('error')): ?>
                    <div class="alert alert-warning">
                        <?php echo Session::get_flash('error'); ?>
                    </div>
                <?php endif; ?>

                <form class="form account-form" method="post">

                    <div class="form-group">
                        <label for="login-username" class="placeholder-hidden">Registro</label>
                        <input type="text" name="username" class="form-control" id="login-username" placeholder="Usuário" tabindex="1">
                    </div> <!-- /.form-group -->

                    <div class="form-group">
                        <label for="login-password" class="placeholder-hidden">Password</label>
                        <input type="password" name="password" class="form-control" id="login-password" placeholder="Senha" tabindex="2">
                    </div> <!-- /.form-group -->

                    <div class="form-group">
                        <button type="submit" class="btn btn-success btn-block btn-lg" tabindex="4">
                            Acessar &nbsp; <i class="fa fa-play-circle"></i>
                        </button>
                    </div> <!-- /.form-group -->
                </form>
            </div> 
        </div> <!-- /.account-wrapper -->

        <!-- Bootstrap core JavaScript
        ================================================== -->
        <!-- Core JS -->
        <?php echo Asset::js('libs/jquery-1.10.2.min.js'); ?>
        <?php echo Asset::js('bootstrap.min.js'); ?>

        <!--[if lt IE 9]>
        <script src="./js/libs/excanvas.compiled.js"></script>
        <![endif]-->
        <!-- App JS -->
        <?php echo Asset::js('mvpready-core.js'); ?>
        <?php echo Asset::js('mvpready-admin.js'); ?>

        <!-- Plugin JS -->
        <?php echo Asset::js('mvpready-account.js'); ?>
    </body>
</html>
