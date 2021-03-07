<?php

namespace controller;

class HttpError extends Base {

    /**
     * The 404 action for the application.
     *
     * @access  public
     * @return  Response
     */
    public function action_404()
    {
        return \Response::forge(\Presenter::forge('httperror/404'), 404);
    }

}
