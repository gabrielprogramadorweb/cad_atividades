<?php

use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;

class Doctrine {

    public $em;

    public function __construct() {
        // Caminho para as entidades
        $paths = array(APPPATH . 'models/Entities');
        $isDevMode = true;

        // Configurações do banco de dados
        $dbParams = array(
            'driver'   => 'pdo_mysql',
            'user'     => 'cad_atividades',
            'password' => 'password',
            'dbname'   => 'cad_atividades',
            'host'     => 'db',
            'charset'  => 'utf8'
        );

        require_once FCPATH . 'vendor/autoload.php';
        $config = Setup::createAnnotationMetadataConfiguration($paths, $isDevMode, null, null, false);
        $config->setMetadataDriverImpl(
            Setup::createAnnotationMetadataConfiguration($paths, $isDevMode, null, null, false)->newDefaultAnnotationDriver($paths, false)
        );
        $this->em = EntityManager::create($dbParams, $config);
    }
}
