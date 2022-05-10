
# Spends Checker alkemy-full-stack

<details>

  <summary>Español</summary>

  Una aplicación para administración de presupuesto personal, donde puedes guardar con detalle tus ingresos y egresos de dinero y ver un balance de tus operaciones registradas. También puedes tener una mejor organización de ellas clasificándolas por concepto, tipo y categoría.

  ## Motivación para el proyecto

  Este es un proyecto desarrollado para el [desafío Full Stack JS](https://drive.google.com/file/d/1LUY2tZ_OhShoSE2g9cYGGKM1ioFj0MhE/view?usp=sharing) de la aceleración de [Alkemy](https://www.alkemy.org/). Tomé como un reto personal el realizarlo en el menor tiempo posible con una deadline de diez días y aplicar el nuevo conocimiento adquirido en PostgreSQL, Sequelize, Redux Toolkit y Material UI, reforzando la práctica de React.

  ## Estado actual

  El proyecto se encuentra terminado en su mayor parte. En lo relativo a la consigna a cumplir, sólo resta crear un observer que restrinja el renderizado de los registros a diez y únicamente muestre los restantes si el usuario así lo solicita. Además, aunque el diseño que responda a los distintos tamaños de pantalla funciona, se lo ve bastante pobre, debiendo revisar puntos claves para una mejor experiencia del usuario. Por otro lado, personalmente considero de importancia agregar algunas funcionalidades extra. Aunque la aplicación es sencilla, resulta básico el permitir agregar y quitar opciones a los filtros a gusto, la posibilidad de acotar los registros a fechas determinadas y que el usuario pueda disponer de otra suma resultante de los filtros aplicados. Considerando el código, algunos componentes aún pueden ser modularizados de mejor manera.

  ## Instalación

  Para instalar esta aplicación y probarla en desarrollo necesitas tener instaladas en tu computadora versiones actualizadas de Node.js, NPM y Git para poder:

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

        <summary><strong>Recomendado</strong>: correr el archivo createDatabase.sql provisto en este repositorio.</summary>

        - Conectar a la consola "SQL shell (psql)" (instalada al instalar el servidor PostgreSQL). Los valores por defecto para la conexión son:

            - para Server: "localhost".
            - para Database: "postgres".
            - para Port: "5432".
            - para Username: "postgres".

        Inmediatamente después de ingresar el nombre de usuario (Username), se debe ingresar la contraseña para ese usuario. Para el usuario por defecto (postgres), es la contraseña que se ingresó durante la instalación.
        - Ya en la consola psql correr el comando "\i ruta/a/createDatabase.sql;", donde "ruta/a/" es la ruta al directorio raíz del proyecto. En caso de tener problemas con el nombre de la ruta, considerar cambiar el nombre de los directorios, o mejor aún, simplemente copiar el archivo createDatabase.sql a otro directorio y correrlo desde ahí. También considerar que la ruta puede fallar si no se usa el estilo de barra Unix ("/").
        - Una vez realizado lo anterior con éxito, el proceso debería crear una base de datos llamada andres-siri-alkemy-test, conectarse a ella, crear dos tablas (people y records) y hacer varias (31) inserciones para un usuario falso provisto para probar la aplicación. El email de este usuario es "user@fake.test" y su contraseña es "123456".
        - Si por algún motivo no es posible instalar el archivo createDataba.sql, se puede correr las líneas del archivo en la consola psql o usar pgAdmin 4.

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
          MAILER_MAIL = < tu dirección de email de <strong>gmail</strong> >
          MAIL_PASSWORD" = < tu "contraseña de aplicación" generada desde google" > (no es la constraseña de tu email)

      <details>

      <summary>Cómo generar una contraseña de aplicación en Google</summary>

      Para generar una nueva contraseña de aplicación seguir los siguientes pasos:

      1. En una nueva pestaña de Chrome ir a "Gestionar tu cuenta de Google".

          ![gestionar tu cuenta de google](/assets/README/gmail%20application%20password/1.%20Gestionar%20tu%20cuenta%20de%20Google.png)

      2. Ir a "Iniciar sesión en Google" en la sección de "Seguridad" y clickear en "Contraseñas de aplicaciones". Notar que es necesario tener la verificación en dos pasos activada para poder hacer esto.

          ![ir a contraseñas de aplicaciones](/assets/README/gmail%20application%20password/2.%20Ir%20a%20contrase%C3%B1as%20de%20aplicaciones.png)

      3. Crear una nueva constraseña de aplicación, el nombre es indistinto.

          ![crear una nueva constraseña de aplicación](/assets/README/gmail%20application%20password/3.%20Crear%20una%20nueva%20contrase%C3%B1a%20de%20aplicaci%C3%B3n.png)

      4. Obtener la nueva contraseña de aplicación creada.

          ![obtener la nueva contraseña de aplicación](/assets/README/gmail%20application%20password/4.%20Obtener%20la%20constrase%C3%B1a%20de%20aplicaci%C3%B3n.png)

      </details>

  8. Finalmente, para correr el cliente en el puerto 3000 usar el comando "npm run client" en el directorio raíz, y para el servidor en el puerto 8080 usar el comando "npm run server", también en el directorio raíz.

  ## Documentación de la API

  La API que brinda el servidor, creada para la aplicación, está [documentada y publicada con Postman](https://documenter.getpostman.com/view/16003276/Uyxeonsr). Ahí puedes cargar y correr la API en postman directamente o usar postman en el navegador, utilizando el botón que dice "Run in Postman" ubicado en la esquina superior derecha de la ventana.

  ![API postman documentation](/assets/README/API/API%20postman%20documentation.png)

  ## Organización del código
  
  El código está organizado en archivos y directorios teniendo en cuenta la separación de intereses lo más posible. De esta manera los archivos tratan de ser lo más concisos que puedan y hacerse cargo de una sola acción de ser posible, incluso dando como resultado un archivo realmente corto, como algunos controladores en el directorio backend. Pero algunos de ellos deben agrupar varias acciones para encapsular una funcionalidad o una lógica, incluso si resultan en un archivo realmente largo, como los "slices" para el manejo de estados. Dicho esto, la mayor parte de la estructura y los nombres de los directorios en frontend siguen lo que es dado al usar "create-react-app" y el paquete "react-redux" que incluye Redux Toolkit.

</details>

<details>

  <summary>English</summary>

  An app for personal budget administration, where you can save your money incomes and outcomes with detail and see a balance of your registered operations. You can also get a better organization sorting them by concept, type and category.

  ## Motivation for the project

  This is a project developed for the [Full Stack Challenge JS](https://drive.google.com/file/d/1LUY2tZ_OhShoSE2g9cYGGKM1ioFj0MhE/view?usp=sharing) of [Alkemy's](https://www.alkemy.org/) acceleration. I took it as a personal defiance making it in the lesser time possible with a ten days deadline and apply the recently acquired knowledge of PostgreSQL, Sequelize, Redux Toolkit and Material UI, strengthening the React practice.

  ## Build status

  The project is mostly finished. In relation to the assignment to fulfill, it's just missing the creation of an observer that restricts the records rendering to ten and just shows the rest of them if the user requires to do so. Furthermore, besides the design is responsive, it seems pretty poor, so it's important to check some breakpoints for a better user experience. On the other hand, I personally think that it is important to incorporate some functionalities, like allow adding or deleting options to the filters as pleased, the possibility to delimit the records to certain dates and that the user can have another addition after filters are applied. Regarding the code, some components may be modularized in a better way.

  ## Installation
  
  To install this app for development mode testing you need to have installed in your computer updated versions of Node.js, NPM and Git in order to follow this steps:

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
          JWT_SECRET = < whatever you want, to use as JWT secret >
          MAILER_MAIL = < your <strong>gmail</strong> email address >
          MAIL_PASSWORD" = < the "application password" generated with google > (not your email password)

      <details>

      <summary>How to generate application password</summary>

      To generate a new application password follow the next steps:

      1. In a new Chrome tab go to "Manage your Google Account".

          ![go to Manage your Google Account](/assets/README/gmail%20application%20password/1.%20Manage%20your%20google%20account.png)

      2. Go to "Signing in to Google" in the "Security" section and click into "App passwords". Notice you must have your 2-Step Verification activated in order to do this.

          ![go to app passwords](/assets/README/gmail%20application%20password/2.%20Go%20to%20app%20passwords.png)

      3. Create a new application password, you can name it as you want.

          ![create a new application password](/assets/README/gmail%20application%20password/3.%20Create%20a%20new%20application%20password.png)

      4. Get the new password created.

          ![get the new password](/assets/README/gmail%20application%20password/4.%20Get%20the%20new%20password.png)

      </details>

  8. Finally, to run the client at port 3000 use "npm run client" command at root directory, and for the server at port 8080 use "npm run server" command, also at root directory.

  ## API documentation

  The API that provides the server, created for the application, is [documented and published with Postman](https://documenter.getpostman.com/view/16003276/Uyxeonsr). There you can load and run the API in postman directly or use postman in the web browser, using the button that says "Run in Postman" located in the right superior corner of the window.

  ![API postman documentation](/assets/README/API/API%20postman%20documentation.png)

  ## Code arrangement
  
  The code is arranged in files and directories taking in consideration the separation of concerns the most possible. In that way files try to be the more consice they can be and take care of just one action if possible, even giving as result really short files, like some controllers at the backend directory. But some of them must group many actions to encapsulate a functionality or a logic, even if it results in a really large file, like the states management slices. With that said, most of the structure and directories names at frontend follow what is given by using "create-react-app" and "react-redux" package that includes Redux Toolkit.

  ## Technologies used

  This section lists technologies or frameworks that have been used to do the project, with a brief description and the reason or intention of using them.

  <details>

  <summary>Node JS</summary>

  [Node.js](https://nodejs.org/) is an asynchronous event-driven JavaScript runtime built on [Chrome's V8 JavaScript engine](https://v8.dev/) designed to build scalable network applications. Of course Node.js has many pros and cons compared with other copeting languages and frameworks, but the main reasons that explain why I chose it for this small project are, first, because of the "Javascript everywhere" advantage, as Node.js supports JavaScript both client-side and server-side, and second, the vast libraries repository you can access with the Node Package Manager.

  </details>

  <details>

  <summary>Express</summary>

  [Express](https://expressjs.com/) is a fast, unopinionated and minimalist web framework for Node.js that provides a robust set of features. The main reason I chose it is because, without adding many restrictions, it makes much more clear and easier to control requests and responses and to design routes with, as it says in it's official site, "a myriad of HTTP utility methods and middleware at your disposal".

  </details>
  
  <details>

  <summary>PostgreSQL</summary>

  [PostgreSQL](https://www.postgresql.org/) is a powerful object-relational database system. As it was required a relational database in the challenge I chose it, but one of the reasons for this decision over choosing other relational databases is that it is open-source with over 30 years of active and there is a wealth of information to be found describing how to install and use it through the official documentation. Other important reason is that some features, like create, update or delete, in my opinion, have better feedback or information returned after the action is done.

  </details>

  <details>

  <summary>Sequelize</summary>

  [Sequelize](https://sequelize.org/) is a modern TypeScript and Node.js Object Relational Mapping tool for PostgresSQL and more relational SQL databases. As an ORM Sequelize allows me to access the database using the object-oriented logic with Javascript, a great advantage considering I was required that my server URLS should return JSON data. 

  </details>

  <details>

  <summary>Json Web Token</summary>

  [JSON Web Token (JWT)](https://jwt.io/) is an open standard ([RFC 7519](https://datatracker.ietf.org/doc/html/rfc7519)) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret or a public/private key pair. I chose this to use for my authorization and authentication methods as it results in a pretty simple way of doing it, and having used [Passport](https://www.passportjs.org/) before, I wanted to learn something else. I found it better as it has less restrictions, besides Passport provides a middleware built on that I had to develop instead.

  </details>

  <details>

  <summary>React JS</summary>

  [React](https://reactjs.org/) is an efficient, declarative, and flexible open-source JavaScript library for building simple, fast, and scalable user interfaces for frontends of web applications. It uses JSX which is basic JavaScript that allows HTML quoting, what facilitates developing components. As I have chosen to first learn React in my path, I decided to use it again for this project to learn more about it and gain experience. I chose React because it had been recommended to me and I agree that it is easier to learn and use at start and has a giant potencial when learned in depth, it has a strong community support and is widely used in the IT market, with other technological advantages as fast rendering.

  </details>

  <details>

  <summary>Redux - Redux Toolkit</summary>

  [Redux](https://redux.js.org/) is a Predictable State Container for Javascript Apps that helps managing state and write applications that behave consistently. [Redux Toolkit](https://redux-toolkit.js.org/) is the official, opinionated, batteries-included toolset for efficient Redux development, built over Redux but with much more advantages. I decided to use them with the intention of learning more technologies, I knew Redux but never used it properly in a project before, it always seemed easier and a better option to use React context. But knowing about Redux Toolkit made me wanna try it, and I found out a fantastic technology. Still having a lot to learn, I found that it is great for managing queries to APIs with createAsyncThunk and a great way to boost the separation of concerns creating slices to manage the state.

  </details>

  <details>

  <summary>Material UI</summary>

  [Material UI](https://mui.com/) is an open-source project that features React components that implement Google's Material Design. I was decided to start my journey with frontend css frameworks and I was going to build a small and simple React application, so in that situation I was attracted to use Material UI, putting a pin in [Bootstrap](https://getbootstrap.com/) to learn it later. I also tried to take advantage of the material design default colors pallette.

  </details>

  <details>

  <summary>Extra libraries</summary>

  - [bcryptjs](https://www.npmjs.com/package/bcryptjs): it is a library that helps hash passwords, for a better security.
  - [express-session](https://www.npmjs.com/package/express-session): helps create a session middleware, that I needed to store the code and the email address for user identity verification process.
  - [express-async-handler](https://www.npmjs.com/package/express-async-handler): Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers, which I used also because it results in a much cleaner code.
  - [nodemailer](https://nodemailer.com/about/): is a module for Node.js applications to allow easy as cake email sending.
  - [axios](https://axios-http.com/): is a promise-based HTTP Client for node.js and the browser, not that I really needed it, just trying to change from fetch and learn axios too.
  - [material-react-toastify](https://www.npmjs.com/package/material-react-toastify): it allows you to add notification snackbars to your app with ease, and it has been made in compliance with Material.io design spec-sheet.
  - [react-router-dom](https://v5.reactrouter.com/): is the standard routing library for React, it keeps your UI in sync with the URL and has a collection of navigational components.
  - [react-beforeunload](https://www.npmjs.com/package/react-beforeunload): React component and hook which listens to the beforeunload window event.

  </details>

</details>
