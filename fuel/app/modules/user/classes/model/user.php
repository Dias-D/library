<?php

namespace User\Model;

class User extends \Orm\Model_Soft {

    const DEFAULT_PASS = 'bms';
    const GROUP_ADMIN = 5;
    const GROUP_ROOT = 6;
    const GROUP_USER = 3;

    protected static $_properties = array(
        'id',
        'username',
        'password',
        'group_id',
        'email',
        'last_login',
        'previous_login',
        'login_hash',
        'user_id',
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

    /**
     * @var array	belongs_to relationships
     */
    protected static $_belongs_to = array(
        'group' => array(
            'model_to' => 'Model\\Auth_Group',
            'key_from' => 'group_id',
            'key_to' => 'id',
            'cascade_delete' => false,
        )
    );

    public static function validate($factory)
    {
        $val = \Validation::forge($factory);

        $val->add_field('username', 'Usuário', 'required|trim|unique[users.username]|valid_string[alpha,lowercase,numeric]|min_length[5]|max_length[20]');
        $val->set_message('valid_string', 'O campo :label só pode conter letras, números, sublinhados, caracteres não acetuados e deve ter entre 5 e 20 caracteres.');

        //$val->add_field('social_security', 'CPF', 'required|trim');
        //$val->set_message('valid_string', 'O campo :label só pode conter letras, números, sublinhados, caracteres não acetuados e deve ter entre 5 e 20 caracteres.');
        //$val->add_field('password', 'Senha', 'required|max_length[255]');
        //$val->add_field('group_id', 'Group Id', 'required|valid_string[numeric]');
        //$val->add_field('email', 'Email', 'required|valid_email|max_length[255]');

        return $val;
    }

}
