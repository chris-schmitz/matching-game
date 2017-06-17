<template>
    <div @click="toggleSettings" class='settings-container'>
        <div @click.stop class='settings-window'>
            <h1>Settings</h1>
            <div class="content">
                <!--
                    if it turns out we need more than one section for the settings window, consider
                    breaking this and each needed sections out into their own settings sub components.
                -->
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

                            <div class="card-wrapper" v-for="card in cards" @mouseover="showDeleteButton(card)" @mouseleave="hideDeleteButton(card)">
                                <div class="delete-button" v-show="card.deleteButtonIsVisible">
                                    <span class="fa fa-close"></span>
                                </div>
                                <card :card="card"></card>
                            </div>

                        </div>

                        <div class="spinner-mask" v-if="spinnerIsVisible">
                            <span class="fa fa-spinner fa-pulse fa-3x fa-fw"></span>
                        </div>
                    </div>
                    <div
                        class="drop-target"
                        :class="{'dragover-active': dragoverIsActive}"

                        @drop="addImage"
                        @dragover="activateDropTarget"
                        @dragleave="deactivateDropTarget"
                        @dragend="returnFalse"
                    >
                        Drop images here to add more cards
                    </div>
                </section>
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
                dragoverIsActive: false,
                spinnerIsVisible: false,
                files: [],
                loadedCards: [],
                resizeDimensions: {
                    width: 400,
                    height: 400
                }
            }
        },
        computed: {
            ...mapState({
                cards: 'cards'
            })
        },
        methods: {
            addImage (event) {
                event.preventDefault()
                this.showSpinner()

                this.files = Object.keys(event.dataTransfer.files)
                    .map(key => event.dataTransfer.files[key])

                this.deactivateDropTarget(event)
                return false
            },
            // handling drop target styling
            activateDropTarget (event) {
                event.preventDefault()
                this.dragoverIsActive = true
                return false
            },
            deactivateDropTarget (event) {
                event.preventDefault()
                this.dragoverIsActive = false
                return false
            },
            returnFalse: () => false,
            // handling drop target styling

            fileToBase64 (file) {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader()
                    reader.readAsDataURL(file)

                    reader.onload = () => resolve(reader.result)

                    reader.onerror = (error) => reject(error)
                })
            },
            resizeImage (base64Image) {
                let resizeWidth = this.resizeDimensions.width
                let resizeHeight = this.resizeDimensions.height
                return new Promise((resolve, reject) => {
                    let filetype = base64Image.match(/^.*\/(\w+);/)
                    if (filetype && filetype[1] === 'gif') {
                        resolve(base64Image)
                    }

                    let img = new Image()
                    img.onload = () => {
                        let canvas = document.createElement('canvas')
                        let ctx = canvas.getContext('2d')

                        canvas.width = resizeWidth
                        canvas.height = resizeHeight

                        // I no shame lifted this from the stackoverflow answer here:
                        // http://stackoverflow.com/questions/23104582/scaling-an-image-to-fit-on-canvas#answer-23105310
                        // I understand what's going on now, but it would have taken me forever to figure this out on my own.
                        function drawImageScaled (img, ctx) {
                            var canvas = ctx.canvas
                            var hRatio = canvas.width / img.width
                            var vRatio = canvas.height / img.height
                            var ratio = Math.min(hRatio, vRatio)
                            var centerShiftX = (canvas.width - img.width * ratio) / 2
                            var centerShiftY = (canvas.height - img.height * ratio) / 2

                            ctx.clearRect(0, 0, canvas.width, canvas.height)
                            ctx.drawImage(img, 0, 0, img.width, img.height, centerShiftX, centerShiftY, img.width * ratio, img.height * ratio)
                        }
                        drawImageScaled(img, ctx)

                        resolve(canvas.toDataURL())
                    }

                    img.src = base64Image
                })
            },
            addEncodedImagesToStorage (base64Images) {
                this.$store.dispatch('addCardImagesToStorage', base64Images)
            },
            handleError (error) {
                console.error(error)
            },
            faceUpAllCards () {
                this.cards.forEach(card => {
                    card.faceUp = true
                })
            },
            addDeleteButtonProperty () {
                let updatedCards = this.cards.map(card => {
                    card.deleteButtonIsVisible = false
                    return card
                })
                this.cards = updatedCards
            },
            showSpinner () {
                this.spinnerIsVisibler = true
            },
            hideSpinner () {
                this.spinnerIsVisible = false
            },
            showDeleteButton (card) {
                // card.deleteButtonIsVisible = true
                // this.cards.filter(storedCard => storedCard.faceId === card.faceId)
                //     .forEach(currentCard => {
                //         currentCard.deleteButtonIsVisible = true
                //     })
                console.log(this.cards[0].deleteButtonIsVisible)
            },
            hideDeleteButton (card) {
                card.deleteButtonIsVisible = false
                console.log(card.deleteButtonIsVisible)
            },

            ...mapActions('home', ['toggleSettings']),
            ...mapActions(['populateCardData'])
        },
        watch: {
            files () {
                let fileConversions = this.files.map(this.fileToBase64)

                Promise.all(fileConversions)
                    .then(convertedFiles => {
                        let resizings = convertedFiles.map(this.resizeImage)
                        return Promise.all(resizings)
                    })
                    .then(this.addEncodedImagesToStorage)
                    .then(result => { console.log(result); return result })
                    .then(this.populateCardData)
                    .then(this.faceUpAllCards)
                    .then(this.addDeleteButtonProperty)
                    .then(this.hideSpinner)
                    .catch(this.handleError)
            }
        },
        mounted () {
            this.populateCardData()
                .then(this.faceUpAllCards)
                .then(this.addDeleteButtonProperty)
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
                    display: flex;
                    flex-direction: column;

                    > * {
                        padding: 10px;
                        flex: 1;
                    }


                    > .controls {
                        background: $hotpink;
                        // display: block;
                    }

                    > h3 {
                        background-color: $purple;
                        color: $white;
                    }

                    .drop-target {
                        background-color: $lightGreen;
                        border-top: 1px solid $purple;
                        // min-height: 100px;
                        height: 50px;
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        &.dragover-active {
                            background:$green;
                            font-weight: bold;
                        }
                    }

                    .details {
                        position: relative;
                        .spinner-mask {
                            background-color: rgba($black, .5);
                            position: absolute;
                            top: 0;
                            bottom: 0;
                            left: 0;
                            right: 0;
                            display: flex;
                            justify-content: center;
                            align-items: center;

                            > .fa-spinner {
                                color: $white;
                                font-size:6rem;
                            }
                        }
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

            .card-wrapper {
                position: relative;

                .delete-button {
                    background-color: rgba($hotpink, .5);
                    border-radius: 5px;
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    > span {
                        font-size: 6rem;
                        color: white;
                    }
                }
            }
        }
    }
</style>
