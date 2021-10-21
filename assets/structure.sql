-- CREAMOS LA BASE DE DATOS Y LA USAMOS

CREATE DATABASE  IF NOT EXISTS `prodental`;
USE `prodental`;

-- ESTRUCTURA TABLA USUARIOS

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL, 
  `email` varchar(20) DEFAULT NULL UNIQUE,
  `password` varchar(60) NOT NULL,
  `token` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
);


-- ESTRUCTURA TABLA TESTIMONIOS --

DROP TABLE IF EXISTS `testimonials`;
CREATE TABLE `testimonials` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(20) NOT NULL, 
  `description` varchar(200) NOT NULL,
  `author` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
);


-- ESTRUCTURA TABLA MEDICOS

DROP TABLE IF EXISTS `staffs`;
CREATE TABLE `staffs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL, 
  `matricula` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
);

-- ESTRUCTURA TABLA TRATAMIENTOS

DROP TABLE IF EXISTS `treatments`;
CREATE TABLE `treatments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(90) NOT NULL,
  `short_description` VARCHAR(120) NOT NULL,
  `subtitle` VARCHAR(1000),
  `image_principal` VARCHAR(255),
  `info_title` VARCHAR(255),
  `info` VARCHAR(2000),
  `video` VARCHAR(255),
  `description_title` VARCHAR(255),
  `description` VARCHAR(2000),
  `footer_title` VARCHAR(2000),
  `footer` VARCHAR(2000),
  `bullets_title` VARCHAR(255),
  `bullets_json` VARCHAR(60),
  PRIMARY KEY (`id`)
);


-- ESTRUCTURA TABLA TURNOS

DROP TABLE IF EXISTS `turns`;
CREATE TABLE `turns` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `treatment_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `date` DATE,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`treatment_id`) REFERENCES treatments(`id`),
  FOREIGN KEY (`user_id`) REFERENCES users(`id`)
);
