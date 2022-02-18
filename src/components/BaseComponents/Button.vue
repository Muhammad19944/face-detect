<template>
    <button
        @click.prevent="$emit('emit:up')"
        type="submit"
        class="btn btn-lg btn-primary w-100 font-600"
    >
        {{ text }}
    </button>
</template>

<script>
export default {
    name: 'Button',
    props: {
        text: {
            type: String,
            default: 'Войти'
        }
    }
}
</script>

<style>
.btn.btn-primary {
    color: #fff;
    background-color: #009ef7;
    outline: 0;
    border: 0;
    cursor: pointer;
    font-size: 16px;
    border-radius: .475rem;
    transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
    text-align: center;
    vertical-align: middle;
    display: inline-block;
    font-weight: 500;
    line-height: 1.5;
    letter-spacing: .03rem;
}

.btn:focus, .btn:hover {
    background-color: #0095e8;
}

.btn-lg {
    padding: calc(.825rem + 1px) calc(1.75rem + 1px);
}

.btn.btn-primary.disabled {
    background: #ccc;
    cursor: not-allowed
}
</style>
