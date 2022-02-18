<template>
    <div class="form-scan-view p-relative h-100 d-flex flex-column">
        <user-dropdown
            class="mr-4"
            style="justify-content: flex-end"
        />

        <div class="auth-view-container ma-auto">
            <form
                ref="formRef"
                class="form-view shadow-sm px-10 pt-12 pb-15 rounded"
            >
                <h3 class="font-600 text-center mb-7">Отправить форму пользователя</h3>

                <div class="form-group mb-10">
                    <label for="series" class="d-block font-600 mb-2">Паспортная серия</label>
                    <input
                        v-model="clientDataModel.passport_data"
                        v-mask="'AA#######'"
                        type="text"
                        id="series"
                        class="form-group__input form-group__input-lg"
                        placeholder="AAXXXXXXX"
                    />
                </div>

                <div class="form-group mb-10">
                    <label for="password" class="d-block font-600 mb-2">День рождения</label>
                    <input
	                    v-model="clientDataModel.dob"
	                    v-mask="'####-##-##'"
	                    type="text"
                        id="password"
                        class="form-group__input form-group__input-lg"
                        placeholder="YYYY-MM-DD"
                    />
                </div>

                <app-button
                    @emit:up="send"
                    text="Отправить"
                    :class="{'disabled': isDisabled}"
                />
            </form>
        </div>

        <template v-if="isLoading">
            <app-loader/>
        </template>
    </div>
</template>

<script>
import AppButton from '@/components/BaseComponents/Button'
import AppLoader from '@/components/BaseComponents/AppLoader'
import UserDropdown from '@/components/BaseComponents/UserDropdown'

export default {
    name: 'FormScan',
    components: {
        AppButton,
        AppLoader,
        UserDropdown
    },
    data () {
        return {
            clientDataModel: {
                passport_data: '',
                dob: '',
                image_str_base64: ''
            },
            isLoading: false,
            isDisabled: true
        }
    },
    watch: {
        clientDataModel: {
            handler (val) {
                const { passport_data, dob } = val

                if (passport_data.length < 9 || dob.length < 10) {
                    this.isDisabled = true

                    return
                }

                this.isDisabled = false
            },
            deep: true
        }
    },
    methods: {
        send () {
            this.clientDataModel.image_str_base64 = this.$store.state.base64Image

            if (!this.clientDataModel.image_str_base64) {
	            this.$toast.error('Ошибка сделайте снимок');

                return
            }

            this.isLoading = true

            this.$http.post('/client/information/', this.clientDataModel)
                .then(() => {
	                this.$toast.success('Все проверки успешно прошли');
                })
                .catch(({ data }) => {
	                this.$toast.error(data.detail);
                })
                .finally(() => {
                    this.isLoading = false

                    this.clientDataModel.passport_data = this.clientDataModel.dob = this.clientDataModel.image_str_base64 = ''
                })
        }
    }
}
</script>

<style>

</style>
