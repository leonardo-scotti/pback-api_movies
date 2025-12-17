-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: localhost    Database: db_locadora_filme_ds2t_25_2
-- ------------------------------------------------------
-- Server version	8.0.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tbl_diretor`
--

DROP TABLE IF EXISTS `tbl_diretor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_diretor` (
  `id_diretor` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `data_nascimento` date NOT NULL,
  `altura` decimal(4,2) DEFAULT NULL,
  `peso` decimal(6,3) DEFAULT NULL,
  `patrimonio_liquido` decimal(14,2) DEFAULT NULL,
  PRIMARY KEY (`id_diretor`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_diretor`
--

LOCK TABLES `tbl_diretor` WRITE;
/*!40000 ALTER TABLE `tbl_diretor` DISABLE KEYS */;
INSERT INTO `tbl_diretor` VALUES (16,'Carlos Mendes','1975-04-12',1.78,82.000,45000000.00),(17,'Fernanda Rocha','1982-09-30',1.65,60.000,18000000.00),(18,'Ricardo Almeida','1968-01-22',1.80,85.000,72000000.00),(19,'Juliana Torres','1985-02-14',1.70,62.000,25000000.00),(20,'Marcos Silva','1972-10-31',1.83,90.000,33000000.00),(21,'André Figueiredo','1965-06-08',1.75,78.000,91000000.00),(22,'Patrícia Nogueira','1979-12-03',1.68,64.000,40000000.00),(23,'Eduardo Pacheco','1988-07-19',1.82,76.000,22000000.00),(24,'Luciana Barros','1980-05-27',1.66,58.000,37000000.00),(25,'Rafael Cunha','1970-11-11',1.79,81.000,65000000.00);
/*!40000 ALTER TABLE `tbl_diretor` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_quebrar_constraint_diretor_delete` BEFORE DELETE ON `tbl_diretor` FOR EACH ROW BEGIN
    DELETE FROM tbl_filme_diretor WHERE diretor_id = OLD.id_diretor;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `tbl_filme`
--

DROP TABLE IF EXISTS `tbl_filme`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_filme` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `sinopse` text,
  `data_lancamento` date DEFAULT NULL,
  `duracao` time NOT NULL,
  `orcamento` decimal(10,0) NOT NULL,
  `trailer` varchar(200) DEFAULT NULL,
  `capa` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_filme`
--

LOCK TABLES `tbl_filme` WRITE;
/*!40000 ALTER TABLE `tbl_filme` DISABLE KEYS */;
INSERT INTO `tbl_filme` VALUES (32,'A Última Fronteira','Uma missão espacial coloca a humanidade frente ao desconhecido.','2024-03-15','02:12:00',150000000,'https://youtube.com/trailer-ultima-fronteira','ultima-fronteira.jpg'),(33,'Risos em Família','Uma reunião familiar se transforma em uma sequência de situações engraçadas.','2023-07-10','01:35:00',20000000,'https://youtube.com/trailer-risos-em-familia','risos-em-familia.jpg'),(34,'Sombras do Passado','Um detetive retorna à sua cidade natal para resolver um crime antigo.','2022-11-04','01:58:00',35000000,'https://youtube.com/trailer-sombras-do-passado','sombras-do-passado.jpg'),(35,'Corações em Sintonia','Dois músicos descobrem o amor enquanto perseguem seus sonhos.','2021-02-14','01:47:00',18000000,'https://youtube.com/trailer-coracoes-em-sintonia','coracoes-em-sintonia.jpg'),(36,'Além do Medo','Um grupo de jovens enfrenta forças sobrenaturais em uma cidade abandonada.','2020-10-31','01:42:00',12000000,'https://youtube.com/trailer-alem-do-medo','alem-do-medo.jpg'),(37,'Guerra dos Destinos','Soldados lutam pela sobrevivência em meio a um conflito devastador.','2019-05-20','02:25:00',98000000,'https://youtube.com/trailer-guerra-dos-destinos','guerra-dos-destinos.jpg'),(38,'Vida em Foco','A trajetória inspiradora de um fotógrafo que mudou o mundo.','2018-08-12','01:50:00',25000000,'https://youtube.com/trailer-vida-em-foco','vida-em-foco.jpg'),(39,'Velocidade Máxima','Um piloto precisa vencer a maior corrida de sua carreira.','2023-09-01','01:55:00',60000000,'https://youtube.com/trailer-velocidade-maxima','velocidade-maxima.jpg'),(40,'O Mundo Encantado','Uma criança descobre um reino mágico escondido da humanidade.','2022-12-20','01:30:00',40000000,'https://youtube.com/trailer-mundo-encantado','mundo-encantado.jpg'),(41,'Segredos Revelados','Um documentário que expõe verdades ocultas sobre grandes corporações.','2021-06-05','01:40:00',8000000,'https://youtube.com/trailer-segredos-revelados','segredos-revelados.jpg');
/*!40000 ALTER TABLE `tbl_filme` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_atualizar_filme_genero_update` BEFORE UPDATE ON `tbl_filme` FOR EACH ROW BEGIN
    DELETE FROM tbl_filme_genero WHERE filme_id = OLD.id;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_quebrar_constraint_filme_delete` BEFORE DELETE ON `tbl_filme` FOR EACH ROW BEGIN
    DELETE FROM tbl_filme_genero WHERE filme_id = OLD.id;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `tbl_filme_diretor`
--

DROP TABLE IF EXISTS `tbl_filme_diretor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_filme_diretor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `filme_id` int NOT NULL,
  `diretor_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_FILME_FILME_DIRETOR` (`filme_id`),
  KEY `FK_DIRETOR_FILME_DIRETOR` (`diretor_id`),
  CONSTRAINT `FK_DIRETOR_FILME_DIRETOR` FOREIGN KEY (`diretor_id`) REFERENCES `tbl_diretor` (`id_diretor`) ON DELETE CASCADE,
  CONSTRAINT `FK_FILME_FILME_DIRETOR` FOREIGN KEY (`filme_id`) REFERENCES `tbl_filme` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_filme_diretor`
--

LOCK TABLES `tbl_filme_diretor` WRITE;
/*!40000 ALTER TABLE `tbl_filme_diretor` DISABLE KEYS */;
INSERT INTO `tbl_filme_diretor` VALUES (15,32,16),(16,33,22),(17,34,25),(18,35,24),(19,36,23),(20,37,17),(21,38,18),(22,39,19),(23,40,20),(24,41,21);
/*!40000 ALTER TABLE `tbl_filme_diretor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_filme_genero`
--

DROP TABLE IF EXISTS `tbl_filme_genero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_filme_genero` (
  `id` int NOT NULL AUTO_INCREMENT,
  `filme_id` int NOT NULL,
  `genero_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_FILME_FILME_GENERO` (`filme_id`),
  KEY `FK_GENERO_FILME_GENERO` (`genero_id`),
  CONSTRAINT `FK_FILME_FILME_GENERO` FOREIGN KEY (`filme_id`) REFERENCES `tbl_filme` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_GENERO_FILME_GENERO` FOREIGN KEY (`genero_id`) REFERENCES `tbl_genero` (`id_genero`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_filme_genero`
--

LOCK TABLES `tbl_filme_genero` WRITE;
/*!40000 ALTER TABLE `tbl_filme_genero` DISABLE KEYS */;
INSERT INTO `tbl_filme_genero` VALUES (74,32,1),(75,32,8),(76,32,9),(77,33,3),(78,33,19),(79,34,6),(80,34,13),(81,34,12),(82,35,7),(83,35,14),(84,36,5),(85,36,6),(86,37,15),(87,37,4),(88,38,17),(89,38,4),(90,39,1),(91,39,18),(92,40,9),(93,40,19),(94,40,10),(95,41,11);
/*!40000 ALTER TABLE `tbl_filme_genero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_filme_personagem`
--

DROP TABLE IF EXISTS `tbl_filme_personagem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_filme_personagem` (
  `id` int NOT NULL AUTO_INCREMENT,
  `filme_id` int NOT NULL,
  `personagem_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_FILME_FILME_PERSONAGEM` (`filme_id`),
  KEY `FK_PERSONAGEM_FILME_PERSONAGEM` (`personagem_id`),
  CONSTRAINT `FK_FILME_FILME_PERSONAGEM` FOREIGN KEY (`filme_id`) REFERENCES `tbl_filme` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_PERSONAGEM_FILME_PERSONAGEM` FOREIGN KEY (`personagem_id`) REFERENCES `tbl_personagem` (`id_personagem`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_filme_personagem`
--

LOCK TABLES `tbl_filme_personagem` WRITE;
/*!40000 ALTER TABLE `tbl_filme_personagem` DISABLE KEYS */;
INSERT INTO `tbl_filme_personagem` VALUES (26,32,28),(27,32,29),(28,33,30),(29,33,31),(30,34,32),(31,34,33),(32,35,34),(33,35,35),(34,36,36),(35,36,37),(36,37,38),(37,37,39),(38,38,40),(39,38,41),(40,39,42),(41,39,43),(42,40,44),(43,40,45),(44,41,46),(45,41,47);
/*!40000 ALTER TABLE `tbl_filme_personagem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_genero`
--

DROP TABLE IF EXISTS `tbl_genero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_genero` (
  `id_genero` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(20) NOT NULL,
  `descricao` varchar(200) NOT NULL,
  PRIMARY KEY (`id_genero`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_genero`
--

LOCK TABLES `tbl_genero` WRITE;
/*!40000 ALTER TABLE `tbl_genero` DISABLE KEYS */;
INSERT INTO `tbl_genero` VALUES (1,'Ação','Filmes com cenas intensas, combates, perseguições e ritmo acelerado.'),(2,'Aventura','Histórias focadas em jornadas, explorações e grandes desafios.'),(3,'Comédia','Produções voltadas ao humor e ao entretenimento leve.'),(4,'Drama','Narrativas emocionais que exploram conflitos humanos e sociais.'),(5,'Terror','Filmes que buscam causar medo, tensão ou suspense no espectador.'),(6,'Suspense','Histórias que mantêm o público em constante expectativa e tensão.'),(7,'Romance','Enredos centrados em relacionamentos amorosos e emoções afetivas.'),(8,'Ficção Científica','Produções baseadas em avanços científicos, tecnologia ou futuros imaginários.'),(9,'Fantasia','Filmes com elementos mágicos, mundos imaginários e seres fantásticos.'),(10,'Animação','Filmes produzidos por técnicas de animação, podendo ser infantis ou adultos.'),(11,'Documentário','Produções que retratam fatos reais, pessoas ou eventos históricos.'),(12,'Crime','Histórias envolvendo crimes, investigações e o submundo do crime.'),(13,'Mistério','Narrativas focadas na resolução de enigmas ou acontecimentos desconhecidos.'),(14,'Musical','Filmes em que a música e o canto são parte central da narrativa.'),(15,'Guerra','Produções ambientadas em conflitos armados e eventos militares.'),(16,'Faroeste','Filmes ambientados no Velho Oeste, com cowboys e duelos.'),(17,'Biografia','Narrativas baseadas na vida de pessoas reais e marcantes.'),(18,'Esporte','Histórias relacionadas a práticas esportivas e superação de atletas.'),(19,'Família','Filmes adequados para todas as idades, com temas educativos e leves.');
/*!40000 ALTER TABLE `tbl_genero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_idioma`
--

DROP TABLE IF EXISTS `tbl_idioma`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_idioma` (
  `id_idioma` int NOT NULL AUTO_INCREMENT,
  `idioma` varchar(100) NOT NULL,
  PRIMARY KEY (`id_idioma`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_idioma`
--

LOCK TABLES `tbl_idioma` WRITE;
/*!40000 ALTER TABLE `tbl_idioma` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_idioma` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_personagem`
--

DROP TABLE IF EXISTS `tbl_personagem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_personagem` (
  `id_personagem` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `raca` varchar(50) NOT NULL,
  `descricao` varchar(500) NOT NULL,
  `altura` decimal(10,2) NOT NULL,
  `peso` decimal(24,2) NOT NULL,
  PRIMARY KEY (`id_personagem`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_personagem`
--

LOCK TABLES `tbl_personagem` WRITE;
/*!40000 ALTER TABLE `tbl_personagem` DISABLE KEYS */;
INSERT INTO `tbl_personagem` VALUES (28,'Ethan Cole','HUMANO','Comandante da missão espacial.',1.88,84.50),(29,'Dr. Helena Ross','HUMANO','Cientista responsável pelo projeto intergaláctico.',1.70,62.00),(30,'Tio Roberto','HUMANO','O parente que sempre causa confusão.',1.75,90.00),(31,'Dona Lúcia','HUMANO','A matriarca divertida da família.',1.62,68.30),(32,'Detetive Álvaro','HUMANO','Investigador experiente marcado pelo passado.',1.80,82.00),(33,'Marina Lopes','HUMANO','Jornalista que ajuda a desvendar o mistério.',1.68,59.50),(34,'Lucas Andrade','HUMANO','Músico sonhador em busca do sucesso.',1.77,73.00),(35,'Ana Beatriz','HUMANO','Cantora talentosa e romântica.',1.65,58.00),(36,'Pedro Silva','HUMANO','Líder do grupo que enfrenta o sobrenatural.',1.82,80.00),(37,'Camila Torres','HUMANO','A mais cética do grupo.',1.69,61.20),(38,'Capitão Moreira','HUMANO','Comandante de batalhão em zona de guerra.',1.85,88.00),(39,'Soldado Ribeiro','HUMANO','Jovem recruta enfrentando o caos da guerra.',1.78,76.50),(40,'Miguel Azevedo','HUMANO','Fotógrafo visionário.',1.74,70.00),(41,'Clara Azevedo','HUMANO','Esposa e principal apoiadora do fotógrafo.',1.67,57.80),(42,'Bruno Ferrari','HUMANO','Piloto determinado a vencer a corrida.',1.81,79.00),(43,'Renata Cruz','HUMANO','Engenheira-chefe da equipe.',1.72,63.40),(44,'Léo','HUMANO','Criança curiosa que descobre o mundo mágico.',1.35,38.00),(45,'Eldrin','ELFO','Guardião do reino encantado.',1.90,72.00),(46,'Narrador','HUMANO','Responsável por conduzir o documentário.',1.76,74.00),(47,'Executivo Anônimo','HUMANO','Figura central das denúncias reveladas.',1.80,82.00);
/*!40000 ALTER TABLE `tbl_personagem` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_atualizar_filme_personagem_update` BEFORE UPDATE ON `tbl_personagem` FOR EACH ROW BEGIN
    DELETE FROM tbl_filme_personagem WHERE personagem_id = OLD.id_personagem;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_quebrar_constraint_personagem_delete` BEFORE DELETE ON `tbl_personagem` FOR EACH ROW BEGIN
    DELETE FROM tbl_filme_personagem WHERE personagem_id = OLD.id_personagem;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `tbl_sexo`
--

DROP TABLE IF EXISTS `tbl_sexo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_sexo` (
  `id_sexo` int NOT NULL AUTO_INCREMENT,
  `sexo` varchar(20) NOT NULL,
  PRIMARY KEY (`id_sexo`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_sexo`
--

LOCK TABLES `tbl_sexo` WRITE;
/*!40000 ALTER TABLE `tbl_sexo` DISABLE KEYS */;
INSERT INTO `tbl_sexo` VALUES (1,'MASCULINO'),(2,'FEMININO'),(3,'NÃO BINÁRIO'),(4,'OUTRO'),(5,'PREFIRO NÃO INFORMAR');
/*!40000 ALTER TABLE `tbl_sexo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'db_locadora_filme_ds2t_25_2'
--

--
-- Dumping routines for database 'db_locadora_filme_ds2t_25_2'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-17 16:53:38
