-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: localhost    Database: raccoon
-- ------------------------------------------------------
-- Server version	8.0.11

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
-- Table structure for table `photo_post`
--

DROP TABLE IF EXISTS `photo_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `photo_post` (
  `POST_ID` int(11) NOT NULL AUTO_INCREMENT,
  `DESCRIPTION` varchar(200) NOT NULL,
  `CREATION_DATE` datetime NOT NULL,
  `PHOTO_LINK` varchar(255) NOT NULL,
  `user_id` int(255) NOT NULL,
  PRIMARY KEY (`POST_ID`),
  KEY `user_id_idx` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photo_post`
--

LOCK TABLES `photo_post` WRITE;
/*!40000 ALTER TABLE `photo_post` DISABLE KEYS */;
INSERT INTO `photo_post` VALUES (1,'Добавил новую фотку','2019-05-09 23:00:00','img/photo3.jpg',4),(2,'Hello man','2019-02-17 23:00:00','img/photo1.jpg',7),(3,'А как ваши дела','2019-03-27 23:00:00','img/photo2.jpg',5),(4,'Красиво','2019-01-02 23:00:00','img/photo3.jpg',8),(5,'Уехать бы сюда','2019-02-10 23:00:00','img/photo2.jpg',10),(6,'Hello','2019-04-03 23:00:00','img/photo1.jpg',10),(7,'Поздравляем наших девочек','2019-05-10 23:00:00','img/photo1.jpg',9),(8,'Красота какая[2]','2019-05-10 20:00:00','img/photo3.jpg',6),(9,'Красота какая','2018-02-11 23:00:00','img/photo2.jpg',3),(10,'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!','2018-06-03 23:00:00','img/photo1.jpg',1),(11,'Добавил новую фотку','2019-05-09 22:00:00','img/photo3.jpg',10),(12,'иду в школу','2019-02-14 23:00:00','img/photo1.jpg',7),(13,'А как ваши дела','2019-03-25 23:00:00','img/photo2.jpg',5),(14,'Красиво','2019-01-02 23:00:00','img/photo3.jpg',10);
/*!40000 ALTER TABLE `photo_post` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-11  1:42:06
