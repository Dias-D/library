<?php

namespace Helper;

/**
 * Return sum value
 * @author Anderson Morais <anderson@bmstecnologia.com>
 */
class Sum {

    /**
     *
     * @var array 
     */
    protected $value = array();

    public function add($val)
    {
        $this->value[] = $val;
        return $this;
    }

    public  function getTotal()
    {
        return array_sum($this->value);
    }

}
