<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Atividades extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('Atividade_model');
        $this->load->helper('url_helper');
        $this->output->set_content_type('application/json');
        $this->set_cors_headers();
    }

    private function set_cors_headers() {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            exit;
        }
    }

    public function index() {
        try {
            $atividades = $this->Atividade_model->get_atividades();
            echo json_encode($atividades);
        } catch (Exception $e) {
            log_message('error', $e->getMessage());
            $this->output->set_status_header(500);
            echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }

    public function view($id) {
        try {
            $atividade = $this->Atividade_model->get_atividades($id);
            if (!$atividade) {
                $this->output->set_status_header(404);
                echo json_encode(['status' => 'error', 'message' => 'Atividade not found']);
            } else {
                echo json_encode($atividade);
            }
        } catch (Exception $e) {
            log_message('error', $e->getMessage());
            $this->output->set_status_header(500);
            echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }

    public function create() {
        try {
            $data = json_decode($this->input->raw_input_stream, true);
            if (json_last_error() !== JSON_ERROR_NONE) {
                throw new Exception('JSON decode error: ' . json_last_error_msg());
            }
            $this->Atividade_model->set_atividade($data);
            $this->output->set_status_header(201);
            echo json_encode(['status' => 'success']);
        } catch (Exception $e) {
            log_message('error', $e->getMessage());
            $this->output->set_status_header(500);
            echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }

    public function update($id) {
        try {
            $data = json_decode(file_get_contents("php://input"), true);
            unset($data['projetoId']);

            if ($this->Atividade_model->update_atividade($id, $data)) {
                $updatedAtividade = $this->Atividade_model->get_atividades($id);
                $this->output
                    ->set_content_type('application/json')
                    ->set_status_header(200)
                    ->set_output(json_encode($updatedAtividade));
            } else {
                $this->output
                    ->set_content_type('application/json')
                    ->set_status_header(500)
                    ->set_output(json_encode(['error' => 'Failed to update atividade']));
            }
        } catch (Exception $e) {
            log_message('error', $e->getMessage());
            $this->output->set_status_header(500);
            echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }

    public function delete($id) {
        try {
            if ($this->Atividade_model->delete_atividade($id)) {
                echo json_encode(['status' => 'success']);
            } else {
                throw new Exception('Failed to delete atividade');
            }
        } catch (Exception $e) {
            log_message('error', $e->getMessage());
            $this->output->set_status_header(500);
            echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }
}
?>
