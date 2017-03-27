<template>
    <div class='modal-window-container'>
        <div class="message-window">
            <div class="message">
                <slot name="message">
                </slot>
            </div>

            <div class="capture-input">
                <slot name="captureInput"></slot>
            </div>

            <div class="buttons">
                <slot name="cancel"></slot>
                <slot name="confirm"></slot>
            </div>
        </div>
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

    .modal-window-container{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba($black, .5);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .message-window {
        border-radius: 5px;
        box-shadow: 20px 20px 112px -20px rgba($purple, .5);
        padding:20px;
        background-color: $white;
        min-height: 200px;
        min-width: 500px;
        height: 30vh;
        width: 40vw;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        > * {
            margin: 5px;
        }

        .message {
            flex: 1;
            background-color: rgba($green, .05);
            font-size: 25px;
            border-radius: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .capture-input {
            input {
                padding: 5px;
                font-size: 20px;
                text-align: center;
            }
        }

        .buttons {
            padding:10px;
            display: flex;
            justify-content: space-around;
        }
    }
</style>
