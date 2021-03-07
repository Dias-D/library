<?php

namespace Fuel\Tasks;

class ClearActiveRecipe {

    public static function run()
    {
        $q = '
            DELETE FROM 
                active_recipe 
            WHERE 
                datetime < NOW() - INTERVAL 7 DAY
        ';

        \DB::query($q)->execute();
    }

}

/* End of file tasks/clearalertqueue.php */
    