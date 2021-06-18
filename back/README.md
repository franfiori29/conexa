# Instalación

Proyecto hecho con Express, TypeORM y Sequelize.

## Pasos

Tener instalado npm y node:

### `Crear un archivo .env y agregar las siguiente líneas`

DB_ENTITIES=src/models/\*\*/\*.ts  
DB_MIGRATIONS=src/migrations/\*\*/\*.ts  
DB\*HOST=HOST_DE_LA_BASE_DE_DATOS  
DB_LOGGING=true  
DB_NAME=NOMBRE_DE_LA_BASE_DE_DATOS  
DB_PASSWORD=CONTRASEÑA_DE_LA_BASE_DE_DATOS  
DB_PORT=PUERTO_DE_LA_BASE_DE_DATOS  
DB_SUBSCRIBERS=src/subscribers/\*\*/\*.ts  
DB_USERNAME=USUARIO_DE_LA_BASE_DE_DATOS  
SECRET_KEY=CUALQUIER_COSA

### `Ejecutar el comando npm install`

Instala las dependencias del proyecto.

### `Ejecutar el comando npm run migration:run`

Corre las migraciones, en este caso solamente una.

### `Ejecutar el comando npm run dev`

Corre el servidor en modo de desarrollo. (Esucha cambios en los archivos)

### `Ir a http://localhost:3000`
