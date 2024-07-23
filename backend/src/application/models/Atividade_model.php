<?php

use Doctrine\ORM\EntityManagerInterface;

class Atividade_model extends CI_Model {

    /**
     * @var EntityManagerInterface
     */
    private $em;

    public function __construct() {
        parent::__construct();
        $this->em = $this->doctrine->em;
    }

    public function get_atividades($id = FALSE) {
        try {
            if ($id === FALSE) {
                $atividades = $this->em->getRepository('Entities\Atividade')->findAll();
                $result = [];
                foreach ($atividades as $atividade) {
                    $result[] = [
                        'id' => $atividade->getId(),
                        'dataCadastro' => $atividade->getDataCadastro()->format('Y-m-d H:i:s'),
                        'descricao' => $atividade->getDescricao(),
                        'idProjeto' => $atividade->getIdProjeto()
                    ];
                }
                return $result;
            }

            $atividade = $this->em->getRepository('Entities\Atividade')->find($id);
            if ($atividade) {
                return [
                    'id' => $atividade->getId(),
                    'dataCadastro' => $atividade->getDataCadastro()->format('Y-m-d H:i:s'),
                    'descricao' => $atividade->getDescricao(),
                    'idProjeto' => $atividade->getIdProjeto()
                ];
            }
            return null;
        } catch (Exception $e) {
            log_message('error', 'Erro ao obter atividades: ' . $e->getMessage());
            throw $e;
        }
    }

    public function set_atividade($data) {
        try {
            $atividade = new Entities\Atividade();

            if (isset($data['dataCadastro'])) {
                $atividade->setDataCadastro(new \DateTime($data['dataCadastro']));
            } else {
                $atividade->setDataCadastro(new \DateTime());
            }

            $atividade->setDescricao($data['descricao']);
            $atividade->setIdProjeto($data['idProjeto']);

            $this->em->persist($atividade);
            $this->em->flush();
        } catch (Exception $e) {
            log_message('error', 'Erro ao definir atividade: ' . $e->getMessage());
            throw $e;
        }
    }


    public function update_atividade($id, $data) {
        try {
            $atividade = $this->em->getRepository('Entities\Atividade')->find($id);
            if ($atividade) {
                $atividade->setDataCadastro(new \DateTime($data['dataCadastro']));
                $atividade->setDescricao($data['descricao']);
                $atividade->setIdProjeto($data['idProjeto']);

                $this->em->persist($atividade);
                $this->em->flush();
                return true;
            }
            return false;
        } catch (Exception $e) {
            log_message('error', 'Erro ao atualizar atividade: ' . $e->getMessage());
            throw $e;
        }
    }

    public function delete_atividade($id) {
        try {
            $atividade = $this->em->getRepository('Entities\Atividade')->find($id);
            if ($atividade) {
                $this->em->remove($atividade);
                $this->em->flush();
                return true;
            }
            return false;
        } catch (Exception $e) {
            log_message('error', 'Erro ao deletar atividade: ' . $e->getMessage());
            throw $e;
        }
    }

    public function delete_atividades_por_projeto($idProjeto) {
        try {
            $atividades = $this->em->getRepository('Entities\Atividade')->findBy(['idProjeto' => $idProjeto]);
            foreach ($atividades as $atividade) {
                $this->em->remove($atividade);
            }
            $this->em->flush();
            return true;
        } catch (Exception $e) {
            log_message('error', 'Erro ao deletar atividades por projeto: ' . $e->getMessage());
            throw $e;
        }
    }
}
?>
