# Proyecto La Chacra

## Índice

1. [Estructura del Proyecto](#estructura-del-proyecto)

    1.1 [Backend](#backend-backend)

    1.2 [Frontend](#frontend-frontend)

    1.3 [Archivos Clave del Frontend](#archivos-clave-del-frontend)
    
    1.4 [Archivos Clave del Backend](#archivos-clave-del-backend)
2. [Guía para Crear el Entorno de Desarrollo](#guía-para-crear-el-entorno-de-desarrollo)

    2.1 [Clonar el Repositorio](#1-clonar-el-repositorio-con-git-y-ssh)

    2.2 [Instalar Backend (PHP + MySQL)](#2-instalar-dependencias-del-backend-php--mysql)

    2.3 [Instalar Frontend (React + Tailwind)](#3-instalar-dependencias-del-frontend-react--tailwind)

    2.4 [Instalar Composer](#4-descargar-composer)
    
3. [Notas Importantes](#notas-importantes)

---

## Estructura del Proyecto

Este repositorio está dividido en **Backend (PHP - MVC/API)** y **Frontend (React + Tailwind)**.

---

### Backend (`/backend`)

* [app](Desarrollo/backend/app/) → Lógica principal de la aplicación.

  * [Controllers](Desarrollo/backend/app/Controllers/) → Manejan las peticiones y deciden qué hacer con ellas.
  * [Models](Desarrollo/backend/app/Models/) → Representan y gestionan los datos de la base de datos.
  * [Services](Desarrollo/backend/app/Services/) → Contiene la lógica de negocio (ej: autenticación, procesos internos).
  * [Helpers](Desarrollo/backend/app/Helpers/) → Funciones utilitarias que ayudan a otras partes del sistema.

* [config](Desarrollo/backend/config/) → Archivos de configuración (ej: base de datos).

* [public](Desarrollo/backend/public/) → Punto de entrada del backend, contiene `index.php`.

* [routes](Desarrollo/backend/routes/) → Define las rutas/endpoints del API.

* [storage](Desarrollo/backend/storage/) → Archivos generados por la aplicación.

  * [logs](Desarrollo/backend/storage/logs/) → Logs y registros de errores.



### Frontend (`/frontend`)

* [public](Desarrollo/frontend/public/) → Archivos estáticos y plantilla principal (`index.html`).
* [src](Desarrollo/frontend/src/) → Código principal del frontend.

  * [assets](Desarrollo/frontend/src/assets/) → Imágenes, íconos, fuentes y otros recursos.
  * [components](Desarrollo/frontend/src/components/) → Componentes reutilizables (botones, menús, etc.).
  * [pages](Desarrollo/frontend/src/pages/) → Páginas principales (Home, Dashboard, etc.).
  * [services](Desarrollo/frontend/src/services/) → Funciones para consumir el API (`api.js`).
  * [context](Desarrollo/frontend/src/context/) → Manejo de estado global con Context API.
  * [hooks](Desarrollo/frontend/src/hooks/) → Custom hooks reutilizables.
  * [styles](Desarrollo/frontend/src/styles/) → Estilos adicionales a Tailwind.

---

### Archivos Clave del Frontend

* **[`tailwind.config.js`](Desarrollo/frontend/tailwind.config.js)**: Configuración de Tailwind CSS y rutas de búsqueda de clases.
* **[`postcss.config.js`](Desarrollo/frontend/postcss.config.js)**: Configuración de PostCSS para compatibilidad de estilos.
* **[`index.html`](Desarrollo/frontend/index.html)**: HTML principal que contiene `<div id="root">` para React.
* **[`src/index.jsx`](Desarrollo/frontend/src/index.jsx)**: Punto de entrada de React, renderiza `<App />`.
* **[`src/App.jsx`](Desarrollo/frontend/src/App.jsx)**: Componente principal de la app React.
* **[`src/styles/index.css`](Desarrollo/frontend/src/styles/index.css)**: Importa directivas de Tailwind CSS.


### Archivos Clave del Backend

* **[`composer.json`](Desarrollo/backend/composer.json)** → Define dependencias PHP y autoload de clases.
* **[`index.php`](Desarrollo/backend/index.php)** → Punto de entrada del backend (Apache/Nginx).
* **[`.env.example`](Desarrollo/backend/.env.example)** → Plantilla de variables de entorno (NO subir `.env` real).

---

## Guía para Crear el Entorno de Desarrollo

### 1. Clonar el repositorio con Git y SSH

```bash
git clone git@github.com:sparkindevs/La-Chacra.git
cd proyecto
```

---

### 2. Instalar dependencias del Backend (PHP + MySQL)

#### Linux (Debian/Ubuntu)

```bash
# Actualizar paquetes
sudo apt update && sudo apt upgrade -y

# Instalar PHP y extensiones comunes
sudo apt install -y php php-cli php-mysql php-curl php-mbstring php-xml composer unzip

# Instalar MySQL
sudo apt install -y mysql-server

# Iniciar MySQL
sudo systemctl start mysql
sudo systemctl enable mysql
```
##### Iniciar Composer (instalarlo antes [Instalar Composer](#4-descargar-composer))
```bash
# Iniciar Composer
cd backend
sudo composer install
```

#### Windows

1. Descargar PHP oficial: [https://windows.php.net/download](https://windows.php.net/download)
* Elegir la versión “Thread Safe” y `.zip`.
2. Descomprimir, por ejemplo en `C:\php`
3. Agregar `C:\php` al PATH del sistema
* Panel de control → Sistema → Configuración avanzada → Variables de entorno → Path → Editar → Agregar `C:\php`
4. Verificar instalación:

```powershell
php -v
```

5. Iniciar Composer (instalarlo antes [Instalar Composer](#4-descargar-composer))

```powershell
cd backend
sudo composer install
```

6. Instalar MySQL 

* Instalar MySQL Community Server desde la página oficial: https://dev.mysql.com/downloads/mysql/

* Seguir el asistente de instalación.

* Elegir modo “Developer Default” si es solo para desarrollo.

* Configurar contraseña de root (la que quieran) durante la instalación.

---

### 3. Instalar dependencias del Frontend (React + Tailwind)

#### Linux

```bash
cd frontend
npm install
npm run dev
```

#### Windows

```powershell
cd frontend
npm install
npm run dev
```

---

### 4. Descargar Composer

#### Windows

1. Descargar [Composer-Setup.exe](https://getcomposer.org/Composer-Setup.exe)
2. Ejecutar instalador y seleccionar la ruta de PHP
3. Verificar:

```powershell
composer -V
```

#### Linux

```bash
sudo apt install -y php-cli unzip curl
cd ~
curl -sS https://getcomposer.org/installer -o composer-setup.php
sudo php composer-setup.php --install-dir=/usr/local/bin --filename=composer
composer -V
```

---

## Notas Importantes

* Las carpetas `vendor/` (PHP) y `node_modules/` (React) **no se suben al repo**, se generan al instalar dependencias.
* `.env` **no se sube**; usar `.env.example` como referencia.
* Ver `.gitignore` para más detalles sobre archivos ignorados.

---

