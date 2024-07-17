<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Projetos extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('Projeto_model'); // Correto: nome do modelo sem a extensão .php
        $this->load->helper('url_helper');
    }

    public function index() {
        $data['projetos'] = $this->Projeto_model->get_projetos();
        echo json_encode($data['projetos']);
    }

    public function view($id) {
        $data['projeto'] = $this->Projeto_model->get_projetos($id);
        echo json_encode($data['projeto']);
    }

    public function create() {
        $this->set_cors_headers();
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            exit; // respond to preflight request and exit
        }

        $data = json_decode($this->input->raw_input_stream, true);
        $this->Projeto_model->set_projeto($data);
        echo json_encode(['status' => 'success']);
    }

    private function set_cors_headers() {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
    }

}
?>
