<?php

namespace User\Controller;

class User extends \Controller\Admin {

    /**
     * @var bool
     */
    protected $isRoot; // Is the user a super user ?

    /**
     * @var array 
     */
    protected $roles = array();

    public function before()
    {
        parent::before();

        \Module::load('admin');

        if (!\Auth::has_access('user.user[access]') && \Request::active()->action !== 'redefinepassword') {
            \Session::set_flash('error', __('access_denied'));

            \Response::redirect('main');
        }

        $this->isRoot = \Auth::member(\User\Model\User::GROUP_ROOT);
        $this->roles = $this->getGroups();
    }

    public function action_index()
    {
        $data['users'] = $this->getUserList();
        $this->template->title = "Usuários";
        $this->template->content = \View::forge('index', $data);
    }

    /**
     * Create an user
     */
    public function action_create()
    {
        $this->getGroups();

        if (\Input::method() == 'POST') {
            $val = \User\Model\User::validate('create');

            if ($val->run()) {
                $group = (\Input::post('group_id') != "") ? \Input::post('group_id') : \User\Model\User::GROUP_USER;

                empty($group) && $group = \User\Model\User::GROUP_USER; //If after all, $group still remain with null value, force it to user group

                $user = \User\Model\User::forge(array(
                            'username' => \Input::post('username'),
                            'password' => \Auth::hash_password(\User\Model\User::DEFAULT_PASS),
                            'group_id' => $group, // user group
                            'email' => \Input::post('email'),
                            'last_login' => \Input::post('last_login', 0),
                            'previous_login' => \Input::post('previous_login', 0),
                            'login_hash' => \Input::post('login_hash', 0),
                            'user_id' => \Input::post('user_id', 1),
                ));

                if ($user->save()) {
                    \Session::set_flash('success', 'Usuário adicionado com sucesso');

                    \Response::redirect('user');
                } else {
                    \Session::set_flash('error', 'Não foi possível atualizar o usuário');
                }

                $this->template->set_global('user', $user, false);
            } else {
                \Session::set_flash('error', $val->error());
            }
        }

        $this->template->set_global('roles', $this->roles, true);
        $this->template->set_global('isRoot', $this->isRoot, false);

        $this->template->set('extra_js', \Asset::js(
                        array(
                            'module/user/main.js'
                        )
                ), false);

        $this->template->title = "Usúario";
        $this->template->content = \View::forge('create');
    }

    protected function getGroups()
    {
        $isRoot = \Auth::member(\User\Model\User::GROUP_ROOT);

        $groups = \Admin\Model\Group::query()
                ->get();

        $ret = array();

        if (empty($groups)) {
            return array();
        }

        foreach ($groups as $group) {
            if ($this->isRoot) {
                array_push($ret, $group);
            } else {
                ($group->id > 6) && array_push($ret, $group);
            }
        }

        return $ret;
    }

    /**
     * Edit an user
     * 
     * @param int $id
     */
    public function action_edit($id = null)
    {
        is_null($id) and \Response::redirect('user');
        $errorMessage = array();

        if (!$user = \User\Model\User::find($id)) {
            \Session::set_flash('error', 'Não foi possível encontrar o usuário');
            \Response::redirect('user');
        }

        $val = \User\Model\User::validate('edit');

        if ($val->run()) {
            $group = (\Input::post('group_id') != "") ? \Input::post('group_id') : \User\Model\User::GROUP_USER;

            empty($group) && $group = \User\Model\User::GROUP_USER; //If after all, $group still remain with null value, force it to user group

            $user->username = \Input::post('username');
            $user->group_id = $group;
            $user->email = \Input::post('email');

            if ($user->save()) {
                \Cache::delete_all(\Config::get('ormauth.cache_prefix', 'auth') . '.permissions'); // flush Auth perms
                \Session::set_flash('success', 'Usuário atualizado');

                \Response::redirect('user');
            } else {
                \Session::set_flash('error', 'Não foi possível atualizar o usuário');
            }
        } else {
            if (\Input::method() == 'POST') {
                $user->username = $val->validated('username');

                \Session::set_flash('error', $val->error());
            }

            $this->template->set_global('user', $user, false);
            $this->template->set_global('roles', $this->roles, true);
            $this->template->set_global('isRoot', $this->isRoot, false);
        }

        $this->template->set('extra_js', \Asset::js(
                        array(
                            'module/user/main.js'
                        )
                ), false);

        $this->template->title = "Usuário";
        $this->template->content = \View::forge('edit');
    }

