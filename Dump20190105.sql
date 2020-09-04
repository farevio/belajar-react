-- MySQL dump 10.13  Distrib 8.0.13, for macos10.14 (x86_64)
--
-- Host: localhost    Database: aplikasi_ta1
-- ------------------------------------------------------
-- Server version	8.0.13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `archive`
--

DROP TABLE IF EXISTS `archive`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
NEW TABLE `archive` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` bigint(20) DEFAULT NULL,
  `fromModel` varchar(255) DEFAULT NULL,
  `originalRecord` longtext,
  `originalRecordId` longtext,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `archive`
--

LOCK TABLES `archive` WRITE;
/*!40000 ALTER TABLE `archive` DISABLE KEYS */;
/*!40000 ALTER TABLE `archive` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groups`
--

DROP TABLE IF EXISTS `groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
NEW TABLE `groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `topic_selection_id` int(11) DEFAULT NULL,
  `nim` int(11) DEFAULT NULL,
  `total_students` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nim_UNIQUE` (`nim`),
  KEY `fk_students_groups_topic_selections_topic_selection_id_idx` (`topic_selection_id`),
  KEY `fk_groups_students_nim_idx` (`total_students`),
  CONSTRAINT `fk_groups_students_nim` FOREIGN KEY (`total_students`) REFERENCES `students` (`nim`),
  CONSTRAINT `fk_groups_topic_selections_topic_selection_id` FOREIGN KEY (`topic_selection_id`) REFERENCES `topic_selections` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groups`
--

