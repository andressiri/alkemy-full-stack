
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

  1. Crear e ir a un nuevo directorio.
  2. Inicializar un nuevo repositorio con el comando "git init".
  3. Obtener este repositorio con el comando "git pull https://github.com/andressiri/alkemy-full-stack".
  4. Instalar las dependencias del directorio raíz con el comando "npm install".
  5. Ir al directorio "frontend" e instalar las dependencias con el comando "npm install" nuevamente.
  6. Crear la base de datos PostgreSQL requerida:

      <details>

        <summary>Instalar el servidor PostgreSQL en tu computadora.</summary>

        - Descargar el instalador en [el sitio oficial](https://www.postgresql.org/download/).
        - En Windows considerar que es necesario haber ingresado como administrador o superusuario para realizar la instalación. De ser necesario, se recomienda seguir [las instrucciones para Windows provistas en el sitio oficial](https://www.enterprisedb.com/docs/supported-open-source/postgresql/installer/02_installing_postgresql_with_the_graphical_installation_wizard/01_invoking_the_graphical_installer/).
        - En Mac OS considerar que hay que correr el paquete dmg descargado como usuario administrador. De ser necesario, se recomienda seguir [las instrucciones para Mac OS provistas en el sitio oficial](https://www.enterprisedb.com/postgres-tutorials/installation-postgresql-mac-os).
        - En Ubuntu para Linux seguir [ las instrucciones provistas en el sitio oficial para Ubuntu](https://www.enterprisedb.com/postgres-tutorials/how-install-postgres-ubuntu).
        - Necesitarás la constraseña que ingreses en la instalación para conectarte a la base de datos.

      </details>

      <details>

        <summary>Crear la base de datos y sus tablas:</summary>

        <blockquote>

        <details>

        <summary><strong>Recomendado</strong>: corre el archivo createDatabase.sql provisto en este repositorio.</summary>

        - Conectar a la consola "SQL shell (psql)" (instalada al instalar el servidor PostgreSQL). Los valores por defecto para la conexión son: 
            - para Server: "localhost".
            - para Database: "postgres".
            - para Port: "5432".
            - para Username: "postgres".
        Inmediatamente después de ingresar el nombre de usuario (Username), debes ingresar la contraseña para ese usuario. Para el usuario por defecto (postgres), es la contraseña que ingresaste durante la instalación.
        - Ya en la consola psql corre el comando "\i ruta/a/createDatabase.sql;", donde "ruta/a/" es la ruta al directorio raíz del proyecto. Si tienes problemas con el nombre de la ruta, considera cambiar le nombre de los directorios, o mejor aún, simplemente copia el archivo createDatabase.sql a otro directorio y córrelo desde ahí. También considera que la ruta puede fallar si no usas el estilo de barra Unix ("/").
        - Una vez que hayas hecho esto con éxito, el proceso debería crear una base de datos llamada andres-siri-alkemy-test, conectarse a ella, crear dos tablas (people y records) y hacer varias (31) inserciones para un usuario falso provisto para probar la aplicación. El email de este usuario es "user@fake.test" y su contraseña es "123456".
        - Si por algún motivo no puedes instalar el archivo createDataba.sql, puede correr las líneas del archivo en la consola psql o usar pgAdmin 4.

        </details>

        <details>

        <summary>Crearlas usando pgAdmin 4</summary>

        1. Abrir la aplicación "pgAdmin 4" (instalada con el servidor PostgreSQL).
        2. Usar la contraseña que se ingresó durante la instalación.
            ![enter installation password](/assets/README/postgre%20pgadmin/0.%20Enter%20installation%20password.png)
        3. Crear una nueva base de datos.
            ![create a new database](/assets/README/postgre%20pgadmin/1.%20Create%20Database.png)
        4. Nombrarla "andres-siri-alkemy-test" o un nombre a elección.
            ![create a new database menu](/assets/README/postgre%20pgadmin/2.%20Create%20Database%20menu.png)
        5. Crear la primer tabla.
            ![create first table](/assets/README/postgre%20pgadmin/3.%20Create%20first%20table.png)
        6. Nombrar la primer tabla como "people".
            ![name first table](/assets/README/postgre%20pgadmin/4.%20Name%20first%20table.png)
        7. Definir las columnas de la tabla "people".
            ![define first table](/assets/README/postgre%20pgadmin/5.%20Define%20first%20table.png)
        8. Crear la restricción de valor único para la columna "email".
            ![set email unique constraint name](/assets/README/postgre%20pgadmin/6.%20Set%20email%20unique%20constraint%201.png)
            ![set email unique constraint column](/assets/README/postgre%20pgadmin/7.%20Set%20email%20unique%20constraint%202.png)
        9. Crear una segunda tabla.
            ![create a second table](/assets/README/postgre%20pgadmin/8.%20Create%20second%20table.png)
        10. Nombrar la segunda tabla como "records".
            ![name second table](/assets/README/postgre%20pgadmin/9.%20Name%20second%20table.png)
        11. Definir las columnas de la tabla "records".
            ![define second table](/assets/README/postgre%20pgadmin/10.%20Define%20second%20table.png)
        12. Crear la restricción de llave foránea para la columna "user_uuid".
            ![set foreign key constraint name](/assets/README/postgre%20pgadmin/11.%20Set%20foreign%20key%20constraint%20to%20user_uuid%201.png)
            ![set foreign key constraint conditions](/assets/README/postgre%20pgadmin/12.%20Set%20foreign%20key%20constraint%20to%20user_uuid%202.png)
        13. Crear la restricción de valores válidos para la columna "operation_type".
            ![set operation_type constraint name](/assets/README/postgre%20pgadmin/13.%20Set%20operation_type%20valid%20values%201.png)
            ![set operation_type constraint conditions](/assets/README/postgre%20pgadmin/14.%20Set%20operation_type%20valid%20values%202.png)

        </details>

        </blockquote>

      </details>

  7. Crear un archivo .env en el directorio raíz con las siguientes variables:

          NODE_ENV = development
          DB_NAME = < andres-siri-alkemy-test o el nombre de tu base de datos PostgreSQL >
          DB_USERNAME = < "postgres" (default) o tu nombre de usuario para esa base de datos de PostgreSQL >
          DB_PASSWORD = < la contraseña para ese usuario de PostgreSQL >
          JWT_SECRET = < una cadena que quieras usar como secreto para el token de JWT >
          MAILER_MAIL = < tu dirección de email de **gmail** >
          MAIL_PASSWORD" = < tu "contraseña de aplicación" generada desde google" > (no es la constraseña de tu email)


  TODO: explicar en detalle para qué es el secreto de JWT y y cómo obtener la contraseña de aplicación para tu cuenta de gmail. 

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

  1. Create and go to a new directory.
  2. Initialize a new repository with "git init" command.
  3. Git pull this repository with "git pull https://github.com/andressiri/alkemy-full-stack" command.
  4. Install root directory dependencies with "npm install" command.
  5. Move to "frontend" directory and install client dependencies with the "npm install" command again.
  6. Create the PostgreSQL required database:

      <details>

        <summary>Install PostgreSQL server in your computer.</summary>

        - Download the installer at [official site](https://www.postgresql.org/download/).
        - In Windows consider you need to be logged as administrator or superuser to perform and installation. If needed, follow the [instructions provided at official site for Windows](https://www.enterprisedb.com/docs/supported-open-source/postgresql/installer/02_installing_postgresql_with_the_graphical_installation_wizard/01_invoking_the_graphical_installer/).
        - In Mac OS consider you have to run the downloaded dmg package as administrator user. If needed, follow the [instructions provided at official site for Mac OS](https://www.enterprisedb.com/postgres-tutorials/installation-postgresql-mac-os).
        - In Ubuntu for Linux follow the [instructions provided at official site for Ubuntu](https://www.enterprisedb.com/postgres-tutorials/how-install-postgres-ubuntu).
        - You will need the password your enter in the installation to connect to the database.

      </details>

      <details>

        <summary>Create the database and it's tables:</summary>

        <blockquote>

        <details>

        <summary><strong>Recommended</strong>: run the createDatabase.sql file provided in this repository.</summary>

        - Connect to the "SQL shell (psql)" console (installed with the PostgreSQL server). The default values for connection are: 
              - for Server: "localhost".
              - for Database: "postgres".
              - for Port: "5432".
              - for Username: "postgres".
        Right after entering the username, you should enter the password for that user. For the default user (postgres), it is the password you provided in the installation.
        - In the psql console run the command "\i path/to/createDatabase.sql;", where "path/to/" is the path to this project root folder. If you have problems with the path name, consider changing the directories names or, better, just copy the createDatabase.sql file to another directory and run it from there. Also notice that the path may be wrong if you don't use the Unix style slash ("/").
        - Once you have successfully done this, it should create a database named andres-siri-alkemy-test, connect to it, create two tables (people and records) and make many (31) insertions for a fake user created for testing. This user email is "user@fake.test" and it's password is "123456".
        - If for some reason you can't install the createDataba.sql file, you can run the lines of that file in the psql console or use pgAdmin 4.

        </details>

        <details>

        <summary>Create them using pgAdmin 4</summary>

        1. Open the "pgAdmin 4" application (installed with the PostgreSQL server).
        2. Use the password you entered during the installation.
            ![enter installation password](/assets/README/postgre%20pgadmin/0.%20Enter%20installation%20password.png)
        3. Create a new database.
            ![create a new database](/assets/README/postgre%20pgadmin/1.%20Create%20Database.png)
        4. Name it "andres-siri-alkemy-test" or a name of your choice.
            ![create a new database menu](/assets/README/postgre%20pgadmin/2.%20Create%20Database%20menu.png)
        5. Create the first table.
            ![create first table](/assets/README/postgre%20pgadmin/3.%20Create%20first%20table.png)
        6. Name the first table as "people".
            ![name first table](/assets/README/postgre%20pgadmin/4.%20Name%20first%20table.png)
        7. Define "people" table columns.
            ![define first table](/assets/README/postgre%20pgadmin/5.%20Define%20first%20table.png)
        8. Set "email" column unique constraint.
            ![set email unique constraint name](/assets/README/postgre%20pgadmin/6.%20Set%20email%20unique%20constraint%201.png)
            ![set email unique constraint column](/assets/README/postgre%20pgadmin/7.%20Set%20email%20unique%20constraint%202.png)
        9. Create a second table.
            ![create a second table](/assets/README/postgre%20pgadmin/8.%20Create%20second%20table.png)
        10. Name second table as "records".
            ![name second table](/assets/README/postgre%20pgadmin/9.%20Name%20second%20table.png)
        11. Define "records" table columns.
            ![define second table](/assets/README/postgre%20pgadmin/10.%20Define%20second%20table.png)
        12. Set foreign constraint to the "user_uuid" column.
            ![set foreign key constraint name](/assets/README/postgre%20pgadmin/11.%20Set%20foreign%20key%20constraint%20to%20user_uuid%201.png)
            ![set foreign key constraint conditions](/assets/README/postgre%20pgadmin/12.%20Set%20foreign%20key%20constraint%20to%20user_uuid%202.png)
        13. Set operation_type column valid values.
            ![set operation_type constraint name](/assets/README/postgre%20pgadmin/13.%20Set%20operation_type%20valid%20values%201.png)
            ![set operation_type constraint conditions](/assets/README/postgre%20pgadmin/14.%20Set%20operation_type%20valid%20values%202.png)

        </details>

        </blockquote>

      </details>

  7. Create a .env file at the root directory with the following variables:

          NODE_ENV = development
          DB_NAME = < andres-siri-alkemy-test or your PostgreSQL database name >
          DB_USERNAME = < "postgres" (default) or your PostgreSQL user name >
          DB_PASSWORD = < your PostgreSQL password for previous username >
          JWT_SECRET = < whatever you want to use as JWT secret >
          MAILER_MAIL = < your **gmail** email address >
          MAIL_PASSWORD" = < the "application password" generated with google > (not your email password)


  TODO: explain more in detail what is JWT secret for and how to get application mail password. 

</details>
