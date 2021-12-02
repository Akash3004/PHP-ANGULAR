<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH . '/libraries/REST_Controller.php';
use Restserver\Libraries\REST_Controller;

class Product extends REST_Controller {

	public function __construct() {
    	parent::__construct();
    	$this->load->model('Product_model','Product');
    }

	public function index_get(){
		$product = $this->Product->getProduct();
      	if ($product) {
            return $this->response(
                [
                    'success' => TRUE,
                    'response' => $product
                ],
                REST_Controller::HTTP_OK,
                TRUE
            );
        }

        return $this->response(
            [
                'success' => FALSE,
                'message' => 'product not found'
            ],
            REST_Controller::HTTP_NOT_FOUND,
            TRUE
        );
		
	}
}
