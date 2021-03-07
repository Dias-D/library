<?php

class Validation extends \Fuel\Core\Validation {

    // note this is a static method
    public static function _validation_unique($val, $options)
    {
        // If $val is null, return true to avoid search for "null" in data base
        if (empty($val)) {
            return true;
        }

        list($table, $field) = explode('.', $options);
        $validation = \Validation::active();
        //search for hidden id field
        $value = $validation->input('id');

        $query = \DB::select(\DB::expr("LOWER (\"$field\")"))
                ->where($field, '=', \Str::lower($val))
                ->from($table);
        if (!empty($value)) {
            $query->where('id', '!=', $value);
        }

        $result = $query->execute();

        return !($result->count() > 0);
    }

}
