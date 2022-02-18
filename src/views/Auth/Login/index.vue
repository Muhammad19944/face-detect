<template>
    <div class="login-view h-100 d-flex">
        <div class="auth-view-container ma-auto">
            <form class="form-view shadow-sm px-10 pt-12 pb-15 rounded">
                <h3 class="font-600 text-center mb-7">Войти в систему</h3>

                <div class="form-group mb-10">
                    <label for="email" class="d-block font-600 mb-2">Имя пользователя</label>
                    <input
                        v-model="userModel.username"
                        type="text"
                        id="email"
                        class="form-group__input form-group__input-lg"
                        placeholder="Имя пользователя..."
                    />
                </div>

                <div class="form-group mb-10">
                    <div class="d-flex align-center justify-space-between mb-2">
                        <label for="password" class="d-block font-600">Пароль</label>
<!--                        <router-link :to="{name: 'ForgetPassword'}" class="text-decoration-none text-primary font-600">Forget password ?</router-link>-->
                    </div>
                    <input
                        v-model="userModel.password"
                        type="password"
                        id="password"
                        class="form-group__input form-group__input-lg"
                        placeholder="Пароль..."
                    />
                </div>

                <app-button @emit:up="login" />
            </form>
        </div>
    </div>
</template>

<script>
import { token } from '@/services/TokenService'
import AppButton from '@/components/BaseComponents/Button'

export default {
    name: 'index',
    components: {
        AppButton
    },
    data() {
        return {
            userModel: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        /**
         *
         * */
        login() {
	        this.$http.post('/login/', this.userModel)
            .then(({ data }) => {
                token.save(data.token)
                this.$router.push({name: 'FaceDetect'})

                this.$store.state.userInformation = data.user
            })
            .catch((err) => {
                err.data.forEach(error => {
	                this.$toast.error(error);
                })
            })
        }
    }
}
</script>

<style>
</style>
