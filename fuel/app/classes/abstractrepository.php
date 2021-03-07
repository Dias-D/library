<?php

use Interfaces\RepositoryInterface;

abstract class AbstractRepository implements RepositoryInterface {

    public function __construct(\Orm\Model $model)
    {
        $this->model = new $model;
    }

    public function getModel()
    {
        return $this->model;
    }

    public function findAll()
    {
        $model = $this->getModel()->query();
        return $this->getModel()->find('all');
    }

    public function find($id)
    {
        $model = $this->getModel();

        return $model->find($id);
    }

    public function store(array $data)
    {
        return $this->getModel()
                        ->set($data)
                        ->save();
    }

    public function update($id, array $data)
    {
        $model = $this->getModel()->find($id);
        $model->set($data);

        return $model->save();
    }

    public function delete($id)
    {
        return $this
                        ->getModel()
                        ->find($id)
                        ->delete();
    }

}
