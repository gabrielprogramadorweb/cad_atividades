<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Projetos extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->library('doctrine');
        $this->load->model('Projeto_model');
        $this->load->helper('url_helper');
    }

    public function index() {
        $this->set_cors_headers();
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            exit;
        }

        try {
            $projetos = $this->Projeto_model->get_projetos();
            $result = [];
            foreach ($projetos as $projeto) {
                $result[] = [
                    'id' => $projeto->getId(),
                    'descricao' => $projeto->getDescricao()
                ];
            }
            echo json_encode($result);
        } catch (Exception $e) {
            log_message('error', $e->getMessage());
            echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }

    public function view($id) {
        $this->set_cors_headers();
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            exit;
        }

        try {
            $projeto = $this->Projeto_model->get_projetos($id);
            $result = [
                'id' => $projeto->getId(),
                'descricao' => $projeto->getDescricao()
            ];
            echo json_encode($result);
        } catch (Exception $e) {
            log_message('error', $e->getMessage());
            echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }

    public function create() {
        $this->set_cors_headers();
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            exit;
        }

        try {
            $data = json_decode($this->input->raw_input_stream, true);
            $this->Projeto_model->set_projeto($data);
            echo json_encode(['status' => 'success']);
        } catch (Exception $e) {
            log_message('error', $e->getMessage());
            echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }

    public function update($id) {
        $this->set_cors_headers();
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            exit;
        }

        try {
            $data = json_decode($this->input->raw_input_stream, true);
            $this->Projeto_model->update_projeto($id, $data);
            echo json_encode(['status' => 'success']);
        } catch (Exception $e) {
            log_message('error', $e->getMessage());
            echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }

    public function delete($id) {
        $this->set_cors_headers();
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            exit;
        }

        try {
            // Excluir atividades associadas ao projeto
            $this->load->model('Atividade_model');
            $this->Atividade_model->delete_atividades_por_projeto($id);

            // Excluir o projeto
            $this->Projeto_model->delete_projeto($id);
            echo json_encode(['status' => 'success']);
        } catch (Exception $e) {
            log_message('error', $e->getMessage());
            echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }

    private function set_cors_headers() {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
    }
}
?>
