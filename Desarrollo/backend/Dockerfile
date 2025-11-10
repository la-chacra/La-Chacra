# Imagen base oficial de PHP con Apache
FROM php:8.2-apache

# Instalar extensiones necesarias (por ejemplo PDO MySQL)
RUN docker-php-ext-install pdo pdo_mysql

# Copiar tu código al servidor
COPY . /var/www/html/

# Exponer el puerto 80 (Render usará automáticamente su variable $PORT)
EXPOSE 80

# Comando de inicio
CMD ["apache2-foreground"]
