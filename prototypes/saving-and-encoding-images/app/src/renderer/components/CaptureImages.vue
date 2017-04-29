<template>
  <!--
    ~drop files~
    base64 encode them
    size them down

    store them in local storage
    pull them out of local storage
    render local storage versions on the screen
    click image to delete from local storage


    would it make sense to use a webworker for encoding?
  -->
  <div class='capture-images-container'>
    <h1>Let's add some images!</h1>
    <div
      @drop="addFiles"

      @dragover="activateDragover"
      @dragleave="deactivateDragover"
      :class="{'dragover-active': dragoverIsActive}"
      class="drop-target"
      @dragend="returnFalse"
    >
      <span>Drop images here</span>
    </div>
    <div class="file-list-container">
      <p v-if="files.length === 0">No files have been added yet.</p>
      <p v-if="files.length > 0">Files Added:</p>
      <ul>
        <li v-for="name in fileNames" v-text="name"></li>
      </ul>
    </div>

    <h3>Base64 encoded and resized</h3>
    <div class="rendered-images-container">
        <div class="thumbnail" v-for="imageObject in filesAsBase64Strings">
          <img @click="enlarge(imageObject.image)" :src="`${imageObject.image}`">
          <span @click="deleteFile(imageObject)">X</span>
        </div>
    </div>
    <button v-if="filesAsBase64Strings.length > 0" @click='deleteAll'>Delete All</button>


    <!--
      Really, the enlarged image component should become a generic
      lightbox component that handles the lightbox layout display.
      That way we can pass through the enlarged image or the spinner,
      it's all the same overlay and window logic. This is already well
      passed the goal of this prototype so I'm just going to leave the
      redundancy in, but when building it into the main project, make a
      generic lightbox component.
    -->
    <enlarged-image v-if="enlargedImageSource">
      <img :src="enlargedImageSource">
    </enlarged-image>

    <div v-if="showSpinner" class="spinner-mask-window">
      <div class="spinner-mask">
        <span>Imagine a spinner here ;P</span>
      </div>
    </div>
  </div>
</template>

