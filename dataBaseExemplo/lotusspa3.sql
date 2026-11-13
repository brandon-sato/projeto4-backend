-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: lotusspa3
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `atendimento`
--

DROP TABLE IF EXISTS `atendimento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `atendimento` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_cliente` int(11) NOT NULL,
  `id_profissional` int(11) NOT NULL,
  `data_atendimento` datetime NOT NULL,
  `valor` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_atendimento_cliente` (`id_cliente`),
  KEY `fk_atendimento_profissional` (`id_profissional`),
  CONSTRAINT `fk_atendimento_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id`),
  CONSTRAINT `fk_atendimento_profissional` FOREIGN KEY (`id_profissional`) REFERENCES `profissional` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=126 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `atendimento`
--

LOCK TABLES `atendimento` WRITE;
/*!40000 ALTER TABLE `atendimento` DISABLE KEYS */;
INSERT INTO `atendimento` VALUES (1,1,2,'2026-03-30 14:00:00',150.00),(2,8,3,'2026-09-13 14:17:11',200.00),(4,39,3,'2026-05-01 08:00:00',117.00),(5,13,2,'2026-05-02 05:00:00',163.00),(6,39,2,'2026-05-03 02:00:00',360.00),(7,23,2,'2026-05-03 23:00:00',374.00),(8,12,3,'2026-05-04 20:00:00',150.00),(9,5,2,'2026-05-05 17:00:00',204.00),(10,36,2,'2026-05-06 14:00:00',169.00),(11,4,2,'2026-05-07 11:00:00',217.00),(12,36,3,'2026-05-08 08:00:00',138.00),(13,50,3,'2026-05-09 05:00:00',324.00),(14,11,3,'2026-05-10 02:00:00',134.00),(15,19,2,'2026-05-10 23:00:00',139.00),(16,7,2,'2026-05-11 20:00:00',129.00),(17,39,2,'2026-05-12 17:00:00',337.00),(18,3,2,'2026-05-13 14:00:00',384.00),(19,23,3,'2026-05-14 11:00:00',398.00),(20,41,3,'2026-05-15 08:00:00',214.00),(21,50,3,'2026-05-16 05:00:00',263.00),(22,18,3,'2026-05-17 02:00:00',339.00),(23,46,3,'2026-05-17 23:00:00',181.00),(24,46,3,'2026-05-18 20:00:00',348.00),(25,26,2,'2026-05-19 17:00:00',140.00),(26,2,2,'2026-05-20 14:00:00',254.00),(27,20,2,'2026-05-21 11:00:00',303.00),(28,21,2,'2026-05-22 08:00:00',269.00),(29,4,2,'2026-05-23 05:00:00',175.00),(30,8,3,'2026-05-24 02:00:00',276.00),(31,42,3,'2026-05-24 23:00:00',192.00),(32,24,2,'2026-05-25 20:00:00',105.00),(33,9,3,'2026-05-26 17:00:00',100.00),(34,28,3,'2026-05-27 14:00:00',194.00),(35,5,3,'2026-05-28 11:00:00',102.00),(36,15,2,'2026-05-29 08:00:00',272.00),(37,10,2,'2026-05-30 05:00:00',250.00),(38,40,2,'2026-05-31 02:00:00',203.00),(39,26,2,'2026-05-31 23:00:00',326.00),(40,32,2,'2026-06-01 20:00:00',156.00),(41,47,3,'2026-06-02 17:00:00',373.00),(42,47,2,'2026-06-03 14:00:00',225.00),(43,30,3,'2026-06-04 11:00:00',248.00),(44,2,3,'2026-06-05 08:00:00',172.00),(45,15,3,'2026-06-06 05:00:00',177.00),(46,17,2,'2026-06-07 02:00:00',129.00),(47,42,3,'2026-06-07 23:00:00',390.00),(48,41,3,'2026-06-08 20:00:00',301.00),(49,23,3,'2026-06-09 17:00:00',249.00),(50,21,3,'2026-06-10 14:00:00',187.00),(51,43,2,'2026-06-11 11:00:00',293.00),(52,25,2,'2026-06-12 08:00:00',291.00),(53,30,3,'2026-06-13 05:00:00',299.00),(54,11,2,'2026-06-14 02:00:00',359.00),(55,30,3,'2026-06-14 23:00:00',205.00),(56,19,2,'2026-06-15 20:00:00',344.00),(57,6,2,'2026-06-16 17:00:00',378.00),(58,27,2,'2026-06-17 14:00:00',360.00),(59,32,3,'2026-06-18 11:00:00',182.00),(60,24,3,'2026-06-19 08:00:00',192.00),(61,33,2,'2026-06-20 05:00:00',328.00),(62,25,2,'2026-06-21 02:00:00',274.00),(63,29,2,'2026-06-21 23:00:00',295.00),(64,11,3,'2026-06-22 20:00:00',139.00),(65,30,3,'2026-06-23 17:00:00',396.00),(66,23,2,'2026-06-24 14:00:00',309.00),(67,10,2,'2026-06-25 11:00:00',159.00),(68,7,2,'2026-06-26 08:00:00',336.00),(69,36,2,'2026-06-27 05:00:00',196.00),(70,38,3,'2026-06-28 02:00:00',157.00),(71,49,2,'2026-06-28 23:00:00',292.00),(72,22,3,'2026-06-29 20:00:00',222.00),(73,45,2,'2026-06-30 17:00:00',124.00),(74,32,2,'2026-07-01 14:00:00',163.00),(75,17,3,'2026-07-02 11:00:00',257.00),(76,47,2,'2026-07-03 08:00:00',373.00),(77,47,2,'2026-07-04 05:00:00',291.00),(78,32,2,'2026-07-05 02:00:00',169.00),(79,38,2,'2026-07-05 23:00:00',170.00),(80,34,3,'2026-07-06 20:00:00',341.00),(81,7,3,'2026-07-07 17:00:00',170.00),(82,14,3,'2026-07-08 14:00:00',129.00),(83,21,3,'2026-07-09 11:00:00',328.00),(84,40,3,'2026-07-10 08:00:00',118.00),(85,5,3,'2026-07-11 05:00:00',144.00),(86,1,2,'2026-07-12 02:00:00',388.00),(87,3,3,'2026-07-12 23:00:00',221.00),(88,9,2,'2026-07-13 20:00:00',264.00),(89,43,2,'2026-07-14 17:00:00',221.00),(90,47,2,'2026-07-15 14:00:00',124.00),(91,8,3,'2026-07-16 11:00:00',122.00),(92,6,3,'2026-07-17 08:00:00',240.00),(93,43,2,'2026-07-18 05:00:00',379.00),(94,1,3,'2026-07-19 02:00:00',400.00),(95,39,2,'2026-07-19 23:00:00',304.00),(96,48,2,'2026-07-20 20:00:00',366.00),(97,14,2,'2026-07-21 17:00:00',188.00),(98,5,2,'2026-07-22 14:00:00',155.00),(99,33,2,'2026-07-23 11:00:00',356.00),(100,12,3,'2026-07-24 08:00:00',327.00),(101,15,2,'2026-07-25 05:00:00',317.00),(102,6,3,'2026-07-26 02:00:00',236.00),(103,34,3,'2026-07-26 23:00:00',339.00),(104,12,2,'2026-07-25 09:00:00',150.00),(105,45,3,'2026-07-26 10:30:00',220.50),(106,3,2,'2026-07-27 14:00:00',310.00),(107,22,2,'2026-07-28 11:15:00',190.00),(108,37,3,'2026-07-29 16:45:00',275.00),(109,8,3,'2026-07-31 08:30:00',350.00),(110,19,2,'2026-08-01 13:20:00',120.00),(111,50,2,'2026-08-02 15:00:00',400.00),(112,27,3,'2026-08-04 09:45:00',280.00),(113,33,2,'2026-08-05 10:10:00',160.00),(114,4,3,'2026-08-07 11:00:00',320.00),(115,15,2,'2026-08-08 14:30:00',210.00),(116,41,3,'2026-08-10 16:00:00',390.00),(117,29,2,'2026-08-11 08:15:00',175.00),(118,11,3,'2026-08-13 13:45:00',245.00),(119,38,2,'2026-08-15 09:30:00',135.00),(120,7,3,'2026-08-16 10:20:00',315.00),(121,48,2,'2026-08-18 15:50:00',260.00),(122,16,3,'2026-08-20 11:40:00',295.00),(123,24,2,'2026-08-22 14:15:00',380.00),(124,50,2,'2026-09-13 14:12:59',200.00),(125,7,3,'2026-09-13 14:16:04',200.00);
/*!40000 ALTER TABLE `atendimento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `atendimento_procedimento`
--

