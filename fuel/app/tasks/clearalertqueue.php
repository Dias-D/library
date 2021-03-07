<?php

namespace Fuel\Tasks;

class ClearAlertQueue {

    public static function run()
    {
        $q = '
            DELETE FROM
                alert_queue
            WHERE
                sent = 1
        ';

        \DB::query($q)->execute();
    }

}

/* End of file tasks/clearalertqueue.php */
    