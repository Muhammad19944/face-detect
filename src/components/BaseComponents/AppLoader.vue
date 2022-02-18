<template>
    <div class="app-loader-wrap d-flex align-center justify-center p-fixed w-100 h-100">
        <div class="loader-width progress-circular progress-circular--indeterminate p-relative">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="22.857142857142858 22.857142857142858 45.714285714285715 45.714285714285715"
                class="p-absolute w-100 h-100 ma-auto"
                style="transform: rotate(0deg);"
            >
                <circle
                    fill="transparent"
                    cx="45.714285714285715"
                    cy="45.714285714285715"
                    r="20"
                    stroke-width="5.714285714285714"
                    stroke-dasharray="125.664"
                    stroke-dashoffset="125.66370614359172px"
                    class="progress-circular__overlay"
                ></circle>
            </svg>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AppLoader'
}
</script>

<style>
.app-loader-wrap {
    top: 0;
    left: 0;
    z-index: 99;
    background: rgb(255 255 255 / 75%);
}

.app-loader-wrap .loader-width {
    width: 32px;
    height: 32px;
}

.progress-circular > svg {
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 0;
}

.progress-circular--indeterminate > svg {
    animation: progress-circular-rotate 1.4s linear infinite;
    transform-origin: center center;
    transition: all .2s ease-in-out;
}

.progress-circular--indeterminate .progress-circular__overlay {
    animation: progress-circular-dash 1.4s ease-in-out infinite;
    stroke-linecap: round;
    stroke-dasharray: 80,200;
    stroke-dashoffset: 0;
    color: #009ef7 !important;
    caret-color: #009ef7 !important;
}

.progress-circular__overlay {
    stroke: currentColor;
    z-index: 2;
    transition: all .6s ease-in-out;
}

@-webkit-keyframes progress-circular-dash {
    0% {
        stroke-dasharray: 1,200;
        stroke-dashoffset: 0
    }

    50% {
        stroke-dasharray: 100,200;
        stroke-dashoffset: -15px
    }

    to {
        stroke-dasharray: 100,200;
        stroke-dashoffset: -124px
    }
}

@keyframes progress-circular-dash {
    0% {
        stroke-dasharray: 1,200;
        stroke-dashoffset: 0
    }

    50% {
        stroke-dasharray: 100,200;
        stroke-dashoffset: -15px
    }

    to {
        stroke-dasharray: 100,200;
        stroke-dashoffset: -124px
    }
}
</style>