DROP TABLE IF EXISTS `atendimento_procedimento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `atendimento_procedimento` (
  `id_atendimento` int(11) NOT NULL,
  `procedimento_id` int(11) NOT NULL,
  PRIMARY KEY (`id_atendimento`,`procedimento_id`),
  KEY `fk_ap_procedimento` (`procedimento_id`),
  CONSTRAINT `fk_ap_atendimento` FOREIGN KEY (`id_atendimento`) REFERENCES `atendimento` (`id`),
  CONSTRAINT `fk_ap_procedimento` FOREIGN KEY (`procedimento_id`) REFERENCES `procedimento` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `atendimento_procedimento`
--

LOCK TABLES `atendimento_procedimento` WRITE;
/*!40000 ALTER TABLE `atendimento_procedimento` DISABLE KEYS */;
INSERT INTO `atendimento_procedimento` VALUES (1,1),(2,3),(2,7),(4,3),(5,8),(6,5),(7,2),(8,1),(9,3),(10,7),(11,5),(12,1),(13,4),(14,8),(15,5),(16,2),(17,3),(18,4),(19,3),(20,1),(21,8),(22,6),(23,5),(24,4),(25,6),(26,2),(27,3),(28,3),(29,4),(30,1),(31,3),(32,6),(33,3),(34,2),(35,4),(36,5),(37,7),(38,6),(39,4),(40,8),(41,6),(42,7),(43,5),(44,2),(45,7),(46,7),(47,6),(48,8),(49,7),(50,3),(51,4),(52,1),(53,2),(54,4),(55,8),(56,5),(57,4),(58,4),(59,7),(60,3),(61,7),(62,3),(63,1),(64,7),(65,3),(66,3),(67,5),(68,7),(69,3),(70,8),(71,7),(72,4),(73,8),(74,4),(75,1),(76,5),(77,8),(78,8),(79,8),(80,6),(81,5),(82,6),(83,4),(84,3),(85,6),(86,7),(87,3),(88,6),(89,4),(90,3),(91,6),(92,6),(93,7),(94,5),(95,7),(96,4),(97,7),(98,6),(99,2),(100,6),(101,6),(102,5),(103,3),(104,1),(105,2),(105,5),(106,8),(107,3),(107,4),(108,6),(109,1),(109,7),(110,2),(111,4),(111,8),(112,5),(113,1),(113,3),(114,6),(114,7),(115,2),(116,5),(116,8),(117,4),(118,1),(118,2),(119,7),(120,3),(120,6),(121,8),(122,2),(122,5),(123,1),(124,3),(124,4),(125,7),(125,8);
/*!40000 ALTER TABLE `atendimento_procedimento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `descricao` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (1,'Massagem relaxante','Focada no bem-estar geral, utiliza movimentos suaves e fluidos para liberar o estresse do dia a dia e melhorar a qualidade do sono.'),(2,'Massagem terapêutica','Voltada para tratar dores específicas e tensões musculares crônicas, atuando na liberação de pontos de gatilho.'),(3,'Massagem esportiva','Mais intensa e com foco na prevenção de lesões, recuperação muscular e melhora da flexibilidade para praticantes de atividades físicas.'),(4,'Massagem estética','Como a drenagem linfática ou modeladora, foca em reduzir a retenção de líquidos, melhorar o aspecto da celulite e modelar o contorno corporal.'),(5,'Ventossaterapia','Utiliza a sucção de copos na pele para criar pressão negativa, melhorando a circulação sanguínea, oxigenando os tecidos e liberando toxinas. Ela é aplicada tanto para o alívio de dores musculares e contraturas quanto para fins estéticos, como redução de celulite e gordura localizada.');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`usuario`@`localhost`*/ /*!50003 TRIGGER IF NOT EXISTS categoria_antes_inserir
			BEFORE INSERT ON categoria
			FOR EACH ROW
			BEGIN
				IF EXISTS (
					SELECT 1 FROM categoria
					WHERE LOWER(TRIM(nome)) = LOWER(TRIM(NEW.nome))
				) THEN
					SIGNAL SQLSTATE '45000'
						SET MESSAGE_TEXT = 'Já existe uma categoria com esse nome.';
				END IF;
			END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`usuario`@`localhost`*/ /*!50003 TRIGGER IF NOT EXISTS categoria_antes_atualizar
			BEFORE UPDATE ON categoria
			FOR EACH ROW
			BEGIN
				IF EXISTS (
					SELECT 1 FROM categoria
					WHERE LOWER(TRIM(nome)) = LOWER(TRIM(NEW.nome))
					AND id <> NEW.id
				) THEN
					SIGNAL SQLSTATE '45000'
						SET MESSAGE_TEXT = 'Já existe uma categoria com esse nome.';
				END IF;
			END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(150) NOT NULL,
  `dt_nasc` date NOT NULL,
  `sexo` char(1) NOT NULL,
  `contato` varchar(20) DEFAULT NULL,
  `cpf` char(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cliente_unique` (`cpf`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'Ana Silva','1990-05-12','F','(44) 98412-3019','83858708739'),(2,'Bruno Santos','1985-08-23','M','(44) 99123-4567','09876137310'),(3,'Carla Oliveira','1992-11-04','F','(44) 98876-5432','76340457215'),(4,'Daniel Rodrigues','1978-03-15','M','(44) 99765-4321','13484241411'),(5,'Eduarda Lima','1995-07-29','F','(44) 98111-2233','93610900890'),(6,'Felipe Costa','1988-01-10','M','(44) 99222-3344','04843385603'),(7,'Gabriela Souza','2000-09-18','F','(44) 98333-4455','60738039403'),(8,'Heitor Pereira','1993-12-05','M','(44) 99444-5566','16263000970'),(9,'Isabela Alves','1982-04-22','F','(44) 98555-6677','47796105754'),(10,'João Ferreira','1997-06-30','M','(44) 99666-7788','69804263386'),(11,'Katia Ribeiro','1991-02-14','F','(44) 98777-8899','10730745015'),(12,'Lucas Carvalho','1986-10-08','M','(44) 99888-9900','84155531372'),(13,'Mariana Gomes','1994-05-19','F','(44) 98999-0011','00389282057'),(14,'Nicolas Martins','1979-12-25','M','(44) 99101-1122','11953576133'),(15,'Olivia Rocha','1998-08-11','F','(44) 98212-2233','92773492986'),(16,'Paulo Mendes','1983-03-03','M','(44) 99323-3344','40664734588'),(17,'Quésia Barbosa','1996-01-27','F','(44) 98434-4455','47983199880'),(18,'Rafael Freitas','1990-09-09','M','(44) 99545-5566','15489871741'),(19,'Sofia Cardoso','2001-04-16','F','(44) 98656-6677','02378023251'),(20,'Thiago Ramos','1987-11-20','M','(44) 99767-7788','48060238680'),(21,'Ursula Machado','1992-07-07','F','(44) 98878-8899','07098151319'),(22,'Vitor Teixeira','1984-06-14','M','(44) 99989-9900','84596056200'),(23,'Wanessa Moreno','1999-02-28','F','(44) 98100-1122','57524883978'),(24,'Xavier Antunes','1981-10-12','M','(44) 99211-2233','19722268783'),(25,'Yara Fernandes','1993-08-05','F','(44) 98322-3344','44336160368'),(26,'Zé Carlos Castro','1975-04-30','M','(44) 99433-4455','93803546575'),(27,'Amanda Farias','1997-12-19','F','(44) 98544-5566','44379674967'),(28,'Bernardo Duarte','1989-03-24','M','(44) 99655-6677','75450815441'),(29,'Camila Nogueira','1995-09-02','F','(44) 98766-7788','83043696212'),(30,'Diego Monteiro','1991-01-17','M','(44) 99877-8899','12226168150'),(31,'Elena Peixoto','1986-06-08','F','(44) 98988-9900','90109270916'),(32,'Fernando Guimarães','2002-10-21','M','(44) 99199-0011','55922417479'),(33,'Giulia Borghesi','1994-07-13','F','(44) 98200-1122','72822562415'),(34,'Hugo Sales','1980-05-06','M','(44) 99311-2233','39163044536'),(35,'Irene Vieira','1996-11-29','F','(44) 98422-3344','45771300411'),(36,'Jonas Batista','1988-02-18','M','(44) 99533-4455','32943940801'),(37,'Larissa Aguiar','2000-08-24','F','(44) 98644-5566','04838304889'),(38,'Mateus Correia','1993-04-01','M','(44) 99755-6677','96995625447'),(39,'Natalia Fonseca','1985-12-10','F','(44) 98866-7788','58819228599'),(40,'Otávio Barros','1998-03-31','M','(44) 99977-8899','45772703587'),(41,'Patricia Franco','1990-09-15','F','(44) 98188-9900','40446998109'),(42,'Renan Siqueira','1982-01-05','M','(44) 99299-0011','92950801145'),(43,'Sabrina Resende','1997-10-14','F','(44) 98300-1122','01967969701'),(44,'Tomas Mello','1992-06-27','M','(44) 99411-2233','50639838472'),(45,'Valéria Lopes','1987-08-09','F','(44) 98522-3344','03534876008'),(46,'Wagner Paiva','1977-11-03','M','(44) 99633-4455','17907629799'),(47,'Yasmin Prado','1999-05-22','F','(44) 98744-5566','35240937605'),(48,'Zacarias Neves','1984-12-01','M','(44) 99855-6677','13296735062'),(49,'Alice Cavalcante','1995-03-18','F','(44) 98966-7788','86417668800'),(50,'Breno Viana','1991-07-11','M','(44) 99177-8899','93374966586'),(51,'Brandon Yudi Sato','1994-06-24','M',NULL,'08581314988'),(52,'Teste Test3','1994-01-23','F','(44) 99894-4552','52119371040');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `procedimento`
--

DROP TABLE IF EXISTS `procedimento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `procedimento` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(150) NOT NULL,
  `descricao` varchar(500) DEFAULT NULL,
  `duracaoMinutos` int(11) NOT NULL,
  `preco` decimal(10,2) NOT NULL,
  `id_categoria` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_categoria` (`id_categoria`),
  CONSTRAINT `procedimento_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `procedimento`
--

LOCK TABLES `procedimento` WRITE;
/*!40000 ALTER TABLE `procedimento` DISABLE KEYS */;
INSERT INTO `procedimento` VALUES (1,'Quick Massage','A dose certa de relaxamento para a sua rotina. Sessões rápidas e focadas para aliviar a tensão das costas, ombros e pescoço.',30,50.00,1),(2,'Reflexologia Podal','Relaxamento profundo e estímulo da saúde integral através de massagem nos pontos reflexos dos pés.',30,70.00,2),(3,'Massagem Clássica','O toque perfeito para desacelerar a mente, aliviar o estresse e renovar as energias.',60,100.00,1),(4,'Massagem Shiatsu','Equilíbrio energético e alívio de dores por meio da pressão em pontos estratégicos do corpo.',60,100.00,2),(5,'Ventosaterapia Localizada','Liberação da musculatura rígida, melhora da circulação e alívio de dores focadas.',30,50.00,5),(6,'Ventosaterapia Geral','Ideal para relaxamento de grupos musculares, alívio de dores (como tensões nas costas) e redução do estresse, promovendo bem-estar geral.',90,160.00,5),(7,'Massagem Linfática','Estimula o sistema linfático, reduz o inchaço, elimina toxinas e melhora a circulação.',60,100.00,2),(8,'Massagem Modeladora','Aplica movimentos suaves e lentos focados em estimular o sistema linfático, o que reduz a retenção de líquidos e o inchaço.',60,100.00,4);
/*!40000 ALTER TABLE `procedimento` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`usuario`@`localhost`*/ /*!50003 TRIGGER IF NOT EXISTS procedimento_preco_antes_inserir
			BEFORE INSERT ON procedimento
			FOR EACH ROW
			BEGIN
				IF NEW.preco < 0 THEN
					SIGNAL SQLSTATE '45000'
						SET MESSAGE_TEXT = 'O preço do procedimento não pode ser negativo.';
				END IF;
			END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`usuario`@`localhost`*/ /*!50003 TRIGGER IF NOT EXISTS procedimento_preco_antes_atualizar
			BEFORE UPDATE ON procedimento
			FOR EACH ROW
			BEGIN
				IF NEW.preco < 0 THEN
					SIGNAL SQLSTATE '45000'
						SET MESSAGE_TEXT = 'O preço do procedimento não pode ser negativo.';
				END IF;
			END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `procedimento_profissional`
--

DROP TABLE IF EXISTS `procedimento_profissional`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `procedimento_profissional` (
  `id_procedimento` int(11) NOT NULL,
  `id_profissional` int(11) NOT NULL,
  PRIMARY KEY (`id_procedimento`,`id_profissional`),
  KEY `id_profissional` (`id_profissional`),
  CONSTRAINT `procedimento_profissional_ibfk_1` FOREIGN KEY (`id_procedimento`) REFERENCES `procedimento` (`id`),
  CONSTRAINT `procedimento_profissional_ibfk_2` FOREIGN KEY (`id_profissional`) REFERENCES `profissional` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `procedimento_profissional`
--

LOCK TABLES `procedimento_profissional` WRITE;
/*!40000 ALTER TABLE `procedimento_profissional` DISABLE KEYS */;
INSERT INTO `procedimento_profissional` VALUES (1,2),(1,3),(2,2),(3,2),(3,3),(4,2),(5,2),(6,2),(7,3),(8,3);
/*!40000 ALTER TABLE `procedimento_profissional` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profissional`
--

DROP TABLE IF EXISTS `profissional`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profissional` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `contato` varchar(15) DEFAULT NULL,
  `dt_nasc` date NOT NULL DEFAULT '1000-01-01',
  `sexo` char(1) NOT NULL DEFAULT 'n',
  `especialidade` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profissional`
--

LOCK TABLES `profissional` WRITE;
/*!40000 ALTER TABLE `profissional` DISABLE KEYS */;
INSERT INTO `profissional` VALUES (2,'Doraci Miranda Lima','44 99969-2116','1974-04-16','F',NULL),(3,'Dejanira Miranda',NULL,'1983-08-04','F',NULL);
/*!40000 ALTER TABLE `profissional` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`usuario`@`localhost`*/ /*!50003 TRIGGER IF NOT EXISTS profissional_antes_inserir
            BEFORE INSERT ON profissional
            FOR EACH ROW
            BEGIN
                IF EXISTS (
                    SELECT 1 FROM profissional
                    WHERE LOWER(TRIM(nome)) = LOWER(TRIM(NEW.nome))
                ) THEN
                    SIGNAL SQLSTATE '45000'
                        SET MESSAGE_TEXT = 'Já existe um profissional com esse nome.';
                END IF;
            END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`usuario`@`localhost`*/ /*!50003 TRIGGER IF NOT EXISTS profissional_antes_atualizar
            BEFORE UPDATE ON profissional
            FOR EACH ROW
            BEGIN
                IF EXISTS (
                    SELECT 1 FROM profissional
                    WHERE LOWER(TRIM(nome)) = LOWER(TRIM(NEW.nome))
                    AND id <> NEW.id
                ) THEN
                    SIGNAL SQLSTATE '45000'
                        SET MESSAGE_TEXT = 'Já existe um profissional com esse nome.';
                END IF;
            END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `cpf` varchar(11) NOT NULL,
  `password` varchar(150) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `vw_atendimentos_com_desconto_alto`
--

DROP TABLE IF EXISTS `vw_atendimentos_com_desconto_alto`;
/*!50001 DROP VIEW IF EXISTS `vw_atendimentos_com_desconto_alto`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vw_atendimentos_com_desconto_alto` AS SELECT 
 1 AS `id_atendimento`,
 1 AS `nome_cliente`,
 1 AS `valor_sem_desconto`,
 1 AS `valor_com_desconto`*/;
