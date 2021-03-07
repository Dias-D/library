<?php

namespace Helper;

/**
 * Return sum value
 * @author Anderson Morais <anderson@bmstecnologia.com>
 */
class Date {

    /**
     * 
     * @param string $data
     * @return DateTime $dateTime
     */
    public static function format($date, $format = 'd/m/Y H:i:s')
    {
        $dateTime = new \DateTime($date);
        return $dateTime->format($format);
    }

}
