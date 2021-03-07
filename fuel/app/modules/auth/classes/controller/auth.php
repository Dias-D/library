<?php

namespace Auth\Controller;

class Auth extends \Controller {

    protected $mainPage = 'main';

    public function before()
    {
        parent::before();

        \module::load('user');
        \lang::load('login');
    }

    /**
     * Basic welcome message
     * @access public
     * @return response
     */
    public function action_index()
    {
        if (\Auth::check()) {
            \Response::redirect($this->mainPage);
            exit;
        }
        return \Response::forge(\View::forge('login/index'));
    }

    public function post_index()
    {
        if (!\Input::post('username') || !\Input::post('password')) {
            // did the user want to be remembered?
            if (\Input::param('remember', false)) {
                // create the remember-me cookie
                \Auth::remember_me();
            } else {
                // delete the remember-me cookie if present
                \Auth::dont_remember_me();
            }
            \Session::set_flash('error', 'Usuário e senha obrigatorios');
            \Response::redirect('auth');
            exit;
        }

        if (\Auth::login(\Input::post('username'), \Input::post('password'))) {
            if ($this->should_redefine_passord()) {
                \Session::delete('redirect_to');
                \Response::redirect('user/redefinepassword');
            }

            \Response::redirect($this->mainPage);
        } else {
            \Session::set_flash('error', 'Usuário/senha inválidos');
            \Response::redirect('auth');
        }
    }

    public function action_logout()
    {
        \Auth::logout();
        \Response::redirect('auth');
    }

    protected function should_redefine_passord()
    {
        \Session::delete('redefine_password');
        $user_password = \Input::post('password');

        if (strcmp($user_password, \User\Model\User::DEFAULT_PASS) === 0) {
            \Session::set('redefine_password', 1);
            return true;
        }

        return false;
    }

}
