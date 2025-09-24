-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema lachacra_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema lachacra_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `lachacra_db` ;
USE `lachacra_db` ;

-- -----------------------------------------------------
-- Table `lachacra_db`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lachacra_db`.`usuario` (
  `usuario_id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `apellido` VARCHAR(45) NOT NULL,
  `correo` VARCHAR(70) NOT NULL,
  `contrasena` VARCHAR(60) NOT NULL,
  `fecha_nacimiento` DATE NOT NULL,
  `tipo` ENUM('A', 'M', 'C') NOT NULL,
  `activo` TINYINT NOT NULL DEFAULT 1,
  `fecha_registro` TIME NOT NULL,
  PRIMARY KEY (`usuario_id`),
  UNIQUE INDEX `correo_UNIQUE` (`correo` ASC) VISIBLE);


-- -----------------------------------------------------
-- Table `lachacra_db`.`productos_menu`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lachacra_db`.`productos_menu` (
  `producto_id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `precio` INT NOT NULL,
  `ingredientes` VARCHAR(150) NULL,
  `categoria` ENUM('Bebida', 'Parrilla', 'Milanesas', 'Pastas', 'Postre', 'Chivitos', 'Entrada') NOT NULL,
  `activo` TINYINT NOT NULL DEFAULT 1,
  `disponibilidad` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`producto_id`));


-- -----------------------------------------------------
-- Table `lachacra_db`.`comanda`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lachacra_db`.`comanda` (
  `comanda_id` INT NOT NULL AUTO_INCREMENT,
  `usuario_id` INT NOT NULL,
  `n_mesa` TINYINT(2) NOT NULL,
  `estado` ENUM('Activo', 'En espera', 'Cancelado') NOT NULL,
  `fecha_hora` DATETIME NOT NULL,
  `activa` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`comanda_id`),
  INDEX `fk_Comanda_Usuario1_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_Comanda_Usuario1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `lachacra_db`.`usuario` (`usuario_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `lachacra_db`.`inventario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lachacra_db`.`inventario` (
  `insumo_id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `categoria` TINYINT(3) NULL,
  `cantidad` DECIMAL(10,2) NOT NULL,
  `unidad` VARCHAR(45) NULL,
  `precio_unitario` INT NULL,
  PRIMARY KEY (`insumo_id`));


-- -----------------------------------------------------
-- Table `lachacra_db`.`reserva`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lachacra_db`.`reserva` (
  `reserva_id` INT NOT NULL AUTO_INCREMENT,
  `usuario_id` INT NOT NULL,
  `fecha` DATE NOT NULL,
  `hora` TIME NOT NULL,
  `estado` ENUM('Confirmada', 'Pendiente', 'Cancelada', 'Finalizada') NOT NULL,
  `activa` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`reserva_id`),
  INDEX `fk_Reserva_Usuario1_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_Reserva_Usuario1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `lachacra_db`.`usuario` (`usuario_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `lachacra_db`.`inventario_menu`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lachacra_db`.`inventario_menu` (
  `insumo_id` INT NOT NULL,
  `producto_id` INT NOT NULL,
  `cantidad_necesaria` TINYINT NOT NULL,
  PRIMARY KEY (`insumo_id`, `producto_id`),
  INDEX `fk_Inventario_has_Menu_Menu1_idx` (`producto_id` ASC) VISIBLE,
  INDEX `fk_Inventario_has_Menu_Inventario1_idx` (`insumo_id` ASC) VISIBLE,
  CONSTRAINT `fk_Inventario_has_Menu_Inventario1`
    FOREIGN KEY (`insumo_id`)
    REFERENCES `lachacra_db`.`inventario` (`insumo_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Inventario_has_Menu_Menu1`
    FOREIGN KEY (`producto_id`)
    REFERENCES `lachacra_db`.`productos_menu` (`producto_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `lachacra_db`.`detalle_comanda`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lachacra_db`.`detalle_comanda` (
  `comanda_id` INT NOT NULL,
  `producto_id` INT NOT NULL,
  `cantidad` TINYINT NOT NULL DEFAULT 1,
  `nota` VARCHAR(100) NULL,
  PRIMARY KEY (`comanda_id`, `producto_id`),
  INDEX `fk_Comanda_has_Menu_Menu1_idx` (`producto_id` ASC) VISIBLE,
  INDEX `fk_Comanda_has_Menu_Comanda1_idx` (`comanda_id` ASC) VISIBLE,
  CONSTRAINT `fk_Comanda_has_Menu_Comanda1`
    FOREIGN KEY (`comanda_id`)
    REFERENCES `lachacra_db`.`comanda` (`comanda_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Comanda_has_Menu_Menu1`
    FOREIGN KEY (`producto_id`)
    REFERENCES `lachacra_db`.`productos_menu` (`producto_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `lachacra_db`.`registro_actividades`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lachacra_db`.`registro_actividades` (
  `log_id` INT NOT NULL AUTO_INCREMENT,
  `usuario_id` INT NOT NULL,
  `insumo_id` INT NULL,
  `producto_id` INT NULL,
  `tipo_cambio` ENUM('AGREGAR', 'ELIMINAR', 'MODIFICAR', 'AJUSTE_CANTIDAD') NOT NULL,
  `fecha_cambio` DATE NOT NULL,
  `valor_antes` JSON NULL,
  `valor_despues` JSON NULL,
  `detalle` VARCHAR(255) NULL,
  PRIMARY KEY (`log_id`),
  INDEX `fk_Registros_Usuario1_idx` (`usuario_id` ASC) VISIBLE,
  INDEX `fk_Registros_Inventario1_idx` (`insumo_id` ASC) VISIBLE,
  INDEX `fk_registro_actividades_productos_menu1_idx` (`producto_id` ASC) VISIBLE,
  CONSTRAINT `fk_Registros_Usuario1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `lachacra_db`.`usuario` (`usuario_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Registros_Inventario1`
    FOREIGN KEY (`insumo_id`)
    REFERENCES `lachacra_db`.`inventario` (`insumo_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_registro_actividades_productos_menu1`
    FOREIGN KEY (`producto_id`)
    REFERENCES `lachacra_db`.`productos_menu` (`producto_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
