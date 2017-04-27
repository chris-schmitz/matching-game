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
        <img v-for="string in filesAsBase64Strings" :src="`${string}`">
    </div>
  </div>
</template>

<script>
  import Storage from '../Storage'

  const dataStore = new Storage()

  export default {
    data () {
      return {
        dragoverIsActive: false,
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
          .then(result => {
            this.filesAsBase64Strings = result
          })
      },
      filesAsBase64Strings () {
        this.addEncodedImagesToStorage()
          .then(this.updateStoredImageDisplay)
          .catch(this.handleError)
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
        this.files = Object.keys(e.dataTransfer.files)
              .map(key => e.dataTransfer.files[key])

        this.deactivateDragover(e)
        return false
      },
      returnFalse (e) {
        e.preventDefault()
        return false
      },

      addEncodedImagesToStorage () {
        // get current key in local storage
        // decode json
        // check to see if images already exist (?)
        // if not, add them to the storage key
        // store key
        return new Promise((resolve, reject) => {
          dataStore.setItem('encoded-images', this.filesAsBase64Strings)
          resolve()
        })
      },
      updateStoredImageDisplay () {
        // get stored images from storage
        // decode the json
        // loop through each image and add it to a prop
      },

      handleError (error) {
        console.error(error)
        alert(error)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .capture-images-container {

    * {
      margin-bottom: 10px;

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
      width: 500px;
    }
  }
</style>
