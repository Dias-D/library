<?php

/**
 * The welcome 404 presenter.
 *
 * @package  app
 * @extends  Presenter
 */
class Presenter_HttpError_404 extends Presenter {

    /**
     * Prepare the view data, keeping this in here helps clean up
     * the controller.
     *
     * @return void
     */
    public function view()
    {
        $this->header = \View::forge('partials/header');
        $this->content = \View::forge('httperror/404_content');
        $this->footer = \View::forge('partials/footer');
    }

}
