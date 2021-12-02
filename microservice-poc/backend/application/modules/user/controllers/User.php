<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH . '/libraries/REST_Controller.php';
use Restserver\Libraries\REST_Controller;

class User extends REST_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('User_model','User');
    }
    public function index_post(){
        $request = file_get_contents("php://input");
        $postData = isset($request) ? $request : NULL;
        $user = $this->User->getUser($postData);
        if ($user) {
            $user['token'] = 'eyJ1c2VybmFtZSI6ImFkbWluIiwicmVhbG5hbWUiOiJBZG1pbiBVc2VyIiwibGV2ZWwiOiIxIiwiYWxnIjoiSFMyNTYifQ';
        
            return $this->response(
                [
                    'success' => TRUE,
                    'response' => $user
                ],
                REST_Controller::HTTP_OK,
                TRUE
            );
        }

        return $this->response(
            [
                'success' => FALSE,
                'message' => 'user not found'
            ],
            REST_Controller::HTTP_NOT_FOUND,
            TRUE
        );
    }
}
