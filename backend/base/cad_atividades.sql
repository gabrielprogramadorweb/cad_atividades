-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Tempo de geração: 18-Jul-2024 às 15:05
-- Versão do servidor: 10.5.25-MariaDB-ubu2004
-- versão do PHP: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `cad_atividades`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `atividade`
--

CREATE TABLE `atividade` (
  `id` bigint(20) NOT NULL,
  `dataCadastro` datetime DEFAULT NULL,
  `descricao` varchar(255) DEFAULT NULL,
  `idProjeto` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Extraindo dados da tabela `atividade`
--

INSERT INTO `atividade` (`id`, `dataCadastro`, `descricao`, `idProjeto`) VALUES
(1, '2024-01-01 00:00:00', 'Desenvolvimento de API RESTful ', 1),
(2, '2024-01-02 00:00:00', 'Implementação de Frontend em React', 1),
(3, '2024-01-03 00:00:00', 'Criação de Banco de Dados', 1),
(4, '2024-01-04 00:00:00', 'Integração Contínua e Deploy', 4),
(5, '2024-01-05 00:00:00', 'Testes Unitários e de Integração', 4),
(6, '2024-01-06 00:00:00', 'Design de Interface de Usuário', 6),
(7, '2024-01-07 00:00:00', 'Otimização de Performance', 7),
(8, '2024-01-08 00:00:00', 'Documentação de Código', 8),
(9, '2024-01-09 00:00:00', 'Configuração de Servidor', 9),
(10, '2024-01-10 00:00:00', 'Análise de Requisitos', 10),
(11, '2024-01-11 00:00:00', 'Gerenciamento de Projeto', 11),
(12, '2024-01-12 00:00:00', 'Treinamento de Usuários', 12),
(13, '2024-01-13 00:00:00', 'Manutenção e Suporte', 13),
(14, '2024-01-14 00:00:00', 'Implementação de Segurança', 14),
(15, '2024-01-15 00:00:00', 'Migração de Dados', 15),
(16, '2024-01-16 00:00:00', 'Desenvolvimento de Mobile App', 16),
(17, '2024-01-17 00:00:00', 'Análise de Dados', 17),
(18, '2024-01-18 00:00:00', 'Automação de Processos', 18),
(19, '2024-01-19 00:00:00', 'Consultoria Técnica', 19),
(20, '2024-01-20 00:00:00', 'Desenvolvimento de Plugins', 20),
(21, '2024-01-21 00:00:00', 'Implementação de SEO', 21),
(22, '2024-01-22 00:00:00', 'Configuração de Rede', 22),
(23, '2024-01-23 00:00:00', 'Monitoramento de Sistemas', 23),
(24, '2024-01-24 00:00:00', 'Desenvolvimento de Ferramentas Internas', 24),
(25, '2024-01-25 00:00:00', 'Customização de Software', 25),
(26, '2024-01-26 00:00:00', 'Desenvolvimento de Scripts', 26),
(27, '2024-01-27 00:00:00', 'Planejamento de Capacidade', 27),
(28, '2024-01-28 00:00:00', 'Gestão de Incidentes', 28),
(29, '2024-01-29 00:00:00', 'Análise de Log', 29),
(30, '2024-01-30 00:00:00', 'Auditoria de Sistemas', 30);

-- --------------------------------------------------------

--
-- Estrutura da tabela `projeto`
--

CREATE TABLE `projeto` (
  `id` bigint(20) NOT NULL,
  `descricao` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Extraindo dados da tabela `projeto`
--

INSERT INTO `projeto` (`id`, `descricao`) VALUES
(1, 'Projeto Alpha'),
(2, 'Projeto Betaa'),
(3, 'Projeto Gamma'),
(4, 'Projeto Delta'),
(5, 'Projeto Epsilon'),
(6, 'Projeto Zeta'),
(7, 'Projeto Eta'),
(8, 'Projeto Theta'),
(9, 'Projeto Iota'),
(10, 'Projeto Kappa'),
(11, 'Projeto Lambda'),
(12, 'Projeto Mu'),
(13, 'Projeto Nu'),
(14, 'Projeto Xi'),
(15, 'Projeto Omicron'),
(16, 'Projeto Pi'),
(17, 'Projeto Rho'),
(18, 'Projeto Sigma'),
(19, 'Projeto Tau'),
(20, 'Projeto Upsilon'),
(21, 'Projeto Phi'),
(22, 'Projeto Chi'),
(23, 'Projeto Psi'),
(24, 'Projeto Omega'),
(25, 'Projeto Ares'),
(26, 'Projeto Hermes'),
(27, 'Projeto Athena'),
(28, 'Projeto Apollo'),
(29, 'Projeto Artemis'),
(30, 'Projeto Hera');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `atividade`
--
ALTER TABLE `atividade`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idxprojeto` (`idProjeto`);

--
-- Índices para tabela `projeto`
--
ALTER TABLE `projeto`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `atividade`
--
ALTER TABLE `atividade`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT de tabela `projeto`
--
ALTER TABLE `projeto`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `atividade`
--
ALTER TABLE `atividade`
  ADD CONSTRAINT `idxprojeto` FOREIGN KEY (`idProjeto`) REFERENCES `projeto` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
