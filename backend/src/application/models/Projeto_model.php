<?php
class Projeto_model extends CI_Model {

    public function __construct() {
        $this->load->database();
    }

    public function get_projetos($id = FALSE) {
        if ($id === FALSE) {
            $query = $this->db->get('projeto');
            return $query->result_array();
        }

        $query = $this->db->get_where('projeto', array('id' => $id));
        return $query->row_array();
    }

    public function set_projeto($data) {
        return $this->db->insert('projeto', $data);
    }

    public function update_projeto($id, $data) {
        $this->db->where('id', $id);
        return $this->db->update('projeto', $data);
    }

    public function delete_projeto($id) {
        $this->db->where('id', $id);
        return $this->db->delete('projeto');
    }
}
?>
