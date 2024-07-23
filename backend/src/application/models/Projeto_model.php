<?php

use Doctrine\ORM\EntityManagerInterface;

class Projeto_model extends CI_Model {

    /**
     * @var EntityManagerInterface
     */
    private $em;

    public function __construct() {
        parent::__construct();
        $this->em = $this->doctrine->em;
    }

    public function get_projetos($id = FALSE) {
        try {
            if ($id === FALSE) {
                return $this->em->getRepository('Entities\Projeto')->findAll();
            }
            return $this->em->getRepository('Entities\Projeto')->find($id);
        } catch (Exception $e) {
            log_message('error', 'Erro ao obter projetos: ' . $e->getMessage());
            throw $e;
        }
    }

    public function set_projeto($data) {
        try {
            $projeto = new Entities\Projeto();
            $projeto->setDescricao($data['descricao']);

            $this->em->persist($projeto);
            $this->em->flush();
        } catch (Exception $e) {
            log_message('error', 'Erro ao definir projeto: ' . $e->getMessage());
            throw $e;
        }
    }

    public function update_projeto($id, $data) {
        try {
            $projeto = $this->em->getRepository('Entities\Projeto')->find($id);
            if ($projeto) {
                $projeto->setDescricao($data['descricao']);

                $this->em->persist($projeto);
                $this->em->flush();
                return true;
            }
            return false;
        } catch (Exception $e) {
            log_message('error', 'Erro ao atualizar projeto: ' . $e->getMessage());
            throw $e;
        }
    }

    public function delete_projeto($id) {
        try {
            $projeto = $this->em->getRepository('Entities\Projeto')->find($id);
            if ($projeto) {
                $this->em->remove($projeto);
                $this->em->flush();
                return true;
            }
            return false;
        } catch (Exception $e) {
            log_message('error', 'Erro ao deletar projeto: ' . $e->getMessage());
            throw $e;
        }
    }
}
?>
