<header class="navbar navbar-inverse" role="banner">

    <div class="container">

        <div class="navbar-header">
            <button class="navbar-toggle" type="button" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="sr-only">Toggle navigation</span>
                <i class="fa fa-bars"></i>
            </button>

            <a href="<?php echo Uri::base(); ?>" class="navbar-brand navbar-brand-img">
                <img style="padding-top:13px;" width="150px" src="<?php echo Asset::get_file('logo.png', 'img'); ?>" />
            </a>
        </div> <!-- /.navbar-header -->

        <nav class="collapse navbar-collapse" role="navigation">
            <ul class="nav navbar-nav navbar-left">
                <li class="dropdown ">
                    <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                        Autor
                        <i class="fa fa-caret-down"></i>
                    </a>
                    <ul class="dropdown-menu" role="menu">
                        <li>
                            <?php echo Html::anchor('library/author', 'Visualizar Autores'); ?>
                        </li>
                    </ul>
                </li>
            </ul>

            <ul class="nav navbar-nav navbar-left">

                <li class="dropdown ">
                    <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                        Operação
                        <i class="fa fa-caret-down"></i>
                    </a>
                    <ul class="dropdown-menu" role="menu">
                        <li>
                            <?php echo Html::anchor('recipe', 'Carregar Ficha Técnica'); ?>
                        </li>

                        <li>
                            <?php echo Html::anchor('variable/variablevalues/create', 'Lançamento de Valores Manuais'); ?>
                        </li>
                    </ul>
                </li> <!-- /. menu administração -->
            </ul>

            <!--<ul class="nav navbar-nav navbar-left">

                <li class="dropdown ">
                    <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                        Qualidade
                        <i class="fa fa-caret-down"></i>
                    </a>
                    <ul class="dropdown-menu" role="menu">
                        <li>
            <?php //echo Html::anchor('variable/variablevalues/samples', 'Lançamento de Valores Manuais - Qualidade'); ?>
            <?php echo Html::anchor('variable/manualvalue', 'Lançamento de Valores'); ?>
                        </li>
                    </ul>
                </li> 
            </ul> -->

            <ul class="nav navbar-nav navbar-left">

                <li class="dropdown ">
                    <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                        Relatórios
                        <i class="fa fa-caret-down"></i>
                    </a>
                    <ul class="dropdown-menu" role="menu">
                        <li>
                            <?php echo Html::anchor('report/histogram', 'Histograma'); ?>
                        </li>
                        <li>
                            <?php echo Html::anchor('report/logsheet', 'Visão Geral'); ?>
                        </li>
                        <li>
                            <?php //echo Html::anchor('report/quality', 'Qualidade - Amostras'); ?>
                        </li>
                        <li>
                            <?php echo Html::anchor('report/analysiscertificate', 'Laudo de Qualidade'); ?>
                        </li>
                        <li>
                            <?php echo Html::anchor('report/monitoring', 'Board de operações'); ?>
                        </li>
                        <li>
                            <?php echo Html::anchor('report/summary', 'Resumo'); ?>
                        </li>

                    </ul>
                </li> <!-- /. menu administração -->
            </ul>
            <!-- menu direito -->
            <ul class="nav navbar-nav navbar-right">
                <!-- menu administracao -->
                <li>
                    <a href="<?php echo \Uri::create("support"); ?>">
                        <i class="header-icon d-none d-sm-inline-block" data-toggle="tooltip" data-placement="buttom"
                            title="Ajuda" style="color:white; font-size: 30px;"><strong>?</strong></i>
                    </a>
                </li>
                <li class="dropdown ">
                    <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                        <?php echo ucfirst(Auth::instance()->get_screen_name()); ?>
                        <i class="fa fa-caret-down"></i>
                    </a>

                    <ul class="dropdown-menu" role="menu">

                        <li class="dropdown-submenu">
                            <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown">
                                Gerenciamento de acessos
                                <i class="mainnav-caret"></i>
                            </a>
                            <ul class="dropdown-menu"
                                style="left: auto; right: 100%; margin-left: 0; margin-right: -1px;">
                                <li>
                                    <?php echo Html::anchor('user', 'Usuários'); ?>
                                </li>
                                <li>
                                    <?php echo Html::anchor('admin/acl/group', 'Grupos'); ?>
                                </li>
                                <li>
                                    <?php echo Html::anchor('admin/acl/grouppermission', 'Permissões de grupo'); ?>
                                </li>
                            </ul>
                        </li>

                        <li>
                            <?php echo Html::anchor('admin/recordmanagement', 'Gerenciamento de inserções'); ?>
                        </li>
                        <li>
                            <?php echo Html::anchor('admin/log', 'Registro de atividades'); ?>
                        </li>

                        <?php if (Auth::check()): ?>
                        <li>
                            <?php echo Html::anchor('auth/logout', __('header.menu.logout')); ?>
                        </li>
                        <?php else: ?>
                        <li>
                            <?php echo Html::anchor('auth/', 'Entrar'); ?>
                        </li>
                        <?php endif; ?>
                    </ul>
                </li> <!-- /. menu administração -->

            </ul>
        </nav>
    </div> <!-- /.container -->
</header>

<br>