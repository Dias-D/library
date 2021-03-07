<?php

namespace Controller;

class Admin extends \Controller_template {

    protected $currentUser;

    public function before()
    {
        parent::before();

        \lang::load('translations');
        \module::load('user');

        if (!\Input::is_ajax()) {
            if (!\Auth::check()) {
                \Response::redirect('auth');
            }
        }

        list($driver, $userId) = \Auth::get_user_id();
        
        $this->setcurrentUser(\Model\Auth_User::find($userId));

        if (\Session::get('redefine_password') && \Request::active()->action !== 'redefinepassword') {
            \Response::redirect('user/redefinepassword');
        }

        $this->template->header = \View::forge('partials/header');
        $this->template->footer = \View::forge('partials/footer');
    }

    protected function setCurrentUser($currentUser)
    {
        $this->currentUser = $currentUser;
    }

    protected function getCurrentUser()
    {
        return $this->currentUser;
    }

}
