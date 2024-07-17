<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class CORS {
    public function enable_cors() {
        // Permitir qualquer origem
        header("Access-Control-Allow-Origin: *");

        // Permitir métodos específicos
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

        // Permitir cabeçalhos específicos
        header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

        // Responder com um status 200 para requisições OPTIONS
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            header('HTTP/1.1 200 OK');
            exit;
        }
    }
}
