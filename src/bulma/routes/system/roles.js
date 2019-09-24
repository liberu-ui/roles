import routeImporter from '@enso-ui/ui/src/modules/importers/routeImporter';

const routes = routeImporter(require.context('./roles', false, /.*\.js$/));
const Router = () => import('@enso-ui/ui/src/bulma/pages/Router.vue');


export default {
    path: 'roles',
    component: Router,
    meta: {
        breadcrumb: 'roles',
        route: 'system.roles.index',
    },
    children: routes,
};