LOCK TABLES `groups` WRITE;
/*!40000 ALTER TABLE `groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jfa`
--

DROP TABLE IF EXISTS `jfa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
NEW TABLE `jfa` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `abbrev` varchar(8) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `singkatan` (`abbrev`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jfa`
--

LOCK TABLES `jfa` WRITE;
/*!40000 ALTER TABLE `jfa` DISABLE KEYS */;
INSERT INTO `jfa` VALUES (1,'Non Jabatan Fungsional','NJFA'),(2,'Asisten Ahli','AA'),(3,'Lektor','L'),(4,'Lektor Kepala','LK'),(5,'Profesor','Prof');
/*!40000 ALTER TABLE `jfa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kk`
--

DROP TABLE IF EXISTS `kk`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
NEW TABLE `kk` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `abbrev` varchar(8) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `abbrev_UNIQUE` (`abbrev`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kk`
--

LOCK TABLES `kk` WRITE;
/*!40000 ALTER TABLE `kk` DISABLE KEYS */;
INSERT INTO `kk` VALUES (1,'Enterprise Solution and Assurance','ESA'),(2,'Enterprise System Development','ESD');
/*!40000 ALTER TABLE `kk` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lecturers`
--

DROP TABLE IF EXISTS `lecturers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
NEW TABLE `lecturers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nik` double DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `jfa_id` int(11) DEFAULT NULL,
  `kk_id` int(11) DEFAULT NULL,
  `peminatan_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lecturers`
--

LOCK TABLES `lecturers` WRITE;
/*!40000 ALTER TABLE `lecturers` DISABLE KEYS */;
/*!40000 ALTER TABLE `lecturers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `metlit`
--

DROP TABLE IF EXISTS `metlit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
NEW TABLE `metlit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `class` varchar(45) DEFAULT NULL,
  `period_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_metlit_periods_period_id_idx` (`period_id`),
  CONSTRAINT `fk_metlit_periods_period_id` FOREIGN KEY (`period_id`) REFERENCES `periods` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `metlit`
--

LOCK TABLES `metlit` WRITE;
/*!40000 ALTER TABLE `metlit` DISABLE KEYS */;
/*!40000 ALTER TABLE `metlit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mycontroller`
--

DROP TABLE IF EXISTS `mycontroller`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
NEW TABLE `mycontroller` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mycontroller`
--

LOCK TABLES `mycontroller` WRITE;
/*!40000 ALTER TABLE `mycontroller` DISABLE KEYS */;
/*!40000 ALTER TABLE `mycontroller` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `peminatan`
--

DROP TABLE IF EXISTS `peminatan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
NEW TABLE `peminatan` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `abbrev` varchar(8) NOT NULL,
  `kk_id` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `abbrev_UNIQUE` (`abbrev`),
  KEY `kk_id_idx` (`kk_id`),
  CONSTRAINT `fk_peminatan_kk_id` FOREIGN KEY (`kk_id`) REFERENCES `kk` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `peminatan`
--

LOCK TABLES `peminatan` WRITE;
/*!40000 ALTER TABLE `peminatan` DISABLE KEYS */;
INSERT INTO `peminatan` VALUES (1,'Enterprise Resource Planning','ERP',1),(2,'Enterprise Architecture','EA',1),(3,'Enterprise Infrastructure Management','EIM',1),(4,'Information System Management','ISM',1),(5,'Enterprise Data Management','EDM',2),(6,'Enterprise Application Development','EAD',2),(7,'Techopreneurship','TECHNO',2);
/*!40000 ALTER TABLE `peminatan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `periods`
--

DROP TABLE IF EXISTS `periods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
NEW TABLE `periods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `semester` enum('GANJIL','GENAP') DEFAULT NULL,
  `academic_year` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `periods`
--

LOCK TABLES `periods` WRITE;
/*!40000 ALTER TABLE `periods` DISABLE KEYS */;
INSERT INTO `periods` VALUES (1,'GANJIL','2018-2019');
/*!40000 ALTER TABLE `periods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `STUDENTS`
--

DROP TABLE IF EXISTS `STUDENTS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
NEW TABLE `STUDENTS` (
  `nim` int(11) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `class` varchar(45) DEFAULT NULL,
  `peminatan_id` tinyint(4) DEFAULT NULL,
  `kk_id` tinyint(4) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nim_UNIQUE` (`nim`),
  KEY `fk_peminatan_id_idx` (`peminatan_id`),
  KEY `fk_kk_id_idx` (`kk_id`),
  CONSTRAINT `fk_students_kk_kk_id` FOREIGN KEY (`kk_id`) REFERENCES `kk` (`id`),
  CONSTRAINT `fk_students_peminatan_peminatan_id` FOREIGN KEY (`peminatan_id`) REFERENCES `peminatan` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `STUDENTS`
--

LOCK TABLES `STUDENTS` WRITE;
/*!40000 ALTER TABLE `STUDENTS` DISABLE KEYS */;
/*!40000 ALTER TABLE `STUDENTS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topic_selections`
--

DROP TABLE IF EXISTS `topic_selections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
NEW TABLE `topic_selections` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `topic_id_opt1` int(11) DEFAULT NULL,
  `topic_id_opt2` int(11) DEFAULT NULL,
  `metlit_id` int(11) DEFAULT NULL,
  `period_id` int(11) DEFAULT NULL,
  `approval` enum('BOTH','OPT1','OPT2','DENIED','WAITING') DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_topic_selections_topics_topic_id_opt1_idx` (`topic_id_opt1`),
  KEY `fk_topic_selections_topics_topic_id_opt2_idx` (`topic_id_opt2`),
  KEY `fk_topic_selections_metlit_metlit_id_idx` (`metlit_id`),
  CONSTRAINT `fk_topic_selections_metlit_metlit_id` FOREIGN KEY (`metlit_id`) REFERENCES `metlit` (`id`),
  CONSTRAINT `fk_topic_selections_topics_topic_id_opt1` FOREIGN KEY (`topic_id_opt1`) REFERENCES `topics` (`id`),
  CONSTRAINT `fk_topic_selections_topics_topic_id_opt2` FOREIGN KEY (`topic_id_opt2`) REFERENCES `topics` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topic_selections`
--

LOCK TABLES `topic_selections` WRITE;
/*!40000 ALTER TABLE `topic_selections` DISABLE KEYS */;
/*!40000 ALTER TABLE `topic_selections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topics`
--

DROP TABLE IF EXISTS `topics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
NEW TABLE `topics` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `quota` tinyint(4) DEFAULT NULL,
  `kk_id` tinyint(4) DEFAULT NULL,
  `peminatan_id` tinyint(4) DEFAULT NULL,
  `period_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_ta_topics_kk_kk_id_idx` (`kk_id`),
  KEY `fk_ta_topics_peminatan_peminatan_id_idx` (`peminatan_id`),
  CONSTRAINT `fk_topics_kk_kk_id` FOREIGN KEY (`kk_id`) REFERENCES `kk` (`id`),
  CONSTRAINT `fk_topics_peminatan_peminatan_id` FOREIGN KEY (`peminatan_id`) REFERENCES `peminatan` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topics`
--

LOCK TABLES `topics` WRITE;
/*!40000 ALTER TABLE `topics` DISABLE KEYS */;
/*!40000 ALTER TABLE `topics` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-01-05 21:27:27
