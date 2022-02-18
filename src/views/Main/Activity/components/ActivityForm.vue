<template>
    <div class="activity-form-view">
        <h1 class="font-600 text-center mb-10">Детальная страница</h1>

        <div class="row d-flex flex-wrap">
            <div class="row-4">
                <div class="form-group mb-10">
                    <label for="passport_ser" class="d-block font-600 mb-2">Паспорт серия</label>
                    <input
                        v-model="activityIdModel.passport_data"
                        type="text"
                        id="passport_ser"
                        class="form-group__input form-group__input-lg"
                        disabled
                    />
                </div>
            </div>

            <div class="row-4">
                <div class="form-group mb-10">
                    <label for="dob" class="d-block font-600 mb-2">Дата рождение</label>
                    <input
                        v-model="activityIdModel.dob"
                        type="text"
                        id="dob"
                        class="form-group__input form-group__input-lg"
                        disabled
                    />
                </div>
            </div>

            <div class="row-4">
                <div class="form-group mb-10">
                    <label for="result" class="d-block font-600 mb-2">Результат</label>
                    <input
                        v-model="activityIdModel.result"
                        type="text"
                        id="result"
                        class="form-group__input form-group__input-lg"
                        disabled
                    />
                </div>
            </div>

            <div class="row-4">
                <div class="form-group mb-10">
                    <label for="date_added" class="d-block font-600 mb-2">Дата добавление</label>
                    <input
                        type="text"
                        id="date_added"
                        class="form-group__input form-group__input-lg"
                        disabled
                        :value="activityIdModel.date_added.slice(0, 10)"
                    />
                </div>
            </div>

            <div class="row-4">
                <div class="form-group mb-10">
                    <label for="full_name" class="d-block font-600 mb-2">Имя сотрудника</label>
                    <input
                        v-model="activityIdModel.full_name"
                        type="text"
                        id="full_name"
                        class="form-group__input form-group__input-lg"
                        disabled
                    />
                </div>
            </div>
        </div>

        <div class="row d-flex flex-wrap">
            <div class="row-4">
                <div class="d-block font-600 mb-2">Фото</div>
                <template v-if="isLoaded">
                    <img :src="baseUrl + activityIdModel.image_str_base64" alt="">
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import $http from '@/plugins/axios'

export default {
    name: 'ActivityForm',
    data() {
        return {
            activityIdModel: {
                passport_data: "",
                dob: "",
                image_str_base64: "",
                date_added: "",
                result: "",
                full_name: ""
            },
            baseUrl: '',
            isLoaded: false
        }
    },
    mounted () {
        this.getOne()

        this.baseUrl = $http.defaults.baseURL
    },
    methods: {
        getOne() {
            this.$http.get(`/client/information/detail/${this.$route.params.id}/`)
            .then(({data}) => {
                this.activityIdModel = data

                this.isLoaded = true
            })
        }
    }
}
</script>

<style>

</style>
