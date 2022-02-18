<template>
	<div class="scan-wrap d-flex">
		<div class="face-detect">
			<face-detect />
		</div>
		<div class="form-scan">
			<form-scan />
		</div>
	</div>
</template>

<script>
import FaceDetect from '@/views/Main/Scan/components/FaceDetect'
import FormScan from '@/views/Main/Scan/components/FormScan'

export default {
	name: 'index',
	components: {
		FaceDetect,
		FormScan
	}
}
</script>

<style>
.face-detect {
	width: 60vw;
}

.form-scan {
	width: 40vw;
	background: #fff;
}
</style>
