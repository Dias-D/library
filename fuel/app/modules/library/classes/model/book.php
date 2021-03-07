<?php

namespace Library\Model;

class Book extends \Orm\Model_Soft {

    protected static $_conditions = array(
        'order_by' => array('name' => 'asc'),
        'where' => array(),
    );

    protected static $_table_name = 'book';
    protected static $_properties = array(
        'id',
        'author_id',
        'publisher_id',
        'name',
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

    protected static $_belongs_to = array(
        'author' => [
            'key_from' => 'author_id',
            'key_to' => 'id',
            'model_to' => '\Library\Model\Author',
            'cascade_save' => false,
            'cascade_delete' => false,
        ],
        'publisher' => [
            'key_from' => 'publisher_id',
            'key_to' => 'id',
            'model_to' => '\Library\Model\Publisher',
            'cascade_save' => false,
            'cascade_delete' => false
        ]
    );

    public static function validate($factory)
    {
        $val = \Validation::forge($factory);
        $val->add_field('author_id', 'Autor', 'required');
        $val->add_field('publisher_id', 'Editora', 'required');
        $val->add_field('name', 'Nome', 'required');
        $val->add_field('active', 'Status', 'required');

        return $val;
    }

}
