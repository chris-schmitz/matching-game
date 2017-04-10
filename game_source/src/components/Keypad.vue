<template>
    <div class='keypad-container'>
        <h3>Input for: <b>{{inputName}}</b></h3>
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
            <button @click="backspace()"><span class="fa fa-minus"></span></button>
        </div>
        <div>
            <button @click="close()"><span class="fa fa-check"></span></button>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        props: ['inputName'],
        data () {
            return {

            }
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

    .keypad-container{
        > h3 > b {
            font-weight: bold;
        }

        background-color: white;
        padding: 20px;
        display: flex;
        flex-direction: column;
        border: 1px solid $green;
        -webkit-box-shadow: 10px 10px 43px 6px rgba($black,0.16);
        -moz-box-shadow: 10px 10px 43px 6px rgba($black,0.16);
        box-shadow: 10px 10px 43px 6px rgba($black,0.16);

        > div {
            display: flex;
            justify-content: space-between;

            > button {
                width: 50px;
                height: 50px;
                margin: 10px;
            }
        }
    }

</style>
