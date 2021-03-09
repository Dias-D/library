<?php

namespace Store\Controller;

class Store extends \Controller_template {
    
    public function action_index()
    {
        \Module::load('library');

        $data['store'] = \Library\Model\Book::find('all');
        $this->template->title = "Loja";
        
        $this->template->header = \View::forge('partials/store');
        $this->template->footer = \View::forge('partials/footer');
        $this->template->content = \View::forge('index', $data);

    }
}