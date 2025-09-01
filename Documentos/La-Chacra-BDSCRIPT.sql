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
CREATE SCHEMA IF NOT EXISTS `lachacra_db` DEFAULT CHARACTER SET utf8 ;
-- -----------------------------------------------------
-- Schema LaChacraBD
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema LaChacraBD
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `LaChacraBD` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
-- -----------------------------------------------------
-- Schema LaChacraDB
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema LaChacraDB
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `LaChacraDB` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;
USE `lachacra_db` ;

-- -----------------------------------------------------
-- Table `lachacra_db`.`Usuario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lachacra_db`.`Usuario` ;

CREATE TABLE IF NOT EXISTS `lachacra_db`.`Usuario` (
  `usuario_id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `apellido` VARCHAR(50) NOT NULL,
  `correo` VARCHAR(70) NOT NULL,
  `contrasena` VARCHAR(60) NOT NULL,
  `fecha_nacimiento` DATE NOT NULL,
  `tipo` ENUM('A', 'M', 'C') NOT NULL,
  `activo` TINYINT NOT NULL,
  `nivel_de_acceso` TINYINT(1) NOT NULL,
  PRIMARY KEY (`usuario_id`),
  UNIQUE INDEX `correo_UNIQUE` (`correo` ASC) VISIBLE);


-- -----------------------------------------------------
-- Table `lachacra_db`.`Menu`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lachacra_db`.`Menu` ;

CREATE TABLE IF NOT EXISTS `lachacra_db`.`Menu` (
  `item_menu_id` INT NOT NULL AUTO_INCREMENT,
  `item_menu_nombre` VARCHAR(45) NOT NULL,
  `ingredientes` VARCHAR(150) NULL,
  `precio` INT NOT NULL,
  `categoria` ENUM('Bebida', 'Parrilla', 'Milanesas', 'Pastas', 'Postre', 'Chivitos', 'Entrada') NOT NULL,
  `disponibilidad` TINYINT NULL,
  PRIMARY KEY (`item_menu_id`));


-- -----------------------------------------------------
-- Table `lachacra_db`.`Comanda`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lachacra_db`.`Comanda` ;

CREATE TABLE IF NOT EXISTS `lachacra_db`.`Comanda` (
  `comanda_id` INT NOT NULL AUTO_INCREMENT,
  `Usuario_id_usuario` INT NOT NULL,
  `n_mesa` TINYINT(2) NOT NULL,
  `estado` ENUM('Activo', 'En espera', 'Cancelado') NOT NULL,
  `comanda_fecha` DATE NOT NULL,
  `comanda_hora` TIME NOT NULL,
  PRIMARY KEY (`comanda_id`),
  INDEX `fk_Comanda_Usuario1_idx` (`Usuario_id_usuario` ASC) VISIBLE,
  CONSTRAINT `fk_Comanda_Usuario1`
    FOREIGN KEY (`Usuario_id_usuario`)
    REFERENCES `lachacra_db`.`Usuario` (`usuario_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `lachacra_db`.`Inventario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lachacra_db`.`Inventario` ;

CREATE TABLE IF NOT EXISTS `lachacra_db`.`Inventario` (
  `id_item_inventario` INT NOT NULL AUTO_INCREMENT,
  `nombre_item_inventario` VARCHAR(45) NOT NULL,
  `cantidad_item` TINYINT(3) NULL,
  PRIMARY KEY (`id_item_inventario`));


-- -----------------------------------------------------
-- Table `lachacra_db`.`Reserva`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lachacra_db`.`Reserva` ;

CREATE TABLE IF NOT EXISTS `lachacra_db`.`Reserva` (
  `reserva_id` INT NOT NULL AUTO_INCREMENT,
  `reserva_fecha` DATE NOT NULL,
  `reserva_hora` TIME NOT NULL,
  `estado` ENUM('Confirmada', 'Cancelada', 'Finalizada') NULL,
  `Usuario_id_usuario` INT NOT NULL,
  PRIMARY KEY (`reserva_id`),
  INDEX `fk_Reserva_Usuario1_idx` (`Usuario_id_usuario` ASC) VISIBLE,
  CONSTRAINT `fk_Reserva_Usuario1`
    FOREIGN KEY (`Usuario_id_usuario`)
    REFERENCES `lachacra_db`.`Usuario` (`usuario_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `lachacra_db`.`InventarioMenu`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lachacra_db`.`InventarioMenu` ;

CREATE TABLE IF NOT EXISTS `lachacra_db`.`InventarioMenu` (
  `Inventario_id_item_inventario` INT NOT NULL,
  `Menu_id_item_menu` INT NOT NULL,
  PRIMARY KEY (`Inventario_id_item_inventario`, `Menu_id_item_menu`),
  INDEX `fk_Inventario_has_Menu_Menu1_idx` (`Menu_id_item_menu` ASC) VISIBLE,
  INDEX `fk_Inventario_has_Menu_Inventario1_idx` (`Inventario_id_item_inventario` ASC) VISIBLE,
  CONSTRAINT `fk_Inventario_has_Menu_Inventario1`
    FOREIGN KEY (`Inventario_id_item_inventario`)
    REFERENCES `lachacra_db`.`Inventario` (`id_item_inventario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Inventario_has_Menu_Menu1`
    FOREIGN KEY (`Menu_id_item_menu`)
    REFERENCES `lachacra_db`.`Menu` (`item_menu_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `lachacra_db`.`DetalleComanda`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lachacra_db`.`DetalleComanda` ;

CREATE TABLE IF NOT EXISTS `lachacra_db`.`DetalleComanda` (
  `Comanda_id_comanda` INT NOT NULL,
  `Menu_id_item_menu` INT NOT NULL,
  `nota` VARCHAR(100) NULL,
  PRIMARY KEY (`Comanda_id_comanda`, `Menu_id_item_menu`),
  INDEX `fk_Comanda_has_Menu_Menu1_idx` (`Menu_id_item_menu` ASC) VISIBLE,
  INDEX `fk_Comanda_has_Menu_Comanda1_idx` (`Comanda_id_comanda` ASC) VISIBLE,
  CONSTRAINT `fk_Comanda_has_Menu_Comanda1`
    FOREIGN KEY (`Comanda_id_comanda`)
    REFERENCES `lachacra_db`.`Comanda` (`comanda_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Comanda_has_Menu_Menu1`
    FOREIGN KEY (`Menu_id_item_menu`)
    REFERENCES `lachacra_db`.`Menu` (`item_menu_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `lachacra_db`.`RegistrosActividades`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lachacra_db`.`RegistrosActividades` ;

CREATE TABLE IF NOT EXISTS `lachacra_db`.`RegistrosActividades` (
  `registro_actividades_id` INT NOT NULL,
  `Usuario_id_usuario` INT NOT NULL,
  `Inventario_id_item_inventario` INT NOT NULL,
  `fecha_cambio` DATE NOT NULL,
  `tipo_cambio` ENUM('Agregó', 'Eliminó', 'Actualizó', 'Ajuste_Cantidad') NOT NULL,
  `cantidad_antes` TINYINT NULL,
  `cantidad_despues` TINYINT NULL,
  PRIMARY KEY (`registro_actividades_id`),
  INDEX `fk_Registros_Usuario1_idx` (`Usuario_id_usuario` ASC) VISIBLE,
  INDEX `fk_Registros_Inventario1_idx` (`Inventario_id_item_inventario` ASC) VISIBLE,
  CONSTRAINT `fk_Registros_Usuario1`
    FOREIGN KEY (`Usuario_id_usuario`)
    REFERENCES `lachacra_db`.`Usuario` (`usuario_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Registros_Inventario1`
    FOREIGN KEY (`Inventario_id_item_inventario`)
    REFERENCES `lachacra_db`.`Inventario` (`id_item_inventario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `LaChacraBD` ;

-- -----------------------------------------------------
-- Table `LaChacraBD`.`Usuario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LaChacraBD`.`Usuario` ;

CREATE TABLE IF NOT EXISTS `LaChacraBD`.`Usuario` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `correo` VARCHAR(100) NOT NULL,
  `contraseña` VARCHAR(100) NOT NULL,
  `fecha_nacimiento` DATE NULL DEFAULT NULL,
  `pais` VARCHAR(50) NULL DEFAULT NULL,
  `tipo_usuario` ENUM('cliente', 'empleado', 'admin') NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE INDEX `correo` (`correo` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `LaChacraBD`.`Empleado`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LaChacraBD`.`Empleado` ;

CREATE TABLE IF NOT EXISTS `LaChacraBD`.`Empleado` (
  `id_usuario` INT NOT NULL,
  `tipo_empleado` ENUM('mozo', 'cocinero', 'otro') NOT NULL,
  PRIMARY KEY (`id_usuario`),
  CONSTRAINT `Empleado_ibfk_1`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `LaChacraBD`.`Usuario` (`id_usuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `LaChacraBD`.`Administrador`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LaChacraBD`.`Administrador` ;

CREATE TABLE IF NOT EXISTS `LaChacraBD`.`Administrador` (
  `id_usuario` INT NOT NULL,
  `permisos` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id_usuario`),
  CONSTRAINT `Administrador_ibfk_1`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `LaChacraBD`.`Empleado` (`id_usuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `LaChacraBD`.`Cliente`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LaChacraBD`.`Cliente` ;

CREATE TABLE IF NOT EXISTS `LaChacraBD`.`Cliente` (
  `id_usuario` INT NOT NULL,
  PRIMARY KEY (`id_usuario`),
  CONSTRAINT `Cliente_ibfk_1`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `LaChacraBD`.`Usuario` (`id_usuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `LaChacraBD`.`Reserva`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LaChacraBD`.`Reserva` ;

CREATE TABLE IF NOT EXISTS `LaChacraBD`.`Reserva` (
  `id_reserva` INT NOT NULL AUTO_INCREMENT,
  `fecha_hora` DATETIME NOT NULL,
  `n_mesa` INT NOT NULL,
  `id_cliente` INT NOT NULL,
  PRIMARY KEY (`id_reserva`),
  INDEX `id_cliente` (`id_cliente` ASC) VISIBLE,
  CONSTRAINT `Reserva_ibfk_1`
    FOREIGN KEY (`id_cliente`)
    REFERENCES `LaChacraBD`.`Cliente` (`id_usuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `LaChacraBD`.`Producto`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LaChacraBD`.`Producto` ;

CREATE TABLE IF NOT EXISTS `LaChacraBD`.`Producto` (
  `id_producto` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `descripcion` TEXT NULL DEFAULT NULL,
  `precio` DECIMAL(10,2) NOT NULL,
  `categoria` ENUM('entrada', 'plato principal', 'postre', 'bebida') NOT NULL,
  `disponibilidad` TINYINT(1) NULL DEFAULT '1',
  `tiempo_preparacion` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id_producto`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `LaChacraBD`.`DetalleReserva`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LaChacraBD`.`DetalleReserva` ;

CREATE TABLE IF NOT EXISTS `LaChacraBD`.`DetalleReserva` (
  `id_detalle` INT NOT NULL AUTO_INCREMENT,
  `id_reserva` INT NOT NULL,
  `id_producto` INT NOT NULL,
  `cantidad` INT NOT NULL,
  PRIMARY KEY (`id_detalle`),
  INDEX `id_reserva` (`id_reserva` ASC) VISIBLE,
  INDEX `id_producto` (`id_producto` ASC) VISIBLE,
  CONSTRAINT `DetalleReserva_ibfk_1`
    FOREIGN KEY (`id_reserva`)
    REFERENCES `LaChacraBD`.`Reserva` (`id_reserva`),
  CONSTRAINT `DetalleReserva_ibfk_2`
    FOREIGN KEY (`id_producto`)
    REFERENCES `LaChacraBD`.`Producto` (`id_producto`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `LaChacraBD`.`EstadisticaReserva`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LaChacraBD`.`EstadisticaReserva` ;

CREATE TABLE IF NOT EXISTS `LaChacraBD`.`EstadisticaReserva` (
  `id_est_reserva` INT NOT NULL AUTO_INCREMENT,
  `anio` YEAR NOT NULL,
  `mes` INT NULL DEFAULT NULL,
  `cantidad_reservas` INT NOT NULL,
  `cliente_mas_frecuente` INT NULL DEFAULT NULL,
  `producto_mas_comprado` INT NULL DEFAULT NULL,
  `epoca` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`id_est_reserva`),
  INDEX `cliente_mas_frecuente` (`cliente_mas_frecuente` ASC) VISIBLE,
  INDEX `producto_mas_comprado` (`producto_mas_comprado` ASC) VISIBLE,
  CONSTRAINT `EstadisticaReserva_ibfk_1`
    FOREIGN KEY (`cliente_mas_frecuente`)
    REFERENCES `LaChacraBD`.`Cliente` (`id_usuario`),
  CONSTRAINT `EstadisticaReserva_ibfk_2`
    FOREIGN KEY (`producto_mas_comprado`)
    REFERENCES `LaChacraBD`.`Producto` (`id_producto`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `LaChacraBD`.`EstadisticaVenta`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LaChacraBD`.`EstadisticaVenta` ;

CREATE TABLE IF NOT EXISTS `LaChacraBD`.`EstadisticaVenta` (
  `id_estadistica` INT NOT NULL AUTO_INCREMENT,
  `id_producto` INT NOT NULL,
  `anio` YEAR NOT NULL,
  `mes` INT NULL DEFAULT NULL,
  `cantidad_vendida` INT NOT NULL,
  PRIMARY KEY (`id_estadistica`),
  INDEX `id_producto` (`id_producto` ASC) VISIBLE,
  CONSTRAINT `EstadisticaVenta_ibfk_1`
    FOREIGN KEY (`id_producto`)
    REFERENCES `LaChacraBD`.`Producto` (`id_producto`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `LaChacraBD`.`Stock`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LaChacraBD`.`Stock` ;

CREATE TABLE IF NOT EXISTS `LaChacraBD`.`Stock` (
  `id_stock` INT NOT NULL AUTO_INCREMENT,
  `tipo_producto` ENUM('carnico', 'bebida') NOT NULL,
  `nombre_producto` VARCHAR(100) NOT NULL,
  `cantidad_disponible` INT NOT NULL,
  PRIMARY KEY (`id_stock`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

USE `LaChacraDB` ;

-- -----------------------------------------------------
-- Table `LaChacraDB`.`Mesa`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LaChacraDB`.`Mesa` ;

CREATE TABLE IF NOT EXISTS `LaChacraDB`.`Mesa` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `capacidad` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `LaChacraDB`.`Usuario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LaChacraDB`.`Usuario` ;

CREATE TABLE IF NOT EXISTS `LaChacraDB`.`Usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `correo` VARCHAR(100) NOT NULL,
  `contraseña` VARCHAR(255) NOT NULL,
  `fecha_nacimiento` DATE NULL DEFAULT NULL,
  `nacionalidad` VARCHAR(50) NULL DEFAULT NULL,
  `tipo` ENUM('cliente', 'empleado', 'administrador') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `correo` (`correo` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `LaChacraDB`.`Comanda`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LaChacraDB`.`Comanda` ;

CREATE TABLE IF NOT EXISTS `LaChacraDB`.`Comanda` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fecha` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_mesa` INT NOT NULL,
  `id_empleado` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `id_mesa` (`id_mesa` ASC) VISIBLE,
  INDEX `id_empleado` (`id_empleado` ASC) VISIBLE,
  CONSTRAINT `Comanda_ibfk_1`
    FOREIGN KEY (`id_mesa`)
    REFERENCES `LaChacraDB`.`Mesa` (`id`),
  CONSTRAINT `Comanda_ibfk_2`
    FOREIGN KEY (`id_empleado`)
    REFERENCES `LaChacraDB`.`Usuario` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `LaChacraDB`.`Ingrediente`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LaChacraDB`.`Ingrediente` ;

CREATE TABLE IF NOT EXISTS `LaChacraDB`.`Ingrediente` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `unidad` VARCHAR(20) NULL DEFAULT NULL,
  `cantidad_disponible` DECIMAL(10,2) NULL DEFAULT '0.00',
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `LaChacraDB`.`Plato`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LaChacraDB`.`Plato` ;

CREATE TABLE IF NOT EXISTS `LaChacraDB`.`Plato` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `ingredientes` TEXT NULL DEFAULT NULL,
  `precio` DECIMAL(10,2) NOT NULL,
  `categoria` ENUM('entrada', 'principal', 'postre', 'bebida', 'otro') NOT NULL,
  `disponible` TINYINT(1) NULL DEFAULT '1',
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `LaChacraDB`.`Item_Comanda`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LaChacraDB`.`Item_Comanda` ;

CREATE TABLE IF NOT EXISTS `LaChacraDB`.`Item_Comanda` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_comanda` INT NOT NULL,
  `id_plato` INT NOT NULL,
  `cantidad` INT NOT NULL,
  `nota` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `id_comanda` (`id_comanda` ASC) VISIBLE,
  INDEX `id_plato` (`id_plato` ASC) VISIBLE,
  CONSTRAINT `Item_Comanda_ibfk_1`
    FOREIGN KEY (`id_comanda`)
    REFERENCES `LaChacraDB`.`Comanda` (`id`),
  CONSTRAINT `Item_Comanda_ibfk_2`
    FOREIGN KEY (`id_plato`)
    REFERENCES `LaChacraDB`.`Plato` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `LaChacraDB`.`Log_Inventario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LaChacraDB`.`Log_Inventario` ;

CREATE TABLE IF NOT EXISTS `LaChacraDB`.`Log_Inventario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_admin` INT NOT NULL,
  `id_ingrediente` INT NULL DEFAULT NULL,
  `accion` ENUM('alta', 'modificación', 'eliminación', 'ajuste_stock') NOT NULL,
  `cantidad_antes` DECIMAL(10,2) NULL DEFAULT NULL,
  `cantidad_despues` DECIMAL(10,2) NULL DEFAULT NULL,
  `detalle` TEXT NULL DEFAULT NULL,
  `fecha_hora` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `id_admin` (`id_admin` ASC) VISIBLE,
  INDEX `id_ingrediente` (`id_ingrediente` ASC) VISIBLE,
  CONSTRAINT `Log_Inventario_ibfk_1`
    FOREIGN KEY (`id_admin`)
    REFERENCES `LaChacraDB`.`Usuario` (`id`),
  CONSTRAINT `Log_Inventario_ibfk_2`
    FOREIGN KEY (`id_ingrediente`)
    REFERENCES `LaChacraDB`.`Ingrediente` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `LaChacraDB`.`Log_Menu`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LaChacraDB`.`Log_Menu` ;

CREATE TABLE IF NOT EXISTS `LaChacraDB`.`Log_Menu` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_admin` INT NOT NULL,
  `id_plato` INT NULL DEFAULT NULL,
  `accion` ENUM('alta', 'modificación', 'eliminación') NOT NULL,
  `detalle_antes` TEXT NULL DEFAULT NULL,
  `detalle_despues` TEXT NULL DEFAULT NULL,
  `fecha_hora` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `id_admin` (`id_admin` ASC) VISIBLE,
  INDEX `id_plato` (`id_plato` ASC) VISIBLE,
  CONSTRAINT `Log_Menu_ibfk_1`
    FOREIGN KEY (`id_admin`)
    REFERENCES `LaChacraDB`.`Usuario` (`id`),
  CONSTRAINT `Log_Menu_ibfk_2`
    FOREIGN KEY (`id_plato`)
    REFERENCES `LaChacraDB`.`Plato` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `LaChacraDB`.`Plato_Ingrediente`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LaChacraDB`.`Plato_Ingrediente` ;

CREATE TABLE IF NOT EXISTS `LaChacraDB`.`Plato_Ingrediente` (
  `id_plato` INT NOT NULL,
  `id_ingrediente` INT NOT NULL,
  `cantidad_necesaria` DECIMAL(10,2) NULL DEFAULT NULL,
  PRIMARY KEY (`id_plato`, `id_ingrediente`),
  INDEX `id_ingrediente` (`id_ingrediente` ASC) VISIBLE,
  CONSTRAINT `Plato_Ingrediente_ibfk_1`
    FOREIGN KEY (`id_plato`)
    REFERENCES `LaChacraDB`.`Plato` (`id`),
  CONSTRAINT `Plato_Ingrediente_ibfk_2`
    FOREIGN KEY (`id_ingrediente`)
    REFERENCES `LaChacraDB`.`Ingrediente` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `LaChacraDB`.`Reserva`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LaChacraDB`.`Reserva` ;

CREATE TABLE IF NOT EXISTS `LaChacraDB`.`Reserva` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fecha` DATE NOT NULL,
  `hora` TIME NOT NULL,
  `id_cliente` INT NOT NULL,
  `id_mesa` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `id_cliente` (`id_cliente` ASC) VISIBLE,
  INDEX `id_mesa` (`id_mesa` ASC) VISIBLE,
  CONSTRAINT `Reserva_ibfk_1`
    FOREIGN KEY (`id_cliente`)
    REFERENCES `LaChacraDB`.`Usuario` (`id`),
  CONSTRAINT `Reserva_ibfk_2`
    FOREIGN KEY (`id_mesa`)
    REFERENCES `LaChacraDB`.`Mesa` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
