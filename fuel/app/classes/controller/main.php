<?php

namespace Controller;

class Main extends Admin {

    public function before()
    {
        parent::before();

        \Module::load('library');
    }

    /**
     * Main, where it all begin
     *
     * @access  public
     * @return  void
     */
    public function action_index()
    {
        $tplData['book'] = \Library\Model\Book::query()
            ->related(['author', 'library', 'publisher'])
            ->get();

        $this->template->title = 'Biblioteca';
        $this->template->content = \view::forge('main/index', $tplData);
    }
}
