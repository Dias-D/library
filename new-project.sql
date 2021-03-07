-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.1.19-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win32
-- HeidiSQL Versão:              11.0.0.6096
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Copiando estrutura do banco de dados para library
CREATE DATABASE IF NOT EXISTS `library` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `library`;

-- Copiando estrutura para tabela library.author
CREATE TABLE IF NOT EXISTS `author` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '0',
  `acronym` varchar(20) NOT NULL DEFAULT '0',
  `active` tinyint(4) NOT NULL DEFAULT '0',
  `created_at` int(11) NOT NULL DEFAULT '0',
  `updated_at` int(11) NOT NULL DEFAULT '0',
  `deleted` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela library.author: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `author` DISABLE KEYS */;
INSERT INTO `author` (`id`, `name`, `acronym`, `active`, `created_at`, `updated_at`, `deleted`) VALUES
	(1, 'Diego Dias', 'DDs', 1, 1615127230, 1615158703, NULL),
	(2, 'Primeiro Autor', 'PAEs', 0, 1615127918, 1615128296, '0000-00-00 00:00:00'),
	(3, 'Segundo Autor', 'PAs', 0, 1615127936, 1615158698, NULL);
/*!40000 ALTER TABLE `author` ENABLE KEYS */;

-- Copiando estrutura para tabela library.book
CREATE TABLE IF NOT EXISTS `book` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `author_id` int(11) NOT NULL,
  `publisher_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL DEFAULT '0',
  `acronym` varchar(20) NOT NULL DEFAULT '0',
  `active` tinyint(4) NOT NULL DEFAULT '0',
  `created_at` int(11) NOT NULL DEFAULT '0',
  `updated_at` int(11) NOT NULL DEFAULT '0',
  `deleted` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `author_id` (`author_id`),
  KEY `publisher_id` (`publisher_id`),
  CONSTRAINT `FK_book_author` FOREIGN KEY (`author_id`) REFERENCES `author` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_book_publisher` FOREIGN KEY (`publisher_id`) REFERENCES `publisher` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela library.book: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` (`id`, `author_id`, `publisher_id`, `name`, `acronym`, `active`, `created_at`, `updated_at`, `deleted`) VALUES
	(1, 3, 4, 'Era Outra Vez', '0', 0, 1615143049, 1615143918, NULL);
/*!40000 ALTER TABLE `book` ENABLE KEYS */;

-- Copiando estrutura para tabela library.publisher
CREATE TABLE IF NOT EXISTS `publisher` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '0',
  `description` varchar(20) NOT NULL DEFAULT '0',
  `active` tinyint(4) NOT NULL DEFAULT '0',
  `created_at` int(11) NOT NULL DEFAULT '0',
  `updated_at` int(11) NOT NULL DEFAULT '0',
  `deleted` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela library.publisher: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `publisher` DISABLE KEYS */;
INSERT INTO `publisher` (`id`, `name`, `description`, `active`, `created_at`, `updated_at`, `deleted`) VALUES
	(4, 'A Centenario', 'Livros diversos', 0, 1615141128, 1615158854, NULL);
/*!40000 ALTER TABLE `publisher` ENABLE KEYS */;

-- Copiando estrutura para tabela library.system_activity
CREATE TABLE IF NOT EXISTS `system_activity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `event` varchar(40) NOT NULL,
  `module` varchar(45) DEFAULT NULL,
  `area` varchar(50) DEFAULT NULL,
  `old_registry` mediumtext,
  `new_registry` mediumtext,
  `created_at` int(11) DEFAULT '0',
  `updated_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela library.system_activity: ~13 rows (aproximadamente)
/*!40000 ALTER TABLE `system_activity` DISABLE KEYS */;
INSERT INTO `system_activity` (`id`, `user_id`, `date`, `event`, `module`, `area`, `old_registry`, `new_registry`, `created_at`, `updated_at`) VALUES
	(1, 1, '2021-03-07 11:27:10', 'create', 'Library', 'Author', NULL, NULL, 1615127230, 1615127230),
	(2, 1, '2021-03-07 11:38:56', 'update', 'Biblioteca', 'Autor', '{"id":"1","name":"Diego Dias","acronym":"DDs","active":"1","created_at":"1615127230","updated_at":"1615127230","deleted":null}', '{"id":"3","name":"Primeiro Autor","acronym":"PAs","active":"0","created_at":1615127936,"updated_at":1615127936,"deleted":null}', 1615127936, 1615127936),
	(3, 1, '2021-03-07 11:41:54', 'update', 'Biblioteca', 'Autor', '{"id":"2","name":"Primeiro Autor","acronym":"PAs","active":"0","created_at":"1615127918","updated_at":"1615127918","deleted":null}', '{"id":"2","name":"Primeiro Autor Edit","acronym":"PAEs","active":"0","created_at":"1615127918","updated_at":1615128114,"deleted":null}', 1615128114, 1615128114),
	(4, 1, '2021-03-07 11:44:56', 'delete', 'Biblioteca', 'Autor', '{}', NULL, 1615128296, 1615128296),
	(5, 1, '2021-03-07 11:45:06', 'delete', 'Biblioteca', 'Autor', '{}', NULL, 1615128306, 1615128306),
	(6, 1, '2021-03-07 11:45:11', 'delete', 'Biblioteca', 'Autor', '{}', NULL, 1615128311, 1615128311),
	(7, 1, '2021-03-07 15:18:48', 'create', 'Biblioteca', 'Editora', NULL, '{"id":"4","name":"Akasa","description":"Livros Infantis","active":"1","created_at":1615141128,"updated_at":1615141128,"deleted":null}', 1615141128, 1615141128),
	(8, 1, '2021-03-07 15:19:36', 'update', 'Biblioteca', 'Editora', '{"id":"4","name":"Akasa","description":"Livros Infantis","active":"1","created_at":"1615141128","updated_at":"1615141128","deleted":null}', '{"id":"4","name":"A Centenario","description":"Livros diversos","active":"0","created_at":"1615141128","updated_at":1615141176,"deleted":null}', 1615141176, 1615141176),
	(9, 1, '2021-03-07 15:19:42', 'delete', 'Biblioteca', 'Editora', '{"id":"4","name":"A Centenario","description":"Livros diversos","active":"0","created_at":"1615141128","updated_at":"1615141176","deleted":null}', NULL, 1615141182, 1615141182),
	(10, 1, '2021-03-07 15:50:49', 'create', 'Biblioteca', 'Livro', NULL, '{"id":"1","author_id":"3","publisher_id":"4","name":"Era Uma Vez","active":"1","created_at":1615143049,"updated_at":1615143049,"deleted":null}', 1615143049, 1615143049),
	(11, 1, '2021-03-07 16:04:50', 'update', 'Biblioteca', 'Livro', '{"id":"1","author_id":"3","publisher_id":"4","name":"Era Uma Vez","active":"1","created_at":"1615143049","updated_at":"1615143049","deleted":null}', '{"id":"1","author_id":"3","publisher_id":"4","name":"Era Outra Vez","active":"0","created_at":"1615143049","updated_at":1615143890,"deleted":null}', 1615143890, 1615143890),
	(12, 1, '2021-03-07 16:05:18', 'delete', 'Biblioteca', 'Livro', '{"id":"1","author_id":"3","publisher_id":"4","name":"Era Outra Vez","active":"0","created_at":"1615143049","updated_at":"1615143890","deleted":null}', NULL, 1615143918, 1615143918),
	(13, 1, '2021-03-07 20:09:22', 'delete', 'Biblioteca', 'Autor', '{"id":"3","name":"Primeiro Autor","acronym":"PAs","active":"0","created_at":"1615127936","updated_at":"1615128306","deleted":null,"book":[]}', NULL, 1615158562, 1615158562),
	(14, 1, '2021-03-07 20:11:38', 'delete', 'Biblioteca', 'Autor', '{"id":"3","name":"Primeiro Autor","acronym":"PAs","active":"0","created_at":"1615127936","updated_at":"1615158562","deleted":null,"book":[]}', NULL, 1615158698, 1615158698),
	(15, 1, '2021-03-07 20:11:43', 'delete', 'Biblioteca', 'Autor', '{"id":"1","name":"Diego Dias","acronym":"DDs","active":"1","created_at":"1615127230","updated_at":"1615128311","deleted":null,"book":[]}', NULL, 1615158703, 1615158703);
/*!40000 ALTER TABLE `system_activity` ENABLE KEYS */;

-- Copiando estrutura para tabela library.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `group_id` int(11) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `last_login` varchar(25) NOT NULL,
  `previous_login` varchar(25) NOT NULL DEFAULT '0',
  `login_hash` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `created_at` int(11) NOT NULL DEFAULT '0',
  `updated_at` int(11) NOT NULL DEFAULT '0',
  `deleted` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela library.users: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `username`, `password`, `group_id`, `email`, `last_login`, `previous_login`, `login_hash`, `user_id`, `created_at`, `updated_at`, `deleted`) VALUES
	(1, 'admin', 'Rhx07tqUHov59BMlLMZoeXi36PTDBzktSsqXK0UayWo=', 6, 'admin@example.org', '1615157525', '1615155755', '71b5b95aefdb3b3bec375d7609696d735ffce985', 1, 1532353154, 1615157526, NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

-- Copiando estrutura para tabela library.users_clients
CREATE TABLE IF NOT EXISTS `users_clients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL DEFAULT '',
  `client_id` varchar(32) NOT NULL DEFAULT '',
  `client_secret` varchar(32) NOT NULL DEFAULT '',
  `redirect_uri` varchar(255) NOT NULL DEFAULT '',
  `auto_approve` tinyint(1) NOT NULL DEFAULT '0',
  `autonomous` tinyint(1) NOT NULL DEFAULT '0',
  `status` enum('development','pending','approved','rejected') NOT NULL DEFAULT 'development',
  `suspended` tinyint(1) NOT NULL DEFAULT '0',
  `notes` tinytext NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `client_id` (`client_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela library.users_clients: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `users_clients` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_clients` ENABLE KEYS */;

-- Copiando estrutura para tabela library.users_groups
CREATE TABLE IF NOT EXISTS `users_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `created_at` int(11) NOT NULL DEFAULT '0',
  `updated_at` int(11) NOT NULL DEFAULT '0',
  `deleted` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela library.users_groups: ~6 rows (aproximadamente)
/*!40000 ALTER TABLE `users_groups` DISABLE KEYS */;
INSERT INTO `users_groups` (`id`, `name`, `user_id`, `created_at`, `updated_at`, `deleted`) VALUES
	(1, 'Banned', 0, 0, 0, NULL),
	(2, 'Guests', 0, 0, 0, NULL),
	(3, 'Users', 0, 0, 0, NULL),
	(4, 'Moderators', 0, 0, 0, NULL),
	(5, 'Administrators', 0, 0, 0, NULL),
	(6, 'Super Admins', 0, 0, 0, NULL);
/*!40000 ALTER TABLE `users_groups` ENABLE KEYS */;

-- Copiando estrutura para tabela library.users_group_permissions
CREATE TABLE IF NOT EXISTS `users_group_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `perms_id` int(11) NOT NULL,
  `actions` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela library.users_group_permissions: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `users_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_group_permissions` ENABLE KEYS */;

-- Copiando estrutura para tabela library.users_group_roles
CREATE TABLE IF NOT EXISTS `users_group_roles` (
  `group_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  PRIMARY KEY (`group_id`,`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela library.users_group_roles: ~9 rows (aproximadamente)
/*!40000 ALTER TABLE `users_group_roles` DISABLE KEYS */;
INSERT INTO `users_group_roles` (`group_id`, `role_id`) VALUES
	(1, 1),
	(2, 2),
	(3, 3),
	(4, 3),
	(4, 4),
	(5, 3),
	(5, 4),
	(5, 5),
	(6, 6);
/*!40000 ALTER TABLE `users_group_roles` ENABLE KEYS */;

-- Copiando estrutura para tabela library.users_metadata
CREATE TABLE IF NOT EXISTS `users_metadata` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) NOT NULL DEFAULT '0',
  `key` varchar(20) NOT NULL,
  `value` varchar(100) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `created_at` int(11) NOT NULL DEFAULT '0',
  `updated_at` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela library.users_metadata: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `users_metadata` DISABLE KEYS */;
INSERT INTO `users_metadata` (`id`, `parent_id`, `key`, `value`, `user_id`, `created_at`, `updated_at`) VALUES
	(1, 1, 'fullname', 'System administrator', 0, 1532353154, 0),
	(2, 0, 'fullname', 'Guest', 0, 0, 0);
/*!40000 ALTER TABLE `users_metadata` ENABLE KEYS */;

-- Copiando estrutura para tabela library.users_permissions
CREATE TABLE IF NOT EXISTS `users_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `area` varchar(25) NOT NULL,
  `permission` varchar(25) NOT NULL,
  `description` varchar(255) NOT NULL,
  `actions` text,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `created_at` int(11) NOT NULL DEFAULT '0',
  `updated_at` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `permission` (`area`,`permission`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela library.users_permissions: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `users_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_permissions` ENABLE KEYS */;

-- Copiando estrutura para tabela library.users_providers
CREATE TABLE IF NOT EXISTS `users_providers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) NOT NULL DEFAULT '0',
  `provider` varchar(50) NOT NULL,
  `uid` varchar(255) NOT NULL,
  `secret` varchar(255) DEFAULT NULL,
  `access_token` varchar(255) DEFAULT NULL,
  `expires` int(12) DEFAULT '0',
  `refresh_token` varchar(255) DEFAULT NULL,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `created_at` int(11) NOT NULL DEFAULT '0',
  `updated_at` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `parent_id` (`parent_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela library.users_providers: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `users_providers` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_providers` ENABLE KEYS */;

-- Copiando estrutura para tabela library.users_roles
CREATE TABLE IF NOT EXISTS `users_roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `filter` enum('','A','D','R') NOT NULL DEFAULT '',
  `user_id` int(11) NOT NULL DEFAULT '0',
  `created_at` int(11) NOT NULL DEFAULT '0',
  `updated_at` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela library.users_roles: ~6 rows (aproximadamente)
/*!40000 ALTER TABLE `users_roles` DISABLE KEYS */;
INSERT INTO `users_roles` (`id`, `name`, `filter`, `user_id`, `created_at`, `updated_at`) VALUES
	(1, 'banned', 'D', 0, 0, 0),
	(2, 'public', '', 0, 0, 0),
	(3, 'user', '', 0, 0, 0),
	(4, 'moderator', '', 0, 0, 0),
	(5, 'administrator', '', 0, 0, 0),
	(6, 'superadmin', 'A', 0, 0, 0);
/*!40000 ALTER TABLE `users_roles` ENABLE KEYS */;

-- Copiando estrutura para tabela library.users_role_permissions
CREATE TABLE IF NOT EXISTS `users_role_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) NOT NULL,
  `perms_id` int(11) NOT NULL,
  `actions` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela library.users_role_permissions: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `users_role_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_role_permissions` ENABLE KEYS */;