    public function action_delete($id = null)
    {
        is_null($id) and \Response::redirect('user');

        if ($user = \User\Model\User::find($id)) {
            $user->delete();

            \Session::set_flash('success', 'Usuário removido com sucesso');
        } else {
            \Session::set_flash('error', 'Não foi possível remover o usuário');
        }

        \Response::redirect('user');
    }

    public function action_resetpassword($id = null)
    {
        is_null($id) and \Response::redirect('user');

        if (!$user = \User\Model\User::find($id)) {
            \Response::redirect('user');
        }

        $user->password = \Auth::hash_password(\User\Model\User::DEFAULT_PASS);
        if ($user->save()) {
            \Session::set_flash('success', 'Senha resetada com sucesso!');
            \Response::redirect('user');
        } else {
            \Session::set_flash('error', 'Não foi possível resetar a senha!');
            \Response::redirect('user');
        }
    }

    public function action_redefinepassword()
    {

        if (\Input::method() == 'POST') {
            $val = $this->redefine_validate('redefine');

            if ($val->run()) {
                $redefined = \Auth::change_password(\Input::post('old_password'), \Input::post('new_password'));

                if (!$redefined) {
                    \Session::set_flash('error', 'A senha não pode ser alterada. Tente novamente digitando a senha atual corretamente');
                    \Response::redirect('user/redefinepassword');
                }

                \Session::delete('redefine_password');
                \Session::set_flash('success', 'Senha Alterada com sucesso');
                \Response::redirect('main');
            } else {
                \Session::set_flash('error', $val->error());
            }
        }

        $this->template->title = 'Redefinir senha';
        $this->template->content = \View::forge('redefine');
    }

    protected function alreadyExistSocialSecurity($socialSecurity, $id = null)
    {
        $userQuery = \User\Model\User::query();
        $where = array();

        array_push($where, array('social_security', '=', $socialSecurity));

        if ($id) {
            array_push($where, array('id', '!=', $id));
        }
        $user = $userQuery->where($where)
                ->get();

        return $user ? true : false;
    }

    protected function alreadyExistEmail($email, $id = null)
    {
        $userQuery = \User\Model\User::query();
        $where = array();

        array_push($where, array('email', '=', $email));

        if ($id) {
            array_push($where, array('id', '!=', $id));
        }
        $user = $userQuery->where($where)
                ->get();

        return $user ? true : false;
    }

    protected function getUserList()
    {
        $userQuery = \User\Model\User::query()
                ->related('group')
                ->order_by('username')
                ->where('group_id', '!=', \User\Model\User::GROUP_ROOT);

        if (!$this->isRoot) {
            $userQuery->where('group_id', '!=', 2)
                    ->where('group_id', '!=', \User\Model\User::GROUP_ADMIN);
        }

        return $userQuery->get();
    }

    protected function redefine_validate($factory)
    {
        $val = \Validation::forge($factory);

        $val->set_message('required', 'Campo :label é obrigatório.')
                ->set_message('match_field', 'A Nova senha e Confirmar nova senha devem ser iguais');

        $val->add_field('old_password', 'Senha atual', 'required');
        $val->add_field('new_password', 'Nova senha', 'required');
        $val->add_field('retype_new_password', 'Confirmar nova senha', 'required|match_field[new_password]');

        return $val;
    }

    protected function validateSocialSecurity($cpf)
    {
        $cpf = preg_replace('/[^0-9]/', '', (string) $cpf);
        // Valida tamanho
        if (strlen($cpf) != 11)
            return false;
        // Calcula e confere primeiro dígito verificador
        for ($i = 0, $j = 10, $soma = 0; $i < 9; $i++, $j--)
            $soma += $cpf{$i} * $j;
        $resto = $soma % 11;
        if ($cpf{9} != ($resto < 2 ? 0 : 11 - $resto))
            return false;
        // Calcula e confere segundo dígito verificador
        for ($i = 0, $j = 11, $soma = 0; $i < 10; $i++, $j--)
            $soma += $cpf{$i} * $j;
        $resto = $soma % 11;
        return $cpf{10} == ($resto < 2 ? 0 : 11 - $resto);
    }

    protected function groupHierarchyData(array $data)
    {
        $groupedData = array();

        foreach ($data as $val) {
            if (array_key_exists($val['business_unit_name'], $groupedData)) {
                $groupedData
                        [$val['business_unit_name']]
                        [$val['cell_name']][$val['factory_name']]
                        [$val['production_line_name']][$val['machine_id']] = $val['machine_name'];
            } else {
                $groupedData[$val['business_unit_name']] = array(
                    $val['cell_name'] => array(
                        $val['factory_name'] => array(
                            $val['production_line_name'] => array(
                                $val['machine_id'] => $val['machine_name']
                            )
                        )
                    )
                );
            }
        }

        return $groupedData;
    }

}