<script>
  import Storage from '../Storage'
  import EnlargedImage from './EnlargedImage'
  import bus from '../EventBus'

  const dataStore = new Storage()

  export default {
    components: {EnlargedImage},
    data () {
      return {
        dragoverIsActive: false,
        showSpinner: false,
        enlargedImageSource: null,
        files: [],
        filesAsBase64Strings: [],
        resizeDimensions: {
          width: 500,
          height: 300
        }
      }
    },
    watch: {
      files () {
        let promiseArray = this.files.map(file => {
          return this.fileToBase64(file)
        })

        Promise.all(promiseArray)
          .then(result => {
            let promiseArray = result.map(this.resizeImage)
            return Promise.all(promiseArray)
          })
          .then(this.addEncodedImagesToStorage)
          .then(this.updateStoredImageDisplay)
          .catch(this.handleError)
          // .then(result => {
          //   this.filesAsBase64Strings = result
          // })
      },
      filesAsBase64Strings () {
      }
    },
    computed: {
      fileNames () {
        return this.files.map(file => file.name)
      }
    },
    methods: {
      fileToBase64 (file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.readAsDataURL(file)

          reader.onload = function () {
            resolve(reader.result)
          }

          reader.onerror = function (error) {
            reject(new Error(`File to Base64 error: ${error}`))
          }
        })
      },
      resizeImage (base64Image) {
        let vm = this

        return new Promise((resolve, reject) => {
          let img = new Image()

          img.onload = () => {
            let canvas = document.createElement('canvas')
            let ctx = canvas.getContext('2d')

            canvas.width = vm.resizeDimensions.width
            canvas.height = vm.resizeDimensions.height

            // I no shame lifted this from the stackoverflow answer here:
            // http://stackoverflow.com/questions/23104582/scaling-an-image-to-fit-on-canvas#answer-23105310
            // I understand what's going on now, but it would have taken me forever to figure this out on my own.
            function drawImageScaled (img, ctx) {
              var canvas = ctx.canvas
              var hRatio = canvas.width / img.width
              var vRatio = canvas.height / img.height
              // var ratio = Math.max(hRatio, vRatio) // max acts like a crop to canvas
              var ratio = Math.min(hRatio, vRatio)
              var centerShiftX = (canvas.width - img.width * ratio) / 2
              var centerShiftY = (canvas.height - img.height * ratio) / 2
              ctx.clearRect(0, 0, canvas.width, canvas.height)
              ctx.drawImage(img, 0, 0, img.width, img.height, centerShiftX, centerShiftY, img.width * ratio, img.height * ratio)
            }
            drawImageScaled(img, ctx)

            let uri = canvas.toDataURL()
            resolve(uri)
          }

          img.src = base64Image
        })
      },

      activateDragover (e) {
        e.preventDefault()
        this.dragoverIsActive = true
        return false
      },
      deactivateDragover (e) {
        e.preventDefault()
        this.dragoverIsActive = false
        return false
      },
      addFiles (e) {
        e.preventDefault()

        this.showSpinner = true

        this.files = Object.keys(e.dataTransfer.files)
              .map(key => e.dataTransfer.files[key])

        this.deactivateDragover(e)
        return false
      },
      returnFalse (e) {
        e.preventDefault()
        return false
      },

      deleteFile (fileObject) {
        let storedImages = dataStore.getItem('encoded-images')
        let imagesWithoutTarget = storedImages.filter(image => image.guid !== fileObject.guid)
        dataStore.setItem('encoded-images', imagesWithoutTarget)
        this.updateStoredImageDisplay()
      },

      deleteAll () {
        dataStore.setItem('encoded-images', [])
        this.updateStoredImageDisplay()
      },

      addEncodedImagesToStorage (base64EncodedFiles) {
        // get current key in local storage
        // decode json
        // check to see if images already exist (?)
        // if not, add them to the storage key
        // store key
        return new Promise((resolve, reject) => {
          let imageObjects = base64EncodedFiles.map(image => {
            return {guid: dataStore.generateGUID(), image}
          })

          let storedImages = dataStore.getItem('encoded-images')

          if (!Array.isArray(storedImages)) {
            storedImages = []
          }

          dataStore.setItem('encoded-images', storedImages.concat(imageObjects))

          resolve()
        })
      },
      updateStoredImageDisplay () {
        let data = dataStore.getItem('encoded-images')
        this.filesAsBase64Strings = data
        this.showSpinner = false
        // get stored images from storage
        // decode the json
        // loop through each image and add it to a prop
      },

      enlarge (imageSource) {
        this.enlargedImageSource = imageSource
      },
      closeEnlargedImage () {
        this.enlargedImageSource = null
      },

      handleError (error) {
        console.error(error)
        alert(error)
      }
    },
    created () {
      this.updateStoredImageDisplay()
      bus.$on('close-enlarge-image', this.closeEnlargedImage)
    }
  }
</script>

<style lang="scss" scoped>

  .capture-images-container {

    .spinner-mask-window {
      background-color: rgba(black, .5);
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;

      .spinner-mask {
        background-color: white;
        padding: 30px;
      }
    }

    * {
      margin-bottom: 10px;

    }

    button {
      font-size: 25px;
      background-color: orangered;
      border: none;
      padding: 10px;
      color: white;
    }

    .drop-target {
      background-color: rgba(orangered, .2);
      border: 1px solid orangered;
      min-height: 100px;
      min-width: 100px;
      display: flex;
      justify-content: center;
      align-items: center;

      &.dragover-active {
        background-color: orange;
        color: white;
        > * {color: white}
      }

      > span {
        color: gray;
        user-select: none;
      }
    }

    .file-list-container {
      border: 1px solid orangered;
      height: 90px;
      overflow: auto;
      padding: 10px;
      > p {
        text-align: left;
      }
      > ul {
        text-align: left;
        list-style: none;
      }

      > ul > li > img {
        // height: 100px;
      }
    }

    .rendered-images-container {
      overflow: auto;
      height: 300px;
      padding: 10px;
      border: 2px dashed orangered;
      // background: #D8E8F9;
      // width: 300px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: flex-start;
    }

      .thumbnail {
        padding: 10px;
        margin: 5px;
        background: rgba(orangered, .1);
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;

        span {
          position: absolute;
          top: 0;
          right: 0;
          font-size: 25px;
          font-weight: bold;
          cursor: pointer;
          display: inline-block;
          height: 40px;
          width: 40px;
          // background: red;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        img {
          width: 100px;
          // height: 40px;
        }
    }
  }

</style>
