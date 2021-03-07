<?php

namespace Admin\Controller\Acl;

class Group extends \Controller\Admin {

    protected $disallowedEditDelete = array(1, 2, 3, 4, 5, 6);

    public function before()
    {
        parent::before();

        \lang::load('group');

        if (!\Auth::has_access('admin.group[access]')) {
            \Session::set_flash('error', __('access_denied'));

            \Response::redirect('main');
        };
    }

    public function action_index()
    {
        $data['usersGroups'] = $this->getGroups();
        $data['disallowedEditDelete'] = $this->disallowedEditDelete;

        $this->template->title = "Users groups";
        $this->template->content = \View::forge('acl/group/index', $data);
    }

    public function action_create()
    {
        if (!\Auth::has_access('admin.group[create]')) {
            \Session::set_flash('error', __('access_denied'));

            \Response::redirect('main');
        };

        if (\Input::method() == 'POST') {
            $val = \Admin\Model\Group::validate('create');

            if ($val->run()) {
                $group = \Auth\Model\Auth_Group::forge(array(
                            'name' => trim(\input::post('name'))
                ));

                if ($group and $group->save()) {
                    \Cache::delete(\Config::get('ormauth.cache_prefix', 'auth') . '.groups');

                    \Session::set_flash('success', 'Grupo adicionado');
                    \Response::redirect('admin/acl/group');
                } else {
                    \Session::set_flash('error', 'Não foi possível criar novo grupo, tente novamente');
                }
            } else {
                \Session::set_flash('error', $val->error());
            }
        }

        $this->template->title = "Groups";
        $this->template->content = \View::forge('acl/group/create');
    }

    public function action_edit($id = null)
    {
        if (!\Auth::has_access('admin.group[update]')) {
            \Session::set_flash('error', __('access_denied'));

            \Response::redirect('main');
        };

        is_null($id) and \Response::redirect('admin/acl/group');

        if (!$group = \Auth\Model\Auth_Group::find($id)) {
            \Session::set_flash('error', __('could_not_find_group'));
            \Response::redirect('admin/acl/group');
        }

        $val = \Admin\Model\Group::validate('edit');

        $oldData = $group->to_array();
        if ($val->run()) {

            $group->name = trim(\Input::post('name'));

            if ($group->save()) {
                \Cache::delete(\Config::get('ormauth.cache_prefix', 'auth') . '.groups');

                \Session::set_flash('success', __('updated_group'));

                \Response::redirect('admin/acl/group');
            } else {
                Session::set_flash('error', __('could_not_update_group'));
            }
        } else {
            if (\Input::method() == 'POST') {
                $group->name = $val->validated('name');

                \Session::set_flash('error', $val->error());
            }

            $this->template->set_global('usersGroup', $group, false);
        }

        $this->template->title = "Users groups";
        $this->template->content = \View::forge('acl/group/edit');
    }

    public function action_delete($id = null)
    {
        if (!\Auth::has_access('admin.group[delete]')) {
            \Session::set_flash('error', __('access_denied'));

            \Response::redirect('main');
        };

        is_null($id) and \Response::redirect('admin/acl/group');

        if ($group = \Admin\Model\Group::find($id)) {
            \Cache::delete(\Config::get('ormauth.cache_prefix', 'auth') . '.groups');

            if ($this->hasUsersInGroup($id)) {
                \Session::set_flash('warning', 'Este grupo não pode ser removido, pois existe usuários cadastrados');
                
                \Response::redirect('admin/acl/group');
            }
            
            $group->delete();

            \Session::set_flash('success', 'Grupo Removido com sucesso');
        } else {
            \Session::set_flash('error', 'Não foi possivel remover o grupo');
        }

        \Response::redirect('admin/acl/group');
    }

    /**
     * Verify if exists user that belongs to a group.
     * 
     * @param int $groupId
     * @return bool
     */
    protected function hasUsersInGroup($groupId)
    {
        $user = \User\Model\User::query();
        $user->where('group_id', '=', $groupId);

        return $user->get() ? true : false;
    }

    protected function getGroups()
    {
        $isRoot = \Auth::member(\User\Model\User::GROUP_ROOT);

        $groups = \Admin\Model\Group::query();

        if ($isRoot) {
            $groups->where('id', '!=', \User\Model\User::GROUP_ROOT);
        } else {
            $groups->where('id', '>', \User\Model\User::GROUP_ROOT);
        }

        return $groups->get();
    }

}
