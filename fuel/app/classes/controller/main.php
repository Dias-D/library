<?php

namespace Controller;

class Main extends Admin {

    public function before()
    {
        parent::before();
    }

    /**
     * Main, where it all begin
     *
     * @access  public
     * @return  void
     */
    public function action_index()
    {
        $this->template->title = 'Biblioteca';
    }
}
