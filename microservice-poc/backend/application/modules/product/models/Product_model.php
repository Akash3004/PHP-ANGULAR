<?php
class Product_Model extends CI_Model{
	
	public function getProduct() {
        $this->db->select("p.product_name,p.product_summary,p.product_price");
        $this->db->from("products as p");
        $rs = $this->db->get()->row_array();
        return $rs;
   	}
}
?>	