<template>
    <div @click="toggleSettings" class='settings-container'>
        <div @click.stop class='settings-window'>
            <h1>Settings</h1>
            <div class="content">
                <section>
                    <h3>
                        Unique Cards:
                    </h3>
                    <div class="controls">
                        <label>
                            Category:
                            <select>
                                <option>Animals</option>
                                <option>Landmarks</option>
                                <option>Instruments</option>
                                <option>Superheros</option>
                                <option>Dev Logos</option>
                            </select>
                        </label>
                    </div>
                    <div class="details">
                        <div class="card-display">
                            <card :card="blankCard" controlLayer="true">
                                <div @click="addCard">
                                    <span class="fa fa-plus"></span>
                                </div>
                            </card>
                            <card v-for="card in cards" :card="card" :addImageCallback="addImage"></card>
                        </div>
                    </div>
                </section>
                <!--
                    Hmm. I'm not wild about this setup as far as the markup
                    and styling goes. It's "flexible" in the sense that we can
                    create sections with similar structures and they'll all be
                    styled the same, but it feels poorly organized and the UX
                    would get over time as we add sections. For now I'm going to
                    leave it b/c we really only need the one section at the moment,
                    but it would be worth coming through and refacoring it. Maybe
                    an accordian reveal of sections? Maybe a tab set? Some way of
                    making things visible without too much scrolling and without
                    getting crazy busy
                -->
                <!--<section>
                    <h3>
                        Another Section
                    </h3>
                    <div class="controls">
                        <label>
                            Category:
                            <select>
                                <option>Animals</option>
                                <option>Landmarks</option>
                                <option>Instruments</option>
                                <option>Superheros</option>
                                <option>Dev Logos</option>
                            </select>
                        </label>
                    </div>
                    <div class="details">
                        <div class="card-display">
                            <card v-for="card in cards" :card="card"></card>
                        </div>
                    </div>
                </section>-->
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    import Card from './Card'

    export default {
        components: {Card},
        data () {
            return {
                blankCard: {faceId: 0, faceUp: true, matchFound: false, face: 'fa-plus'}
            }
        },
        computed: {
            ...mapState({
                cards: 'cards'
            })
        },
        methods: {
            addCard () {
                alert('will this even work?!')
            },
            ...mapActions('home', ['toggleSettings'])
        },
        mounted () {
            this.cards.forEach(card => {
                card.faceUp = true
            })
        }
    }
</script>

<style lang='scss' scoped>
    // wow guys, I wish I didn't totally suck at styling !!!!!!!

    @import '../style/colors';
    .settings-container{
        background-color: rgba($black, .5);
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;

        > .settings-window {
            justify-content: center;
            align-items: center;
            background-color: $white;
            width: 80vw;
            height: 80vh;
            border-radius: 5px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            padding: 10px;

            .content {
                overflow: hidden;

                > section {
                    margin: 10px;
                    border: 1px solid $purple;

                    > * {
                        padding: 10px;
                        // margin-bottom: 10px;
                    }


                    > .controls {
                        background: $hotpink;
                        // display: block;
                    }

                    > h3 {
                        background-color: $purple;
                        color: $white;
                    }
                }
            }


            .card-display {
                height: 400px;
                overflow: auto;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-wrap: wrap;
                > * {margin: 5px;}
            }
        }
    }
</style>
