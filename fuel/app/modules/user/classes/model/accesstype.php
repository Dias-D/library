<?php

namespace User\Model;

class AccessType extends \Orm\Model {

    protected static $_table_name = 'access_type';
    protected static $_properties = array(
        'id',
        'description',
        'active',
        'created_at',
        'updated_at',
    );
    protected static $_observers = array(
        'Orm\Observer_CreatedAt' => array(
            'events' => array('before_insert'),
            'mysql_timestamp' => false,
        ),
        'Orm\Observer_UpdatedAt' => array(
            'events' => array('before_update'),
            'mysql_timestamp' => false,
        ),
    );

    // public static function validate($factory)
    // {
    //     $val = \Validation::forge($factory);
    //     return $val;
    // }

}
