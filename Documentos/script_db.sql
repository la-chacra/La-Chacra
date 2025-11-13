-- MySQL dump 10.13  Distrib 8.4.7, for Linux (x86_64)
--
-- Host: localhost    Database: lachacra_db
-- ------------------------------------------------------
-- Server version	8.4.7

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
-- Table structure for table `comanda`
--

DROP TABLE IF EXISTS `comanda`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comanda` (
  `comanda_id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `n_mesa` tinyint unsigned NOT NULL,
  `estado` enum('Activo','En espera','Cancelado') NOT NULL,
  `fecha_hora` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `activa` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`comanda_id`),
  KEY `fk_Comanda_Usuario1_idx` (`usuario_id`),
  CONSTRAINT `fk_Comanda_Usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`usuario_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comanda`
--

LOCK TABLES `comanda` WRITE;
/*!40000 ALTER TABLE `comanda` DISABLE KEYS */;
/*!40000 ALTER TABLE `comanda` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_comanda`
--

DROP TABLE IF EXISTS `detalle_comanda`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_comanda` (
  `comanda_id` int NOT NULL,
  `producto_id` int NOT NULL,
  `cantidad` tinyint unsigned NOT NULL DEFAULT '1',
  `nota` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`comanda_id`,`producto_id`),
  KEY `fk_Comanda_has_Menu_Menu1_idx` (`producto_id`),
  KEY `fk_Comanda_has_Menu_Comanda1_idx` (`comanda_id`),
  CONSTRAINT `fk_Comanda_has_Menu_Comanda1` FOREIGN KEY (`comanda_id`) REFERENCES `comanda` (`comanda_id`),
  CONSTRAINT `fk_Comanda_has_Menu_Menu1` FOREIGN KEY (`producto_id`) REFERENCES `productos_menu` (`producto_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_comanda`
--

LOCK TABLES `detalle_comanda` WRITE;
/*!40000 ALTER TABLE `detalle_comanda` DISABLE KEYS */;
/*!40000 ALTER TABLE `detalle_comanda` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventario`
--

DROP TABLE IF EXISTS `inventario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventario` (
  `insumo_id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `categoria` varchar(70) DEFAULT NULL,
  `cantidad` decimal(10,2) NOT NULL,
  `cantidad_minima` decimal(10,2) NOT NULL,
  `unidad` varchar(20) DEFAULT NULL,
  `precio_unitario` int unsigned DEFAULT NULL,
  `activo` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`insumo_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventario`
--

LOCK TABLES `inventario` WRITE;
/*!40000 ALTER TABLE `inventario` DISABLE KEYS */;
/*!40000 ALTER TABLE `inventario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventario_menu`
--

DROP TABLE IF EXISTS `inventario_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventario_menu` (
  `insumo_id` int NOT NULL,
  `producto_id` int NOT NULL,
  `cantidad_necesaria` tinyint unsigned NOT NULL,
  PRIMARY KEY (`insumo_id`,`producto_id`),
  KEY `fk_Inventario_has_Menu_Menu1_idx` (`producto_id`),
  KEY `fk_Inventario_has_Menu_Inventario1_idx` (`insumo_id`),
  CONSTRAINT `fk_Inventario_has_Menu_Inventario1` FOREIGN KEY (`insumo_id`) REFERENCES `inventario` (`insumo_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_Inventario_has_Menu_Menu1` FOREIGN KEY (`producto_id`) REFERENCES `productos_menu` (`producto_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventario_menu`
--

LOCK TABLES `inventario_menu` WRITE;
/*!40000 ALTER TABLE `inventario_menu` DISABLE KEYS */;
/*!40000 ALTER TABLE `inventario_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos_menu`
--

DROP TABLE IF EXISTS `productos_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos_menu` (
  `producto_id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `precio` smallint unsigned NOT NULL,
  `ingredientes` varchar(255) DEFAULT NULL,
  `categoria` enum('Bebida','Parrilla','Milanesas','Pastas','Postre','Chivitos','Entrada') NOT NULL,
  `disponibilidad` tinyint NOT NULL DEFAULT '1',
  `activo` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`producto_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos_menu`
--

LOCK TABLES `productos_menu` WRITE;
/*!40000 ALTER TABLE `productos_menu` DISABLE KEYS */;
/*!40000 ALTER TABLE `productos_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registro_actividades`
--

DROP TABLE IF EXISTS `registro_actividades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registro_actividades` (
  `log_id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `insumo_id` int DEFAULT NULL,
  `producto_id` int DEFAULT NULL,
  `tipo_cambio` enum('AGREGAR','ELIMINAR','MODIFICAR','AJUSTE_CANTIDAD') NOT NULL,
  `fecha_cambio` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `valor_antes` json DEFAULT NULL,
  `valor_despues` json DEFAULT NULL,
  `detalle` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`log_id`),
  KEY `fk_Registros_Usuario1_idx` (`usuario_id`),
  KEY `fk_Registros_Inventario1_idx` (`insumo_id`),
  KEY `fk_registro_actividades_productos_menu1_idx` (`producto_id`),
  CONSTRAINT `fk_registro_actividades_productos_menu1` FOREIGN KEY (`producto_id`) REFERENCES `productos_menu` (`producto_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_Registros_Inventario1` FOREIGN KEY (`insumo_id`) REFERENCES `inventario` (`insumo_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_Registros_Usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`usuario_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registro_actividades`
--

LOCK TABLES `registro_actividades` WRITE;
/*!40000 ALTER TABLE `registro_actividades` DISABLE KEYS */;
/*!40000 ALTER TABLE `registro_actividades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reserva`
--

DROP TABLE IF EXISTS `reserva`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reserva` (
  `reserva_id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `fecha_hora` datetime NOT NULL,
  `cant_personas` tinyint NOT NULL,
  `estado` enum('Confirmada','Pendiente','Cancelada','Finalizada') NOT NULL,
  `activa` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`reserva_id`),
  KEY `fk_Reserva_Usuario1_idx` (`usuario_id`),
  CONSTRAINT `fk_Reserva_Usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`usuario_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reserva`
--

LOCK TABLES `reserva` WRITE;
/*!40000 ALTER TABLE `reserva` DISABLE KEYS */;
/*!40000 ALTER TABLE `reserva` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `usuario_id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `correo` varchar(70) NOT NULL,
  `contrasena` varchar(60) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `tipo` enum('A','E','C') NOT NULL,
  `activo` tinyint NOT NULL DEFAULT '1',
  `fecha_registro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`usuario_id`),
  UNIQUE KEY `correo_UNIQUE` (`correo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-13 17:43:30
