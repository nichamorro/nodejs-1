//const express = require('express');
//const path = require('path');
//const indexRouter = require('./routes/index');
//
//const app = express();
//const PORT = 3000;
//
//// Serve static files from the "public" directory
//app.use(express.static(path.join(__dirname, 'public')));
//
//// Use the router for handling routes
//app.use('/', indexRouter);
//
//// Catch-all route for handling 404 errors
//app.use((req, res, next) => {
//    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
//});
//
//app.listen(PORT, () => {
//  console.log(`Server running at http://localhost:${PORT}/`);
//});

import express from 'express';
import path from 'path';
import passport from 'passport';
import session from 'express-session';
import morganBody from 'morgan-body';
import bodyParser from 'body-parser';
import flash from 'connect-flash';
import listEndpoints from 'express-list-endpoints';
import http from 'http';
//import { initSocket } from './socket.js'; // Asegúrate de la ruta correcta

//--import {PORT,sessionSecret } from './_UTILS/config.js';
//--import {mongodbConnection} from './_CONEXION_DB/mongodb.js';
//--//import {mysqlConnection} from './_CONEXION_DB/mysql.js';
//--//import {postgresqlConnection} from './_CONEXION_DB/postgresql.js';
//--
//--//-- importar rutas de entidades individuales -- /. ---
//--import inicioRouterViews from './AUTH/ROUTERS/inicio-VIEWS-V1.js';
//--import authRouterApis from './AUTH/ROUTERS/auth-APIS-V1.js';
//--import authRouterViews from './AUTH/ROUTERS/auth-VIEWS-V1.js';
//--
//--import userRouterApis from './USERS/ROUTERS/router-APIS-user-V1.js';
//--import userDescuentoAplicadoRouterApis from './USERS/ROUTERS/router-APIS-user-descuento-aplicado-V1.js';
//--import userNotificacionesRouterApis from './USERS/ROUTERS/router-APIS-user-notificacion-V1.js';
//--import userRecargasRouterApis from './USERS/ROUTERS/router-APIS-user-recarga-V1.js';
//--import userFavoritosRouterApis from './USERS/ROUTERS/router-APIS-user-favorito-V1.js';
//--import userCalificacionRouterApis from './USERS/ROUTERS/router-APIS-user-calificacion-V1.js';
//--import userComunicacionRouterApis from './USERS/ROUTERS/router-APIS-user-comunicacion-V1.js';
//--import usersRouterViews from './USERS/ROUTERS/router-VIEWS-user-V1.js';
//--
//--
//--import empresaRouterApis from './EMPRESAS/ROUTERS/router-APIS-empresa-V1.js';
//--import empresaDescuentoRouterApis from './EMPRESAS/ROUTERS/router-APIS-empresa-descuento-V1.js';
//--import empresaDescuentoAplicadoRouterApis from './EMPRESAS/ROUTERS/router-APIS-empresa-descuento-aplicado-V1.js';
//--import empresaColeccionUsuariosRouterApis from './EMPRESAS/ROUTERS/router-APIS-empresa-clientes-V1.js';
//--import empresaComunicacionRouterApis from './EMPRESAS/ROUTERS/router-APIS-empresa-comunicacion-V1.js';
//--import empresaSucursalRouterApis from './EMPRESAS/ROUTERS/router-APIS-empresa-sucursal-V1.js';
//--
//--import './EMPRESAS/_CRON-NODE/cronEliminarPublicidades.js';
//--
//--import empresasRouterViews from './EMPRESAS/ROUTERS/router-VIEWS-empresa-V1.js';

//import notificacionRouterApis from './USERS/ROUTERS/notificacion-router-APIS-V1.js';
//-- importar rutas de entidades individuales -- ./ ---
//--import inventarioRouterApis from './STOCK/ROUTERS/inventario-router-api.js';
//--import inventarioRouterViews from './STOCK/ROUTERS/inventario-router-views.js';

