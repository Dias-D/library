<?php

namespace Controller;

class Template extends \Controller_template {

    public function before() {
        parent::before();
    }

    public function action_load($tpl = null) {
//        if (!\Input::is_ajax()) {
//            die();
//        }

        try {
            $tpl = \View::forge('partials/html/' . $tpl);
        } catch (\FuelException $e) {
            $tpl = "";
        } catch (Exception $e) {
            $tpl = "";
        }

        return \Response::forge($tpl);
    }

}
