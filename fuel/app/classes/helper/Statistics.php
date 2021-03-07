<?php

namespace Helper;

/**
 * Implements Statistics calcs
 * @author Anderson Morais <anderson@bmstecnologia.com>
 */
class Statistics
{

    /**
     * Returns the some value passed by parameter
     * 
     * @param type $value
     * @return type
     */
    public static function __numeroDePontos($value)
    {
        return count($value);
    }

    public static function __desvio($value)
    {
        $m = self::__media($value);
        $r = 0;
        foreach ($value as $var) {
            $r = $r + pow(($var - $m), 2);
        }
        return sqrt($r / (count($value) - 1));
    }

    public static function __maiorValor($value)
    {
        return max($value);
    }

    public static function __menorValor($value)
    {
        return min($value);
    }

    public static function __media($value)
    {
        return array_sum($value) / count($value);
    }

    public static function __cp($value, $usl, $lsl)
    {
        $s = self::__desvio($value);
        $flag = false;
        $uslv = $usl[0][2];
        foreach ($usl as $var) {
            if ($var[2] != $uslv) {
                $flag = true;
                break;
            }
        }
        if (!$flag) {
            $lslv = $lsl[0][1];
            foreach ($lsl as $var) {
                if ($var[1] != $lslv) {
                    $flag = true;
                    break;
                }
            }
        }
        if ($flag) {
            return '-';
        } else {
            return ((6 * $s) == 0 || ($uslv - $lslv) == 0) ? 0 : ((6 * $s) / ($uslv - $lslv));
        }
    }

    public static function __cpm($value)
    {
        return '-'; //$value;
    }

    public static function __ppk($value)
    {
        return '-';
    }

    public static function __cpk($value, $usl, $lsl)
    {
        $desvio = self::__desvio($value);
        $media = self::__media($value);

        $flag = false;
        $uslv = $usl[0][2];
        foreach ($usl as $var) {
            if ($var[2] != $uslv) {
                $flag = true;
                break;
            }
        }
        if (!$flag) {
            $lslv = $lsl[0][1];
            foreach ($lsl as $var) {
                if ($var[1] != $lslv) {
                    $flag = true;
                    break;
                }
            }
        }

        if ($flag)
            return '-';

        if ((3 * $desvio) == 0 || ($uslv - $lslv) == 0)
            return '-';

        $cpk = self::__menorValor(
            array(
                (($uslv - $media) / (3 * $desvio)),
                (($media - $lslv) / (3 * $desvio))
            )
        );
        return $cpk; //$value;
    }

    public static function __regrasVioladas($value)
    {
        return '-'; //$value;
    }

    public static function __ucl($standardDeviation, $tgt, $usl)
    {
        $result = null;
        $calculus = (3 * $standardDeviation) + $tgt;

        if (!$usl || empty($usl)) {
            $usl = $calculus + 1;
            $result['usl'] = $usl;
        }

        if ($calculus < $usl) {
            $result['statistic'] = $calculus;
        }

        return $result;
    }

    public static function __lcl($standardDeviation, $tgt, $lsl)
    {
        $result = null;
        $calculus = $tgt - (3 * $standardDeviation);


        if (!$lsl || empty($lsl)) {
            $lsl = $calculus - 1;
            $result['lsl'] = $lsl;
        }

        if ($calculus > $lsl) {
            $result['statistic'] = $calculus;
        }

        return $result;
    }

    public static function __uwl($standardDeviation, $tgt, $usl)
    {

        $result = null;
        $calculus = (2 * $standardDeviation) + $tgt;
        if (!$usl || empty($usl)) {
            $usl = $calculus + 1;
        }
        if ($calculus < $usl) {
            $result = $calculus;
        }
        return $result;
    }

    public static function __lwl($standardDeviation, $tgt, $lsl)
    {
        $result = null;
        $calculus = $tgt - (2 * $standardDeviation);
        if (!$lsl || empty($lsl)) {
            $lsl = $calculus - 1;
        }
        if ($calculus > $lsl) {
            $result = $calculus;
        }
        return $result;
    }

    public static function __result_cpk_ppk($upper_limit, $inferior_limit, $average, $standard_deviation, $standard_deviation_g)
    {

        // Necessary params to exec calc
        if (empty($upper_limit)  || empty($inferior_limit)) {
            return null;
        }

        $_standard_deviation = $standard_deviation;
        if (!$_standard_deviation) {
            $_standard_deviation = $standard_deviation_g;
        }
        $upper_cpk = $upper_limit - $average;
        $inferior_cpk = $average - $inferior_limit;
        if ($_standard_deviation > 0) {
            $division_upper_cpk = $upper_cpk / (3 * $_standard_deviation);
            $division_inferior_cpk = $inferior_cpk / (3 * $_standard_deviation);
            return min($division_upper_cpk, $division_inferior_cpk);
        }

        return null;
    }

    public static function __result_cpm($usl, $lsl, $avg, $std, $tgt)
    {
        // Necessary params to exec calc
        if (empty($usl)  || empty($lsl) || empty($tgt) || empty($std) || empty($avg)) {
            return null;
        }

        $cpmGood = 1.33;

        $uslMinusLsl = $usl - $lsl; //usl minus lsl
        $tgtMinusAvg = $avg - $tgt; // average minus target
        $powTgtMinusAvg = pow($tgtMinusAvg, 2); // Pow of target minus Average
        $powStd = pow($std, 2); // Pow of standard deviation
        $powTgtMinusAvgMinusPowStd =  ($powTgtMinusAvg + $powStd); // Pow of target minus Average minus Pow of standard deviation
        $sigmaPowTgtMinusAvgMinusPowStd = 6 * sqrt($powTgtMinusAvgMinusPowStd); // sigma of Pow of target minus Average minus Pow of standard deviation

        if ($sigmaPowTgtMinusAvgMinusPowStd == 0) {
            return $cpmGood;
        }

        $cpm = ($uslMinusLsl / $sigmaPowTgtMinusAvgMinusPowStd);

        return $cpm;
    }

    public static function __result_tz($average, $tgt, $standard_deviation)
    {
        $average_tgt = $average - $tgt;

        $standard_deviation && $tz = $average_tgt / $standard_deviation;

        if ($standard_deviation > 0 && $tgt > 0) {
            return $tz;
        }

        return null;
    }

    public static function __result_cp($upper_limit, $inferior_limit, $standard_deviation)
    {

        if (empty($upper_limit)  || empty($inferior_limit) || empty($standard_deviation)) {
            return null;
        }

        $standard_deviation = str_replace(",", "", number_format(round((float) $standard_deviation, 2), 3));

        $upper_limit_inferior_limit = $upper_limit - $inferior_limit;
        $_standard_deviation = 6 * $standard_deviation;
        if ($upper_limit_inferior_limit > 0 && $_standard_deviation > 0) {
            $cp_result = $upper_limit_inferior_limit / $_standard_deviation;
            return $cp_result;
        }

        return null;
    }
}
