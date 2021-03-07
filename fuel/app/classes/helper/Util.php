<?php

namespace Helper;

class Util {

    /**
     * Create hash
     * @param string $data
     * @return String $hash
     */
    public static function hash($id, $limit = 19)
    {
        return substr(base_convert(sha1(uniqid(mt_rand() . $id)), 16, 36), 0, $limit);
    }

     /**
     * Format number
     * @param string $num
     * @return String $number
     */
    public static function formatNumber($num)
    {
        if(is_numeric($num))
            return number_format($num, 2, ',', '.');
        else
            return '-';
    }
    

}
