import Vue from "vue"
import axios from 'axios'
import router from '../router'
import store from '../store'
import { removeAllTokens, token } from '@/services/TokenService'
import { LANG, URL_BASE } from '@/defaults'

const $http = axios.create({
    baseURL: URL_BASE,
    headers: {
        common: {
            'X-Requested-With': 'XMLHttpRequest',
        },
    },
});

$http.interceptors.request.use(config => {

    config.headers['Accept-Language'] = localStorage.getItem('lang') ? localStorage.getItem('lang') : LANG;

    if (token.get()) {
        config.headers.Authorization = 'token ' + token.get();
    }


    return config;
}, error => Promise.reject(error));


$http.interceptors.response.use(response => response, error => {

    if (error.response.status === 401) {
        removeAllTokens();
        store.state.userProfile = {};
        store.state.permissionList = [];
        router.push({ name: 'Login' });
    }

    // notification.error(error.response.data.error.message);


    return Promise.reject(error.response);
});

Vue.prototype.$http = $http

export default $http
