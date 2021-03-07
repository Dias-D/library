<?php

namespace Library\Controller;

class Author extends \Controller\Admin {

    public function before()
    {
        parent::before();

        if (!\Auth::has_access('library.author[access]')) {
            \Session::set_flash('error', __('access_denied'));
            \Response::redirect('main');
        }
    }

    public function action_index()
    {
        $data['author'] = \Library\Model\Author::find('all');
        $this->template->title = "Autor";
        $this->template->content = \View::forge('author/index', $data);
    }

    public function action_create()
    {
        if (!\Auth::has_access('library.author[create]')) {
            \Session::set_flash('error', __('access_denied'));
            \Response::redirect('library/author');
        }

        if (\Input::method() == 'POST') {
            $val = \Library\Model\Author::validate('create');

            if ($val->run()) {
                $author = \Library\Model\Author::forge(array(
                            'name' => \Input::post('name'),
                            'acronym' => \Input::post('acronym'),
                            'active' => \Input::post('active')
                ));

                if ($author and $author->save()) {
                    $log = \Model\SystemActivity::forge(array(
                                'user_id' => $this->getCurrentUser()->id,
                                'date' => date('Y-m-d H:i:s'),
                                'event' => \Model\SystemActivity::TYPE_CREATE,
                                'module' => 'Biblioteca',
                                'area' => 'Autor',
                                'new_registry' => json_encode($author->to_array())
                    ));
                    $log->save();

                    \Session::set_flash('Inserido com sucesso');

                    \Response::redirect('library/author');
                } else {
                    \Session::set_flash('error', 'Erro ao criar unidade tente novamente');
                }
            } else {
                \Session::set_flash('error', $val->error());
            }
        }

        $this->template->title = "Autor";        
        $this->template->content = \View::forge('author/create');
    }

    public function action_edit($id = null)
    {
        if (!\Auth::has_access('library.author[update]')) {
            \Session::set_flash('error', __('access_denied'));
            \Response::redirect('library/author');
        }

        is_null($id) and \Response::redirect('unit');

        if (!$author = \Library\Model\Author::find($id)) {
            \Session::set_flash('error', 'Não foi encontrado dados para o #' . $id);
            \Response::redirect('library/author');
        }

        $val = \Library\Model\Author::validate('edit');

        if ($val->run()) {
            $oldRegistry = $author->to_array();

            $data = array(
                'name' => \Input::post('name'),
                'acronym' => \Input::post('acronym'),
                'active' => \Input::post('active')
            );

            $author->set($data);

            if ($author && $author->save()) {
                $log = \Model\SystemActivity::forge(array(
                            'user_id' => $this->getCurrentUser()->id,
                            'date' => date('Y-m-d H:i:s'),
                            'event' => \Model\SystemActivity::TYPE_UPDATE,
                            'module' => 'Biblioteca',
                            'area' => 'Autor',
                            'old_registry' => json_encode($oldRegistry),
                            'new_registry' => json_encode($author->to_array())
                ));
                $log->save();

                \Session::set_flash('success', 'Editado com sucesso');

                \Response::redirect('library/author');
            } else {
                \Session::set_flash('error', 'Erro ao salvar, tente novamente');
            }
        } else {
            if (\Input::method() == 'POST') {
                $author->name = $val->validated('name');
                $author->acronym = $val->validated('acronym');
                $author->active = $val->validated('active');

                \Session::set_flash('error', $val->error());
            }

            $this->template->set_global('author', $author, false);
        }

        $this->template->title = "Autor";
        $this->template->content = \View::forge('author/edit');
    }

    public function action_delete($id = null)
    {
        if (!\Auth::has_access('library.author[delete]')) {
            \Session::set_flash('error', __('access_denied'));
            \Response::redirect('library/author');
        }

        is_null($id) and \Response::redirect('unit');

        if ($author = \Library\Model\Author::find($id)) {
            $oldRegistry = $author->to_array();

            $author->delete();

            $log = \Model\SystemActivity::forge(array(
                        'user_id' => $this->getCurrentUser()->id,
                        'date' => date('Y-m-d H:i:s'),
                        'event' => \Model\SystemActivity::TYPE_DELETE,
                        'module' => 'Biblioteca',
                        'area' => 'Autor',
                        'old_registry' => json_encode($oldRegistry)
            ));
            $log->save();

            \Session::set_flash('success', 'Unidade deletada');
        } else {
            \Session::set_flash('error', 'Unidade não pode ser deletada');
        }

        \Response::redirect('library/author');
    }

}