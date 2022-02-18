<template>
	<div class="app-main-layout">
		<div class="app-main h-100">
            <router-view class="app-router-view"/>
		</div>
	</div>
</template>

<script>
import $http from '@/plugins/axios'

export default {
	name: 'MainLayout',
	components: {
	},
	data() {
		return {};
	},
    mounted () {
        this.getUser()

        // document.addEventListener("visibilitychange", function() {
        //     console.log( document.hidden );
        // });
    },
    methods: {
        getUser() {
            $http.get('/my/profile/')
            .then(({ data }) => {
                this.$store.state.userInformation = data
            })
        }
	},
};
</script>

<style>
.app-main-layout {
	background: #fff;
	min-height: 100vh;
}

.app-router-view {
	/*height: calc(var(--vh, 1vh) * 100);*/
	/*overflow-y: auto;*/
	/*overflow-x: hidden;*/
}
</style>
