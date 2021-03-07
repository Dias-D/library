<?php

namespace Helper;

/**
 * Retur a value masked
 * @author Anderson Morais <anderson@bmstecnologia.com>
 */
class Mask {

    /**
     * 
     * @param string $data
     * @return masked string
     */
    public static function format($mask, $value)
    {

        $value = str_replace(" ", "", $value);

        for ($i = 0; $i < strlen($value); $i++) {
            $mask[strpos($mask, "#")] = $value[$i];
        }

        return $mask;
    }

}
