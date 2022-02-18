<template>
	<div class="auth-wrapper d-flex flex-wrap">
        <div class="auth-aside d-flex flex-column">
            <div class="d-flex flex-column text-center pt-16">
                <a href="https://asakabank.uz/" target="_blank" class="d-block py-5">
                    <img src="@/assets/img/asaka-logo.svg" alt="Logo" style="height: 125px">
                </a>

                <h2 class="font-600 mb-5" style="color: #986923">Сервис для распознавание лиц</h2>
            </div>

            <div class="mt-auto px-7">
                <img src="@/assets/img/auth-corner.png" alt="Corner image">
            </div>
        </div>
        <div class="auth-route pa-16">
            <router-view/>
        </div>
	</div>
</template>

<script>
export default {
	name: 'AuthLayout',
};
</script>

<style>
.auth-wrapper {
    min-height: 100vh;
}

.auth-aside {
    max-width: 600px;
    width: 100%;
    background-color: #F2C98A;
}

.auth-route {
    flex: 1 1;
}
</style>
