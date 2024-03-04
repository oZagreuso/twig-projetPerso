-- --------------------------------------------------------
-- Hôte:                         127.0.0.1
-- Version du serveur:           8.0.30 - MySQL Community Server - GPL
-- SE du serveur:                Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Listage des données de la table foyercrm.benevoles : ~22 rows (environ)
INSERT INTO `benevoles` (`id`, `nom`, `prenom`, `telephone`, `poste`) VALUES
	(1, 'Caugnant', 'Cindy', '0674964125', 'responsable foyer'),
	(2, 'Dal Ferro', 'Olivier', '0623668567', 'responsable hygiène'),
	(3, 'Desplantes', 'Guillaume', '0675347768', 'responsable planning'),
	(4, 'Duchemann', 'Donovan', '0781687356', 'responsable animation'),
	(5, 'Olivier', 'Mathieu', '0659695970', 'responsable commandes'),
	(6, 'Arnoox', 'Madison', '0660294618', 'suppléant foyer'),
	(7, 'Rolet', 'Stéphanie', '0767613269', 'suppléant hygiène'),
	(8, 'Otzenberger', 'Valia', '0760304482', 'suppléant planning'),
	(9, 'Grandgirard', 'Tristant', '0615788835', 'suppléant animation'),
	(10, 'Annedouche', 'Maxence', '0771743901', 'suppléant commandes'),
	(11, 'Roussotte', 'Kévin', '0647240879', NULL),
	(12, 'Jenny', 'Fabrice', '0660627252', NULL),
	(13, 'Dogan', 'Gokan', '0634120956', NULL),
	(14, 'Kintz', 'Sébastien', '0684042513', NULL),
	(15, 'Soliveres', 'Véronique', '0636892555', NULL),
	(16, 'Eschbach', 'Vanessa', '0609361716', NULL),
	(17, 'Hexi', 'Hassan', '0749860575', NULL),
	(18, 'Boumediene', 'Sohia', '0665514350', NULL),
	(19, 'Tereira', 'Patrick', '0749546351', NULL),
	(20, 'Fahrner', 'Frederique', '0618689706', NULL),
	(21, 'Boumadya', 'Ali', '0609446294', NULL),
	(22, 'Bailly', 'Marie-Line', '0671391881', NULL);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