-- Copiando estrutura para tabela library.users_scopes
CREATE TABLE IF NOT EXISTS `users_scopes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `scope` varchar(64) NOT NULL DEFAULT '',
  `name` varchar(64) NOT NULL DEFAULT '',
  `description` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `scope` (`scope`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela library.users_scopes: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `users_scopes` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_scopes` ENABLE KEYS */;

-- Copiando estrutura para tabela library.users_sessions
CREATE TABLE IF NOT EXISTS `users_sessions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client_id` varchar(32) NOT NULL DEFAULT '',
  `redirect_uri` varchar(255) NOT NULL DEFAULT '',
  `type_id` varchar(64) NOT NULL,
  `type` enum('user','auto') NOT NULL DEFAULT 'user',
  `code` text NOT NULL,
  `access_token` varchar(50) NOT NULL DEFAULT '',
  `stage` enum('request','granted') NOT NULL DEFAULT 'request',
  `first_requested` int(11) NOT NULL,
  `last_updated` int(11) NOT NULL,
  `limited_access` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `oauth_sessions_ibfk_1` (`client_id`),
  CONSTRAINT `oauth_sessions_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `users_clients` (`client_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela library.users_sessions: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `users_sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_sessions` ENABLE KEYS */;

-- Copiando estrutura para tabela library.users_sessionscopes
CREATE TABLE IF NOT EXISTS `users_sessionscopes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `session_id` int(11) NOT NULL,
  `access_token` varchar(50) NOT NULL DEFAULT '',
  `scope` varchar(64) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `session_id` (`session_id`),
  KEY `access_token` (`access_token`),
  KEY `scope` (`scope`),
  CONSTRAINT `oauth_sessionscopes_ibfk_1` FOREIGN KEY (`scope`) REFERENCES `users_scopes` (`scope`),
  CONSTRAINT `oauth_sessionscopes_ibfk_2` FOREIGN KEY (`session_id`) REFERENCES `users_sessions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela library.users_sessionscopes: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `users_sessionscopes` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_sessionscopes` ENABLE KEYS */;

-- Copiando estrutura para tabela library.users_user_permissions
CREATE TABLE IF NOT EXISTS `users_user_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `perms_id` int(11) NOT NULL,
  `actions` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela library.users_user_permissions: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `users_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_user_permissions` ENABLE KEYS */;

-- Copiando estrutura para tabela library.users_user_roles
CREATE TABLE IF NOT EXISTS `users_user_roles` (
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela library.users_user_roles: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `users_user_roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_user_roles` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
