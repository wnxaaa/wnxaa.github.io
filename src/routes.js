import ContentView from './pages/ContentView.vue';
import MenuView from './pages/MenuView.vue';

const routes = [
    { path: '/', component: MenuView },
    { path: '/:page', component: ContentView },
];

export default routes;