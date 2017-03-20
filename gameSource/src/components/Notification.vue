<template>
    <div class='notification-container'>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        data () {
            return {}
        }
    }
</script>

<style lang='scss' scoped>
    @import '../style/_colors';

    .notification-container{
        // This works, but it feels wrong, we're not basing our sizing on
        // the parent container, we're just making an arbitrary choice based
        // on what we (as humans) know about the rest of the app. If the parent
        // container ever changes this wouldn't adjust cleanly. Come back later
        // and fix this plz.
        position: absolute;
        top: 40px;
        left: 40px;
        right: 40px;
        top: 40px;
        background-color: $hotpink;
        padding:20px;
        border-radius: 5px 5px 0 0;
        box-shadow: 5px 5px 10px rgba($purple, .3);

        display: flex;
        justify-content: space-between;
    }
</style>
