<?php

namespace Library\Controller;

class Publisher extends \Controller\Admin {

    public function before()
    {
        parent::before();

        if (!\Auth::has_access('library.publisher[access]')) {
            \Session::set_flash('error', __('access_denied'));
            \Response::redirect('main');
        }
    }

    public function action_index()
    {
        $data['publisher'] = \Library\Model\Publisher::find('all');
        $this->template->title = "Editora";
        $this->template->content = \View::forge('publisher/index', $data);
    }

    public function action_create()
    {
        if (!\Auth::has_access('library.publisher[create]')) {
            \Session::set_flash('error', __('access_denied'));
            \Response::redirect('library/publisher');
        }

        if (\Input::method() == 'POST') {
            $val = \Library\Model\Publisher::validate('create');

            if ($val->run()) {
                $publisher = \Library\Model\Publisher::forge(array(
                            'name' => \Input::post('name'),
                            'description' => \Input::post('description'),
                            'active' => \Input::post('active')
                ));

                if ($publisher and $publisher->save()) {
                    $log = \Model\SystemActivity::forge(array(
                                'user_id' => $this->getCurrentUser()->id,
                                'date' => date('Y-m-d H:i:s'),
                                'event' => \Model\SystemActivity::TYPE_CREATE,
                                'module' => 'Biblioteca',
                                'area' => 'Editora',
                                'new_registry' => json_encode($publisher->to_array())
                    ));
                    $log->save();

                    \Session::set_flash('Inserido com sucesso');

                    \Response::redirect('library/publisher');
                } else {
                    \Session::set_flash('error', 'Erro ao criar unidade tente novamente');
                }
            } else {
                \Session::set_flash('error', $val->error());
            }
        }

        $this->template->title = "Editora";        
        $this->template->content = \View::forge('publisher/create');
    }

    public function action_edit($id = null)
    {
        if (!\Auth::has_access('library.publisher[update]')) {
            \Session::set_flash('error', __('access_denied'));
            \Response::redirect('library/publisher');
        }

        is_null($id) and \Response::redirect('unit');

        if (!$publisher = \Library\Model\Publisher::find($id)) {
            \Session::set_flash('error', 'Não foi encontrado dados para o #' . $id);
            \Response::redirect('library/publisher');
        }

        $val = \Library\Model\Publisher::validate('edit');

        if ($val->run()) {
            $oldRegistry = $publisher->to_array();

            $data = array(
                'name' => \Input::post('name'),
                'description' => \Input::post('description'),
                'active' => \Input::post('active')
            );

            $publisher->set($data);

            if ($publisher && $publisher->save()) {
                $log = \Model\SystemActivity::forge(array(
                            'user_id' => $this->getCurrentUser()->id,
                            'date' => date('Y-m-d H:i:s'),
                            'event' => \Model\SystemActivity::TYPE_UPDATE,
                            'module' => 'Biblioteca',
                            'area' => 'Editora',
                            'old_registry' => json_encode($oldRegistry),
                            'new_registry' => json_encode($publisher->to_array())
                ));
                $log->save();

                \Session::set_flash('success', 'Editado com sucesso');

                \Response::redirect('library/publisher');
            } else {
                \Session::set_flash('error', 'Erro ao salvar, tente novamente');
            }
        } else {
            if (\Input::method() == 'POST') {
                $publisher->name = $val->validated('name');
                $publisher->description = $val->validated('description');
                $publisher->active = $val->validated('active');

                \Session::set_flash('error', $val->error());
            }

            $this->template->set_global('publisher', $publisher, false);
        }

        $this->template->title = "Editora";
        $this->template->content = \View::forge('publisher/edit');
    }

    public function action_delete($id = null)
    {
        if (!\Auth::has_access('library.publisher[delete]')) {
            \Session::set_flash('error', __('access_denied'));
            \Response::redirect('library/publisher');
        }

        is_null($id) and \Response::redirect('unit');

        if ($publisher = \Library\Model\Publisher::find($id)) {
            $oldRegistry = $publisher->to_array();

            $publisher->delete();

            $log = \Model\SystemActivity::forge(array(
                        'user_id' => $this->getCurrentUser()->id,
                        'date' => date('Y-m-d H:i:s'),
                        'event' => \Model\SystemActivity::TYPE_DELETE,
                        'module' => 'Biblioteca',
                        'area' => 'Editora',
                        'old_registry' => json_encode($oldRegistry)
            ));
            $log->save();

            \Session::set_flash('success', 'Unidade deletada');
        } else {
            \Session::set_flash('error', 'Unidade não pode ser deletada');
        }

        \Response::redirect('library/publisher');
    }

}