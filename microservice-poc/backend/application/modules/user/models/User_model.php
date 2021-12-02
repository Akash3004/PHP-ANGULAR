<?php
class User_Model extends CI_Model{
	public function getUser($postData) {
        $this->db->select("u.username,u.realname,u.level");
        $this->db->from("users as u");
        $this->db->where("u.username",$postData);
        $rs = $this->db->get()->row_array();
        return ($rs) ? $rs : null;
    }

}