SET character_set_client = @saved_cs_client;

--
-- Dumping routines for database 'lotusspa3'
--
/*!50003 DROP FUNCTION IF EXISTS `profissional_realiza_procedimento` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `profissional_realiza_procedimento`(p_id_profissional INT,
				p_id_procedimento INT
			) RETURNS tinyint(4)
    READS SQL DATA
    DETERMINISTIC
RETURN EXISTS(
				SELECT 1 FROM procedimento_profissional
				WHERE id_profissional = p_id_profissional
				AND id_procedimento = p_id_procedimento
			) ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `vw_atendimentos_com_desconto_alto`
--

/*!50001 DROP VIEW IF EXISTS `vw_atendimentos_com_desconto_alto`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_atendimentos_com_desconto_alto` AS select `a`.`id` AS `id_atendimento`,`c`.`nome` AS `nome_cliente`,sum(`p`.`preco`) AS `valor_sem_desconto`,`a`.`valor` AS `valor_com_desconto` from (((`atendimento` `a` join `cliente` `c` on(`a`.`id_cliente` = `c`.`id`)) join `atendimento_procedimento` `ap` on(`a`.`id` = `ap`.`id_atendimento`)) join `procedimento` `p` on(`ap`.`procedimento_id` = `p`.`id`)) group by `a`.`id`,`c`.`nome`,`a`.`valor` having `a`.`valor` < sum(`p`.`preco`) * 0.8 */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-11-11 20:34:51
