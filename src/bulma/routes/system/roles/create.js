const RoleCreate = () => import('../../../pages/roles/Create.vue');

export default {
    name: 'system.roles.create',
    path: 'create',
    component: RoleCreate,
    meta: {
        breadcrumb: 'create',
        title: 'Create Role',
    },
};
