<?php

namespace Library\Controller;

class Library extends \Controller\Admin {

    public function before()
    {
        parent::before();

        if (!\Auth::has_access('library.library[access]')) {
            \Session::set_flash('error', 'Acesso negado!!');
            \Response::redirect('main');
        }
    }

    public function action_index()
    {
        $data['library'] = \Library\Model\Library::find('all');
        $this->template->title = "Biblioteca";
        $this->template->content = \View::forge('index', $data);
    }

    public function action_create()
    {
        if (!\Auth::has_access('library.library[create]')) {
            \Session::set_flash('error', 'Acesso negado!!');
            \Response::redirect('library');
        }

        if (\Input::method() == 'POST') {
            $val = \Library\Model\Library::validate('create');

            if ($val->run()) {
                $library = \Library\Model\Library::forge(array(
                            'name' => \Input::post('name'),
                            'description' => \Input::post('description'),
                            'active' => \Input::post('active')
                ));

                if ($library and $library->save()) {
                    $log = \Model\SystemActivity::forge(array(
                                'user_id' => $this->getCurrentUser()->id,
                                'date' => date('Y-m-d H:i:s'),
                                'event' => \Model\SystemActivity::TYPE_CREATE,
                                'module' => 'Biblioteca',
                                'new_registry' => json_encode($library->to_array())
                    ));
                    $log->save();

                    \Session::set_flash('Inserido com sucesso');

                    \Response::redirect('library');
                } else {
                    \Session::set_flash('error', 'Erro ao criar Biblioteca, tente novamente');
                }
            } else {
                \Session::set_flash('error', $val->error());
            }
        }

        $this->template->title = "Biblioteca";        
        $this->template->content = \View::forge('create');
    }

    public function action_edit($id = null)
    {
        if (!\Auth::has_access('library.library[update]')) {
            \Session::set_flash('error', 'Acesso negado!!');
            \Response::redirect('library');
        }

        is_null($id) and \Response::redirect('unit');

        if (!$library = \Library\Model\Library::find($id)) {
            \Session::set_flash('error', 'Não foi encontrado dados para o #' . $id);
            \Response::redirect('library');
        }

        $val = \Library\Model\Library::validate('edit');

        if ($val->run()) {
            $oldRegistry = $library->to_array();

            $data = array(
                'name' => \Input::post('name'),
                'description' => \Input::post('description'),
                'active' => \Input::post('active')
            );

            $library->set($data);

            if ($library && $library->save()) {
                $log = \Model\SystemActivity::forge(array(
                            'user_id' => $this->getCurrentUser()->id,
                            'date' => date('Y-m-d H:i:s'),
                            'event' => \Model\SystemActivity::TYPE_UPDATE,
                            'module' => 'Biblioteca',
                            'old_registry' => json_encode($oldRegistry),
                            'new_registry' => json_encode($library->to_array())
                ));
                $log->save();

                \Session::set_flash('success', 'Editado com sucesso');

                \Response::redirect('library');
            } else {
                \Session::set_flash('error', 'Erro ao salvar, tente novamente');
            }
        } else {
            if (\Input::method() == 'POST') {
                $library->name = $val->validated('name');
                $library->description = $val->validated('description');
                $library->active = $val->validated('active');

                \Session::set_flash('error', $val->error());
            }

            $this->template->set_global('library', $library, false);
        }

        $this->template->title = "Biblioteca";
        $this->template->content = \View::forge('edit');
    }

    public function action_delete($id = null)
    {
        if (!\Auth::has_access('library.library[delete]')) {
            \Session::set_flash('error', 'Acesso negado!!');
            \Response::redirect('library');
        }

        is_null($id) and \Response::redirect('unit');

        $library = \Library\Model\Library::query()
            ->related('book')
            ->where('id', '=', $id)
            ->get_one();

        if ($library) {
            if(!empty($library->book)) {
                \Session::set_flash('warning', 'Não pode deletar. Registro relacionado em Livros.');
                \Response::redirect('library');
            }

            $oldRegistry = $library->to_array();

            $library->delete();

            $log = \Model\SystemActivity::forge(array(
                        'user_id' => $this->getCurrentUser()->id,
                        'date' => date('Y-m-d H:i:s'),
                        'event' => \Model\SystemActivity::TYPE_DELETE,
                        'module' => 'Biblioteca',
                        'old_registry' => json_encode($oldRegistry)
            ));
            $log->save();

            \Session::set_flash('success', 'Biblioteca deletada');
        } else {
            \Session::set_flash('error', 'Biblioteca não pode ser deletada');
        }

        \Response::redirect('library');
    }

}