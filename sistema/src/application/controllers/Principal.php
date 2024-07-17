<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Principal extends CI_Controller {

    public function povoar() {
        $this->load->database();
        $this->db->query("INSERT INTO projetos (nome) VALUES ('Projeto 1'), ('Projeto 2')");
        $this->db->query("INSERT INTO atividades (projeto_id, nome, descricao) VALUES (1, 'Atividade 1', 'Descrição 1'), (2, 'Atividade 2', 'Descrição 2')");
        echo "Banco de dados povoado com sucesso!";
    }
}
