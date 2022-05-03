# Spends Checker alkemy-full-stack
<details>
  <summary>Español</summary>
  Una aplicación para administración de presupuesto personal, donde puedes guardar con detalle tus ingresos y egresos de dinero y ver un balance de tus operaciones registradas. También puedes tener una mejor organización de ellas clasificándolas por concepto, tipo y categoría.

  ## Motivación para el proyecto
  Este es un proyecto desarrollado para el [desafío Full Stack JS](https://drive.google.com/file/d/1LUY2tZ_OhShoSE2g9cYGGKM1ioFj0MhE/view?usp=sharing) de la aceleración de [Alkemy](https://www.alkemy.org/). Tomé como un reto personal el realizarlo en el menor tiempo posible con una deadline de diez días y aplicar el nuevo conocimiento adquirido en PostgreSQL, Sequelize, Redux Toolkit y Material UI, reforzando la práctica de React.

  ## Estado actual
  El proyecto se encuentra terminado en su mayor parte. En lo relativo a la consigna a cumplir, sólo resta crear un observer que restrinja el renderizado de los registros a diez y únicamente muestre los restantes si el usuario así lo solicita. Además, aunque el diseño que responda a los distintos tamaños de pantalla funciona, se lo ve bastante pobre, debiendo revisar puntos claves para una mejor experiencia del usuario. Por otro lado, personalmente considero de importancia agregar algunas funcionalidades extra. Aunque la aplicación es sencilla, resulta básico el permitir agregar y quitar opciones a los filtros a gusto, la posibilidad de acotar los registros a fechas determinadas y que el usuario pueda disponer de otra suma resultante de los filtros aplicados.

  ## Instalación
  Para instalar esta aplicación para probarla en desarrollo necesitas:
    * Crear e ir a un nuevo directorio.
    * Inicializar un nuevo repositorio con el comando "git init".
    * Obten [este repositorio](https://github.com/andressiri/alkemy-full-stack) con el comando "git pull https://github.com/andressiri/alkemy-full-stack"
    * Instala las dependencias del directorio raíz con el comando "npm install".
    * Dirigete al directorio "frontend" e instala las dependencias con el comando "npm install" nuevamente.
    * Crea un archivo .env en el directorio razíz con las siguientes variables:
      - NODE_ENV = development
      - DB_NAME = "el nombre de tu base de datos PostgreSQL"
      - DB_USERNAME = "tu nombre de usuario para esa base de datos de PostgreSQL"
      - DB_PASSWORD = "la contraseña para ese usuario de PostgreSQL"
      - JWT_SECRET = "lo que sea que quieras usar como secreto para el token de JWT"
      - MAILER_MAIL = "tu email de **gmail**"
      - MAIL_PASSWORD" = "tu "contraseña de aplicación" generada desde google" (no es la constraseña de tu email)

    * Crea las tablas en tu base de datos PostgreSQL:
      - La tabla "people":
        * user_uuid UUID PRIMARY KEY
        * name VARCHAR(50) NOT NULL
        * email VARCHAR(100) NOT NULL UNIQUE
        * password VARCHAR(100) NOT NULL
        * verified BOOLEAN
        * createdAt TIMESTAMP NOT NULL
        * updatedAt TIMESTAMP
      
      - La tabla "records":
        * record_uuid UUID PRIMARY KEY
        * concept VARCHAR(50) NOT NULL
        * amount REAL NOT NULL
        * operation_date DATE NOT NULL
        * operation_type VARCHAR(7) NOT NULL
        * category VARCHAR(50)
        * user_UUID UUID
        * createdAt TIMESTAMP NOT NULL
        * updatedAt TIMESTAMP NOT NULL
        * agrega una restricción para operation_type: 
          operation_type VARCHAER(7) CONSTRAINT type_valid_values
            CHECK(operation_type = "Income" OR operation_type = "Outcome")
     
     TODO: explicar en detalle cómo instalar PostgreSQL, para qué es el secreto de JWT y y cómo obtener la contraseña de aplicación para tu cuenta de gmail. Crear el archivo sql para la creación de las tablas y explicar cómo usarlo.

</details>
<details>
  <summary>English</summary>
  An app for personal budget administration, where you can save your money incomes and outcomes with detail and see a balance of your registered operations. You can also get a better organization sorting them by concept, type and category.

  ## Motivation for the project
  This is a project developed for the [Full Stack Challenge JS](https://drive.google.com/file/d/1LUY2tZ_OhShoSE2g9cYGGKM1ioFj0MhE/view?usp=sharing) of [Alkemy's](https://www.alkemy.org/) acceleration. I took it as a personal defiance making it in the lesser time possible with a ten days deadline and apply the recently acquired knowledge of PostgreSQL, Sequelize, Redux Toolkit and Material UI, strengthening the React practice.

  ## Build status
  The project is mostly finished. In relation to the assignment to fulfill, it's just missing the creation of an observer that restricts the records rendering to ten and just shows the rest of them if the user requires to do so. Furthermore, besides the design is responsive, it seems pretty poor, so it's important to check some breakpoints for a better user experience. On the other hand, I personally think that it is important to incorporate some functionalities, like allow adding or deleting options to the filters as pleased, the possibility to delimit the records to certain dates and that the user can have another addition after filters are applied.

  ## Installation
  To install this app for development mode testing you need to:
    - Create and go to a new directory.
    - Initialize a new repository with "git init" command.
    - Git pull [this repository](https://github.com/andressiri/alkemy-full-stack) with "git pull https://github.com/andressiri/alkemy-full-stack" command.
    - Install root directory dependencies with "npm install" command.
    - Move to frontend directory and install client dependencies with the "npm install" command again.
    - Create a .env file at the root directory with the following variables:
      - NODE_ENV = development
      - DB_NAME = "your PostgreSQL database name"
      - DB_USERNAME = "your PostgreSQL user name"
      - DB_PASSWORD = "your PostgreSQL password for previous user"
      - JWT_SECRET = "whatever you want to use as JWT secret"
      - MAILER_MAIL = "your **gmail** email"
      - MAIL_PASSWORD" = "the "application password" generated with google" (not your email password)

    - Create tables at your PostgreSQL database:
      - "people" table:
        - user_uuid UUID PRIMARY KEY
        - name VARCHAR(50) NOT NULL
        - email VARCHAR(100) NOT NULL UNIQUE
        - password VARCHAR(100) NOT NULL
        - verified BOOLEAN
        - createdAt TIMESTAMP NOT NULL
        - updatedAt TIMESTAMP
      
      - "records" table:
        - record_uuid UUID PRIMARY KEY
        - concept VARCHAR(50) NOT NULL
        - amount REAL NOT NULL
        - operation_date DATE NOT NULL
        - operation_type VARCHAR(7) NOT NULL
        - category VARCHAR(50)
        - user_UUID UUID
        - createdAt TIMESTAMP NOT NULL
        - updatedAt TIMESTAMP NOT NULL
        - and add a constraint for operation_type: 
          operation_type VARCHAER(7) CONSTRAINT type_valid_values
            CHECK(operation_type = "Income" OR operation_type = "Outcome")
     
     TODO: explain more in detail how to install PostgreSQL, what is JWT secret for and how to get application mail password. Create sql file and explain how to run it
</details>