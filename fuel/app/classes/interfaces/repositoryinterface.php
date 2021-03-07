<?php

namespace Interfaces;

Interface RepositoryInterface {

    public function findAll();

    public function find($id);

    public function store(array $data);

    public function update($id, array $data);

    public function delete($id);
}
