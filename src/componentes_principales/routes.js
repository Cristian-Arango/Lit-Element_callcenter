// Importa LitElement y el componente de router de Vaadin
import { LitElement, html } from 'lit-element';
import { Router } from '@vaadin/router';

// Importa los componentes que quieres usar en las rutas
import '../componentes_principales/login-component.js';
import '../componentes_principales/pague2-component.js';
import '../componentes_principales/pague3-component.js';
import '../cOMPONENTES_SECUNDARIOS/cam.js'
import '../cOMPONENTES_SECUNDARIOS/equipos.js'
// import './equipos-component.js';

// Define las rutas y sus componentes correspondientes
const routes = [
  {
    path: '/',
    component: 'login-component', // Componente para la ruta principal
  },
  {
    path: '/COMPONENTE2',
    component: 'pague2-component',
  },
  {
    path: '/COMPONENTE3',
    component: 'pague3-component',
  },
  {
    path: '/CAMPANA',
    component: 'campana-component',
  },
  {
    path: '/EQUIPOS',
    component: 'equipos-component',
  },
];

// Función para inicializar el enrutador y definir las rutas
const initRouter = () => {
  const outlet = document.getElementById('outlet');
  const router = new Router(outlet);
  router.setRoutes(routes);
};

// Ejecuta la inicialización del enrutador después de que se cargue el documento
document.addEventListener('DOMContentLoaded', initRouter);