// middleware auth
//--import configurePassport from './_MIDDLEWARE/passport.js';

//configurePassport(passport);

const app = express();
const server = http.createServer(app);
//initSocket(server); // Inicializa Socket.IO

app.use(flash());
// EXPRESS SESSION MIDDLEWARE
let sessionSecret = "f8s09d8f09sdsdfsdf"
app.use(session({
  secret: sessionSecret,
  resave: true,
  saveUninitialized: true
}));

// Configura Passport
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
// Configurar el motor de plantillas EJS
app.set('view engine', 'ejs');
// Obtener la ruta absoluta del directorio principal del proyecto
const projectDir = path.resolve();
const __dirname = path.dirname(new URL(import.meta.url).pathname);
// Configurar middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Función para configurar las rutas de las vistas
const configureViews = (entities) => {
  const viewsPaths = entities.map(entity => path.join(projectDir, 'src', entity, 'VIEWS'));
  console.log('Paths de Vistas:', viewsPaths); // Verifica las rutas aquí
  app.set('views', viewsPaths);
};
// Configurar entidades y las rutas de las vistas para cada Lista de entidad
const entities = ['AUTH', 'USERS', 'EMPRESAS', '_ERRORES', 'STOCK'];
configureViews(entities);
// Configurar la carpeta de archivos estáticos (CSS, JavaScript, imágenes, etc.)
const publicPath = path.join(projectDir, 'public');

app.use(express.static(publicPath));
app.use(express.static(projectDir + '/node_modules/bootstrap'));
app.use(express.static(projectDir + '/node_modules/jquery'));
app.use(express.static(projectDir + '/node_modules/axios'));
app.use(express.static(projectDir + '/node_modules/bootstrap-icons'));

// Middleware para analizar el cuerpo de las solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// must parse body before morganBody as body will be logged
app.use(bodyParser.json());
// Configuración de morganBody con opciones

//-- uso de rutas -- /. --
//--app.use('/', inicioRouterViews);
//--
//--app.use('/auth', authRouterViews);
//--app.use('/v1/auth/api', authRouterApis);
//--
//--app.use('/usuarios', usersRouterViews);
//--app.use('/v1/usuarios/api', userRouterApis);
//--app.use('/v1/usuarios/descuento/aplicado/api', userDescuentoAplicadoRouterApis);
//--app.use('/v1/usuarios/notificaciones/api', userNotificacionesRouterApis);
//--app.use('/v1/usuarios/recargas/api', userRecargasRouterApis);
//--app.use('/v1/usuarios/comunicaciones/api', userComunicacionRouterApis);
//--
//--
//--app.use('/v1/usuarios/favoritos/api', userFavoritosRouterApis);
//--app.use('/v1/usuarios/calificacion/api', userCalificacionRouterApis);
//--
//--// Entidad empresa ---
//--app.use('/empresas', empresasRouterViews);
//--app.use('/v1/empresas/api', empresaRouterApis);
//--app.use('/v1/empresas/descuento/api', empresaDescuentoRouterApis);
//--app.use('/v1/empresas/descuento/aplicado/api', empresaDescuentoAplicadoRouterApis);
//--app.use('/v1/empresas/coleccion/usuarios/api', empresaColeccionUsuariosRouterApis);
//--
//--app.use('/v1/empresas/comunicaciones/api', empresaComunicacionRouterApis);
//--
//--app.use('/v1/empresas/sucursales/api', empresaSucursalRouterApis);
//--
//--app.use('/inventario', inventarioRouterViews);
//--app.use('/v1/inventario/api', inventarioRouterApis);

//app.use('/v1/notificaciones/api', notificacionRouterApis);

