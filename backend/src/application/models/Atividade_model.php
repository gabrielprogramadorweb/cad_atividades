<?php
class Atividade_model extends CI_Model {

    public function __construct() {
        $this->load->database();
    }

    public function get_atividades($id = FALSE) {
        if ($id === FALSE) {
            $query = $this->db->get('atividade');
            return $query->result_array();
        }

        $query = $this->db->get_where('atividade', array('id' => $id));
        return $query->row_array();
    }

    public function set_atividade($data) {
        return $this->db->insert('atividade', $data);
    }

    public function update_atividade($id, $data) {
        $this->db->where('id', $id);
        return $this->db->update('atividade', $data);
    }

    public function delete_atividade($id) {
        $this->db->where('id', $id);
        return $this->db->delete('atividade');
    }

    public function delete_atividades_por_projeto($idProjeto) {
        $this->db->where('idProjeto', $idProjeto);
        return $this->db->delete('atividade');
    }

}
?>
