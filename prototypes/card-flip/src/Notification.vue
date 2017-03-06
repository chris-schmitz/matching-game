<template>
    <div class='notification-container' :class="typeClass">
        <slot></slot>
    </div>
</template>

<script>
    module.exports = {
        props: ['type'],
        data(){
            return{}
        },
        computed: {
            typeClass(){
                return {
                    "success": this.type === 'success',
                    "warning": this.type === 'warning',
                    "error": this.type === 'error',
                    "info": this.type === 'info',
                }
            }
        }
    }
</script>

<style lang='scss' scoped>
    .notification-container{height: 50px; display: flex; justify-content: center; align-items: center; font-size: 20px;}

    .success{background-color: green; color: white;}
    .warning{background-color: yellow; color: black;}
    .error{background-color: red; color: white;}
    .info{background-color: blue; color: white;}
</style>