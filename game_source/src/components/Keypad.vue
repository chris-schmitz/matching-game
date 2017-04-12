<template>
    <div class="background" @click="close">
        <div class='keypad-container' @click.stop>
            <h3>Input for: <b>{{selectedInputName}}</b></h3>
            <p>
                {{selectedInputValue}}
            </p>
            <div>
                <button @click="append(1)">1</button>
                <button @click="append(2)">2</button>
                <button @click="append(3)">3</button>
            </div>
            <div>
                <button @click="append(4)">4</button>
                <button @click="append(5)">5</button>
                <button @click="append(6)">6</button>
            </div>
            <div>
                <button @click="append(7)">7</button>
                <button @click="append(8)">8</button>
                <button @click="append(9)">9</button>
            </div>
            <div>
                <button @click="append(0)">0</button>
                <button @click="backspace()" class="backspace"><span class="fa fa-minus"></span></button>
            </div>
            <div>
                <button @click="close()"><span class="fa fa-check"></span></button>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        data () {
            return {

            }
        },
        computed: {
            ...mapGetters('keypad', ['selectedInputValue', 'selectedInputName'])
        },
        methods: {
            ...mapActions('keypad', [
                'append',
                'backspace',
                'close'
            ])
        }
    }
</script>

<style lang='scss' scoped>
    @import '../style/colors';
    @import '../style/mixins';

    .background {
        background-color: rgba($black, .5);
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .keypad-container{
        background: $hotpink;
        border: 1px solid darken($hotpink, 10%);
        padding: 20px;
        display: flex;
        align-items: center;
        flex-direction: column;
        -webkit-box-shadow: 10px 10px 43px 6px rgba($black,0.16);
        -moz-box-shadow: 10px 10px 43px 6px rgba($black,0.16);
        box-shadow: 10px 10px 43px 6px rgba($black,0.16);

        > h3 > b {
            font-weight: bold;
        }

        > p {
            width: 100%;
            min-height: 16px;
            background-color: $white;
            margin: 10px 0 10px 0;
            padding: 5px;
            text-align: center;
        }


        > div {
            display: flex;
            justify-content: space-between;

            > button {
                height: 50px;
                margin: 10px;
                @include button($white, $purple, 25px, 5px, 50px);
            }

            > .backspace {
                @include button($white, darken($red, 10%), 25px, 5px, 50px);
            }
        }

        > div:last-child {
            // background: red;
            width: 100%;
            > button {
                @include button($white, $green, 25px, 5px, 100%);
            }
        }
    }

</style>
