<?php

namespace Helper;

class Time {

    /**
     * Receive a list of formated hours(HH:MM:SS) and returns them formated and summed
     * 
     * @param array $value
     * @return string
     */
    public static function sumHHMMSS(array $times)
    {
        $all_seconds = '';

        // loop through all the times passed inside an array, sum them
        foreach ($times as $time) {
            list($hour, $minute, $second) = explode(':', $time);
            $all_seconds += $hour * 3600;
            $all_seconds += $minute * 60;
            $all_seconds += $second;
        }


        $total_minutes = floor($all_seconds / 60);
        $seconds = $all_seconds % 60;
        $hours = floor($total_minutes / 60);
        $minutes = $total_minutes % 60;

        // returns the time already formatted
        return sprintf('%02d:%02d:%02d', $hours, $minutes, $seconds);
    }

    public static function toHHMMSS($time)
    {
        $t = round($time);

        return sprintf('%02d:%02d:%02d', ($t / 3600), ($t / 60 % 60), $t % 60);
    }

    public static function intervalInSeconds($startDate, $endDate)
    {
        $date1 = new \DateTime($startDate);
        $date2 = new \DateTime($endDate);

        $diff = $date2->getTimestamp() - $date1->getTimestamp();

        return $diff;
    }

}
