<?php

namespace Factory;

class RepositoryFactory {

    const REPOSITORY = 'Repositories\\';
    const MODEL = 'Model\\';

    public static function create($model, $repository, $module = null)
    {
        $_this = new self;

        return $_this->getRepository($model, $repository, $module);
    }

    protected function getRepository($model, $repository, $module)
    {
        //$config = \Config::load('db', true);
        //$active = \Config::get('db.active');
        $module = $module ?: "";

        //$driverType = $config[$active]['type'];        

        $respository = ucfirst($module) . "\\" . self::REPOSITORY . $repository;

        $model = ucfirst($module) . "\\" . self::MODEL . ucfirst($model);

        return new $respository(new $model);
    }

}
