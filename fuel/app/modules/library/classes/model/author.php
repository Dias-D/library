<?php

namespace Library\Model;

class Author extends \Orm\Model_Soft {

    protected static $_conditions = array(
        'order_by' => array('name' => 'asc'),
        'where' => array(),
    );

    protected static $_table_name = 'author';
    protected static $_properties = array(
        'id',
        'name',
        'acronym',
        'active',
        'created_at',
        'updated_at',
        'deleted'
    );

    protected static $_soft_delete = array(
        'deleted_field' => 'deleted',
        'mysql_timestamp' => false,
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

    protected static $_has_many = array(
        'book' => array(
            'key_from' => 'id',
            'model_to' => '\Library\Model\Book',
            'key_to' => 'author_id',
            'cascade_save' => false,
            'cascade_delete' => false,
        )
    );

    public static function validate($factory)
    {
        $val = \Validation::forge($factory);
        $val->add_field('name', 'Nome', 'required|max_length[20]');
        $val->add_field('acronym', 'Sigla', 'required|max_length[20]');
        $val->add_field('active', 'Status', 'required');

        return $val;
    }

}