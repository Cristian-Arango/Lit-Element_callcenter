import { Router } from '@vaadin/router';
import './login-component.js'; // Import the Login component
import './pague2-component.js'; // Import the Apartado1 component
import './routes.js'
import '../cOMPONENTES_SECUNDARIOS/cam.js'
import '../cOMPONENTES_SECUNDARIOS/equipos.js'



const routes = [
  {
    path: '/',
    component: 'login-component', // Use the correct component name
  },
  {
    path: '/COMPONENTE2',
    component: 'pague2-component', // Use the correct component name
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

const outlet = document.getElementById('outlet');
const router = new Router(outlet);
router.setRoutes(routes);