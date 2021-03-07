<?php

namespace Admin\Controller\Acl;

class GroupPermission extends \Controller\Admin {

    public function before()
    {
        parent::before();

        \lang::load('permission');

        if (!\Auth::has_access('admin.grouppermission[access]')) {
            \Session::set_flash('error', __('access_denied'));

            \Response::redirect('main');
        };
    }

    public function action_index()
    {
        $tplData['usersGroups'] = $this->getGroups();

        if (\input::method() === 'POST') {
            $groupId = \input::post('group_id');

            $tplData['groupId'] = $groupId;
            $tplData['perms'] = $this->getPermissions();
            $tplData['groupPerms'] = $this->getGroupPermissions($groupId);
        }

        $this->template->title = "Groups Permission";
        $this->template->content = \View::forge('acl/grouppermission/index', $tplData);
    }

    public function action_save()
    {
        if (!\Auth::has_access('admin.grouppermission[update]')) {
            \Session::set_flash('error', 'Acesso negado');

            \Response::redirect('main');
        };

        $perms = \input::post('perms', []);
        $groupId = \input::post('group_id', 0);
        $permsLsit = array();

        \Cache::delete_all(\Config::get('ormauth.cache_prefix', 'auth') . '.permissions'); // flush Auth perms
        $this->clearPerms($groupId);

        if (count($perms) == 0) { // If has no perms yet, create it
            $grouppermissions = \Auth\Model\Auth_Grouppermission::query()
                    ->where(array('group_id' => $groupId))
                    ->get();

            // Clean all permissions
            foreach ($grouppermissions as $perm) {
                $perm->actions = array();
                $perm->save();

                //array_push($permsLsit, $grouppermissions->to_array());
            }

            \Response::redirect('admin/acl/grouppermission/');
        }

        foreach ($perms as $permId => $perm) {
            $grouppermissions = \Auth\Model\Auth_Grouppermission::query()
                    ->where(array('group_id' => $groupId, 'perms_id' => $permId))
                    ->get_one();

            if ($grouppermissions) {
                $grouppermissions->actions = array_keys($perm);
                $grouppermissions->save();

                //array_push($permsLsit, $grouppermissions->to_array());
            } else {
                $grouppermissions = \Auth\Model\Auth_Grouppermission::forge();

                $grouppermissions->group_id = $groupId;
                $grouppermissions->perms_id = $permId;

                $grouppermissions->actions = array_keys($perm);
                $grouppermissions->save();

                //array_push($permsLsit, $grouppermissions->to_array());
            }
        }

        \Response::redirect('admin/acl/grouppermission/');
    }

    protected function clearPerms($groupId)
    {
        $groupPermsTable = \Config::get('ormauth.table_name', 'users') . '_group_permissions';

        $query = \DB::delete($groupPermsTable);
        $query->where('group_id', '=', $groupId);

        return $query->execute();
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

    protected function getPermissions()
    {
        $perms = \Auth\Model\Auth_Permission::find('all');
        $return = array();

        if ($perms) {
            foreach ($perms as $perm) {
                $return[$perm->area][$perm->permission]['actions'] = $perm->actions;
                $return[$perm->area][$perm->permission]['perm_id'] = $perm->id;
            }
            return $return;
        }

        return array();
    }

    protected function getGroupPermissions($groupId)
    {
        if (empty($groupId)) {
            return array();
        }

        $return = array();
        $grouppermissions = \Auth\Model\Auth_Grouppermission::query()
                ->where('group_id', '=', $groupId)
                ->get();

        foreach ($grouppermissions as $perm) {
            $return[$perm->perms_id]['actions'] = $perm->actions ?: array();
        }

        return $return;
    }

}
