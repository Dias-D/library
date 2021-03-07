<?php

namespace Library\Controller;

class Book extends \Controller\Admin {

    public function before()
    {
        parent::before();

        if (!\Auth::has_access('library.book[access]')) {
            \Session::set_flash('error', 'Acesso negado!!');
            \Response::redirect('main');
        }
    }

    public function action_index()
    {
        $data['book'] = \Library\Model\Book::find('all');
        $data['publisher'] = \Library\Model\Publisher::find('all');
        $data['author'] = \Library\Model\Author::find('all');
        $this->template->title = "Livro";
        $this->template->content = \View::forge('book/index', $data);
    }

    public function action_create()
    {
        if (!\Auth::has_access('library.book[create]')) {
            \Session::set_flash('error', 'Acesso negado!!');
            \Response::redirect('library/book');
        }

        if (\Input::method() == 'POST') {
            $val = \Library\Model\Book::validate('create');

            if ($val->run()) {
                $book = \Library\Model\Book::forge(array(
                            'author_id' => \Input::post('author_id'),
                            'publisher_id' => \Input::post('publisher_id'),
                            'name' => \Input::post('name'),
                            'active' => \Input::post('active')
                ));

                if ($book and $book->save()) {
                    $log = \Model\SystemActivity::forge(array(
                                'user_id' => $this->getCurrentUser()->id,
                                'date' => date('Y-m-d H:i:s'),
                                'event' => \Model\SystemActivity::TYPE_CREATE,
                                'module' => 'Biblioteca',
                                'area' => 'Livro',
                                'new_registry' => json_encode($book->to_array())
                    ));
                    $log->save();

                    \Session::set_flash('Inserido com sucesso');

                    \Response::redirect('library/book');
                } else {
                    \Session::set_flash('error', 'Erro ao criar Livro, tente novamente');
                }
            } else {
                \Session::set_flash('error', $val->error());
            }
        }

        $tplData['publisher'] = \Library\Model\Publisher::find('all');
        $tplData['author'] = \Library\Model\Author::find('all');

        $this->template->set_global('tplData', $tplData, false);

        $this->template->title = "Livro";        
        $this->template->content = \View::forge('book/create');
    }

    public function action_edit($id = null)
    {
        if (!\Auth::has_access('library.book[update]')) {
            \Session::set_flash('error', 'Acesso negado!!');
            \Response::redirect('library/book');
        }

        is_null($id) and \Response::redirect('unit');

        if (!$book = \Library\Model\Book::find($id)) {
            \Session::set_flash('error', 'Não foi encontrado dados para o #' . $id);
            \Response::redirect('library/book');
        }

        $val = \Library\Model\Book::validate('edit');

        if ($val->run()) {
            $oldRegistry = $book->to_array();

            $data = array(
                'author_id' => \Input::post('author_id'),
                'publisher_id' => \Input::post('publisher_id'),
                'name' => \Input::post('name'),
                'active' => \Input::post('active')
            );

            $book->set($data);

            if ($book && $book->save()) {
                $log = \Model\SystemActivity::forge(array(
                            'user_id' => $this->getCurrentUser()->id,
                            'date' => date('Y-m-d H:i:s'),
                            'event' => \Model\SystemActivity::TYPE_UPDATE,
                            'module' => 'Biblioteca',
                            'area' => 'Livro',
                            'old_registry' => json_encode($oldRegistry),
                            'new_registry' => json_encode($book->to_array())
                ));
                $log->save();

                \Session::set_flash('success', 'Editado com sucesso');

                \Response::redirect('library/book');
            } else {
                \Session::set_flash('error', 'Erro ao salvar, tente novamente');
            }
        } else {
            if (\Input::method() == 'POST') {
                $book->author_id = $val->validated('author_id');
                $book->publisher_id = $val->validated('publisher_id');
                $book->name = $val->validated('name');
                $book->active = $val->validated('active');

                \Session::set_flash('error', $val->error());
            }
            
            $tplData['publisher'] = \Library\Model\Publisher::find('all');
            $tplData['author'] = \Library\Model\Author::find('all');

            $this->template->set_global('tplData', $tplData, false);

            $this->template->set_global('book', $book, false);
        }

        $this->template->title = "Livro";
        $this->template->content = \View::forge('book/edit');
    }

    public function action_delete($id = null)
    {
        if (!\Auth::has_access('library.book[delete]')) {
            \Session::set_flash('error', 'Acesso negado!!');
            \Response::redirect('library/book');
        }

        is_null($id) and \Response::redirect('unit');

        if ($book = \Library\Model\Book::find($id)) {
            $oldRegistry = $book->to_array();

            $book->delete();

            $log = \Model\SystemActivity::forge(array(
                        'user_id' => $this->getCurrentUser()->id,
                        'date' => date('Y-m-d H:i:s'),
                        'event' => \Model\SystemActivity::TYPE_DELETE,
                        'module' => 'Biblioteca',
                        'area' => 'Livro',
                        'old_registry' => json_encode($oldRegistry)
            ));
            $log->save();

            \Session::set_flash('success', 'Livro deletado');
        } else {
            \Session::set_flash('error', 'Livro não pode ser deletado');
        }

        \Response::redirect('library/book');
    }

}