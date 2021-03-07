<?php

namespace Model;

class SystemActivity extends \Orm\Model {

    const TYPE_ACTIVATE = 'activate';
    const TYPE_CREATE = 'create';
    const TYPE_UPDATE = 'update';
    const TYPE_DELETE = 'delete';

    protected static $_table_name = 'system_activity';
    protected static $_properties = array(
        "id",
        "user_id",
        "date",
        "event",
        "module",
        "area",
        "old_registry",
        "new_registry",
        "created_at",
        "updated_at"
    );
    protected static $_observers = array(
        'Orm\Observer_CreatedAt' => array(
            'events' => array('before_insert'),
            'mysql_timestamp' => false,
        ),
        'Orm\Observer_UpdatedAt' => array(
            'events' => array('before_save'),
            'mysql_timestamp' => false,
        ),
    );
    protected static $_belongs_to = array(
        'user' => array(
            'key_from' => 'user_id',
            'model_to' => '\User\Model\User',
            'key_to' => 'id',
            'cascade_save' => true,
            'cascade_delete' => false,
        ),
    );

}
