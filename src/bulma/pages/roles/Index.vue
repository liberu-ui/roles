<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="roles"
        @configure-role="$router.push({
            name: 'system.roles.configure',
            params: { role: $event.id },
        }).catch(routerErrorHandler)"
        @write-config-file="toastr.success($event.message)"/>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSave, faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { EnsoTable } from '@liberu-ui/tables/bulma';

library.add([faSave, faSlidersH]);

export default {
    name: 'Index',

    components: { EnsoTable },

    inject: ['routerErrorHandler', 'toastr'],
};
</script>
