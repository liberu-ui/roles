<template>
    <div class="columns is-centered">
        <div class="column is-half is-three-fifths-desktop is-full-touch">
            <div class="animated fadeIn"
                v-if="data">
                <checkbox-manager class="is-rounded has-margin-top-large"
                    :title="`${i18n('Permissions')}: ${data.role.display_name}`"
                    v-model="data.rolePermissions"
                    :items="data.permissions">
                    <template v-slot:item="{ item }">
                        <div class="level permission is-hoverable has-padding-medium is-mobile">
                            <div class="level-left">
                                <div class="level-item">
                                    <label class="checkbox">
                                        <input type="checkbox"
                                            :id="item.id"
                                            :value="item.id"
                                            v-model="data.rolePermissions">
                                        {{ item.description }}
                                    </label>
                                </div>
                            </div>
                            <div class="level-right">
                                <div class="level-item">
                                    <span class="tag is-small is-info is-bold has-margin-right-medium"
                                        v-if="item.is_default">
                                        {{ i18n('Default') }}
                                    </span>
                                    <span class="tag is-small is-bold"
                                        :class="cssClass(item)">
                                        {{ item.type }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </template>
                </checkbox-manager>
                <button class="button is-success has-margin-top-large is-pulled-right"
                    @click="update"
                    :disabled="!canAccess('system.roles.permissions.set')">
                    {{ i18n("Update") }}
                </button>
                <div class="is-clearfix"/>
            </div>
        </div>
    </div>
</template>

<script>
import permission from '@enso-ui/permissions/src/bulma/mixins/permission';
import { CheckboxManager } from '@enso-ui/checkbox/bulma';

export default {
    name: 'Configure',

    inject: ['canAccess', 'errorHandler', 'i18n', 'route'],

    components: { CheckboxManager },

    mixins: [permission],

    data: () => ({
        data: null,
    }),

    created() {
        this.fetch();
    },

    methods: {
        fetch() {
            axios.get(this.route('system.roles.permissions.get', this.$route.params.role))
                .then(({ data }) => (this.data = data))
                .catch(this.errorHandler);
        },
        update() {
            axios.post(
                this.route('system.roles.permissions.set', this.$route.params.role),
                { rolePermissions: this.data.rolePermissions },
            ).then(({ data }) => this.$toastr.success(data.message))
                .catch(this.errorHandler);
        },
    },
};
</script>

<style lang="scss">
    .level.permission .level-item {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
