<?php

use Doctrine\Common\ClassLoader;
use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;

class Doctrine {

    public $em;

    public function __construct() {
        global $db;
        require_once FCPATH . 'vendor/autoload.php';

        require APPPATH . 'config/database.php';

        $connection_options = array(
            'driver'        => 'pdo_mysql',
            'user'          => $db['default']['username'],
            'password'      => $db['default']['password'],
            'host'          => $db['default']['hostname'],
            'dbname'        => $db['default']['database'],
            'charset'       => $db['default']['char_set'],
            'driverOptions' => array(
                'charset' => $db['default']['char_set'],
            ),
        );

        $models_namespace = 'Entities';
        $models_path = APPPATH . 'models/Entities';
        $proxies_dir = APPPATH . 'models/Proxies';
        $metadata_paths = array(APPPATH . 'models/Entities');

        $isDevMode = true;

        $config = Setup::createAnnotationMetadataConfiguration($metadata_paths, $isDevMode, $proxies_dir, null, false);
        $this->em = EntityManager::create($connection_options, $config);

        $loader = new ClassLoader($models_namespace, $models_path);
        $loader->register();
    }
}