// Ruta para manejar el webhook
app.post('/v1/api/webhook', (req, res) => {
  const { data } = req.body; // Obtiene la información del cuerpo de la solicitud

  // Verificar el estado del pago
  const paymentStatus = data.status;

  // Lógica para manejar el estado del pago
  switch (paymentStatus) {
    case 'approved':
      // Aquí manejas lo que sucede cuando el pago es aprobado
      console.log('Pago aprobado:', data);
      // Actualiza el estado de la transacción en tu base de datos, por ejemplo
      break;
    case 'pending':
      // Manejar pagos pendientes
      console.log('Pago pendiente:', data);
      break;
    case 'rejected':
      // Manejar pagos rechazados
      console.log('Pago rechazado:', data);
      break;
    // Agrega más estados si es necesario
    default:
      console.log('Estado desconocido:', paymentStatus);
  }
  // Responder a Mercado Pago
  res.sendStatus(200); // Responde con un 200 OK
});

app.get('/confirmacion-pago', (req, res) => {
  let user = []
  res.send('Confirmar pago con wompi', user);
});

//
//app.post('/webhook-mercado-pago', async (req, res) => {
//  const { data } = req.body; // Obtén los datos de la notificación
//  if (data) {
//      const paymentId = data.id; // ID del pago
//      const paymentStatus = data.status; // Estado del pago
//      // Actualiza el estado del pago en tu base de datos
//      console.log(`Pago ID: ${paymentId}, Estado: ${paymentStatus}`);
//  }
//  res.status(200).send('Webhook recibido');
//});

//-- uso de rutas -- ./ --
// GLOBAL VARIABLES
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
})

app.use((req, res, next) => {
  let body = "500-acceso";
  let page = "error";
  let user = req.user ? req.user : [];
  // Verificar si el usuario está autenticado
  if (req.user) {
    // Si está autenticado, renderizar la vista de error estándar
    res.render("index", { body, page, user });
  } else {
    // Si no está autenticado, renderizar la vista pública de error
    res.render("index-publico-error-500", { body, page: 'error' });
  }
});

if (process.env.NODE_ENV == "production") {
  app.use((req, res, next) => {
    let body = "500-acceso";
    let page = "error";
    let user = req.user ? req.user : [];
    // Verificar si el usuario está autenticado
    if (req.user) {
      // Si está autenticado, renderizar la vista de error estándar
      res.render("index", { body, page, user });
    } else {
      // Si no está autenticado, renderizar la vista pública de error
      res.render("index-publico-error-500", { body, page: 'error' });
    }
  });
}

//#################r-- routers de testing /. --#########################
if(process.env.NODE_ENV=="dev"){
  // ---  uso de peticiones http response test ---- /. ---
  /**
   * maxBodyLength: Define la longitud máxima del cuerpo que se mostrará
   */
  morganBody(app, {maxBodyLength: 300});
  /**
   * Observar las apis en un json
   */
  app.get('/v1/apis', (req, res) => {
    const routes = listEndpoints(req.app);
    res.json(routes);
  });
  

  //--// ---  uso de swaggerRouters.js ---- /. ---
  //--app.use(swaggerRouter);
  //--// ---  uso de swaggerRouters.js ---- ./ ---
  //--// ---  uso de routersAllApisRest.js ---- /. ---
  //--app.use('/apis', controlApisRestRouter);
  //--// ---  uso de routersAllApisRest.js ---- ./ ---
  //--// ---  uso de testfaker.js ---- /. ---
  //--/**
  //-- * testfaker/:schema
  //-- * :schema = todos o uno a uno ["users","actividades","proyectos"]
  //-- * Ejemplo localhost:${POST}/testfaker/users
  //-- * Uso practico para testfaker generador de datos en la base de datos,
  //-- * todos, genera datoas a todas los modelos existentes. 
  //-- */
  //--app.use('/testfaker', controlApisRestFakersRouter);
  //--// ---  uso de testfaker.js ---- ./ ---
  //--//#################r-- routers de testing ./ --#########################
}
//#################r-- routers de testing /. --#########################
//app.listen(PORT, () => {
//  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
//});
let PORT = 3000
// Iniciar servidor
server.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});

export default app;