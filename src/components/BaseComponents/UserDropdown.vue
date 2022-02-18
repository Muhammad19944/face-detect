<template>
    <div
        class="user-wrap d-flex align-center mt-3 mb-2 pointer p-relative"
        :class="{'user-wrap__column flex-column' : dropdownColumn}"
    >
        <div :class="{'mr-2 text-right' : !dropdownColumn, 'text-center order-1' : dropdownColumn}">
            <template v-if="getUser">
                <h6 class="font-600 text-dark mt-1">{{ getUser.first_name }} {{ getUser.last_name }}</h6>
            </template>
            <span class="text-grey d-block font-500 text-12">Пользователь</span>
        </div>
        <div class="user-wrap__image">
            <img
                src="/img/avatar.svg"
                alt="Avatar"
                class="w-100 h-100 img-contain"
            />
        </div>

        <template v-if="hasDropdown">
            <div class="user-wrap__dropdown shadow-sm border-all rounded">
                <router-link :to="{name: 'Activity'}" class="dropdown-items px-4 py-3 d-flex align-center text-decoration-none text-dark">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18px"
                        height="18px"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                    </svg>

                    <h6 class="font-500 ml-2">Список действий</h6>
                </router-link>

                <div @click="logout" class="dropdown-items px-4 py-3 d-flex align-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18px"
                        height="18px"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="icon-svg feather feather-log-out"
                    >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>

                    <h6 class="font-500 ml-2">Выйти</h6>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { removeAllTokens } from '@/services/TokenService'

export default {
    name: 'UserDropdown',
    props: {
        hasDropdown: {
            type: Boolean,
            default: true
        },
        dropdownColumn: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        ...mapGetters(['getUser'])
    },
    methods: {
        /*
        *
        * */
        logout() {
            if(!confirm('Вы действительно хотите выйти ?')) {
                return;
            }

            removeAllTokens();
            this.$router.push({ name: "AuthLayout" })
        }
    }
}
</script>

<style>

</style>
