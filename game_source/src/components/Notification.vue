<template>
    <div class='notification-container' :class="typeStyle">
        <h2 v-text="message"></h2>
        <slot name="closeButton"></slot>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        data () {
            return {}
        },
        computed: {
            ...mapState('notification', {
                message: 'message',
                type: 'type'
            }),
            typeStyle () {
                return {
                    'success': this.type === 'success',
                    'info': this.type === 'info',
                    'warning': this.type === 'warning',
                    'error': this.type === 'error'
                }
            }
        }
        // methods: {
        //     clearNotification () {
        //         this.$store.dispatch('notification/clearNotification')
        //     }
        // }
    }
</script>

<style lang='scss' scoped>
    @import '../style/colors';
    @import '../style/mixins';

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
        border-radius: 5px;
        box-shadow: 5px 5px 10px rgba($purple, .3);

        display: flex;
        justify-content: space-between;
        align-items: center;

        &.success {
            @include notificationBarColor ($lightGreen, $purple);
            // background-color: $lightGreen;
        }
        &.info {
            @include notificationBarColor ($blue, $purple);
        }
        &.warning {
            @include notificationBarColor ($yellow, $purple);
        }
        &.error {
            @include notificationBarColor ($lightRed);
        }
    }
</style>
