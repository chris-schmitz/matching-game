<template>
    <div class="card-container">
        <div v-show="!card.faceUp" class="card back" @click="flip"></div>
        <div
            v-show="card.faceUp"
            class="front"
            :style="cardBackground"
        >
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['card'],
        data () {
            return {
            }
        },
        computed: {
            hasAControlButtonOverlay () {
            // come up with a better name
                return this.controlLayer === 'true' // "casting" property to boolean
            },
            constants () {
                return {
                    fileTypes: {
                        FONTAWESOME: 'fontawesome',
                        URL: 'url',
                        FILE: 'file'
                    }
                }
            },
            backgroundType () {
                // if (this.card.face.slice(0, 2) === 'fa') {
                //     return this.constants.fileTypes.FONTAWESOME
                // }
                if (this.card.face.slice(0, 4) === 'http') {
                    return this.constants.fileTypes.URL
                }
                return this.constants.fileTypes.FILE
            },

            // This feels a bit heavy handed. consider refactoring later.
            cardBackground () {
                if (this.backgroundType === this.constants.fileTypes.URL) {
                    return {'background': `url(data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7)`}
                    // return {'background-image': `url("${this.card.face}")`}
                }
                return ''
            }
        },
        methods: {
            flip () {
                this.$store.commit('notification/clearNotificationTimeout')
                this.$store.commit('notification/setData', {message: null, type: null, timeoutId: null})
                this.$store.dispatch('gameboard/flip', this.card)
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import '../style/colors';
    @import '../style/mixins';

    .card-container {}

    .card {
        @include card(120px, 100px, $purple);
    }
    .front {
        @include card(120px, 100px, $green, true);
        display: flex;
        justify-content: center;
        align-items: stretch;

        > div {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;

            > span {
                font-size: 40px;

            }
        }
    }
</style>
