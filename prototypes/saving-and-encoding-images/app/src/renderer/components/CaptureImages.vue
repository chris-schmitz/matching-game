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
      <ul>
        <li v-for="string in filesAsBase64Strings">
          <img :src="`${string}`">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  // import picaConstructor from 'pica'
  // const pica = picaConstructor()

  export default {
    data () {
      return {
        dragoverIsActive: false,
        files: [],
        filesAsBase64Strings: [],
        resizeDimensions: {
          width: 100,
          height: 100
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
          debugger
          // let img = document.createElement('img')
          let img = new Image()

          img.onload = () => {
            let canvas = document.createElement('canvas')
            let ctx = canvas.getContext('2d')

            canvas.width = vm.resizeDimensions.width
            canvas.height = vm.resizeDimensions.height

            // at this point, the `this` context is referring to the img element we created
            ctx.drawImage(this, 0, 0, vm.resizeDimensions.width, vm.resizeDimensions.height)
            let uri = canvas.toDataUrl()
            resolve(uri)
          }

          img.src = base64Image
        })
        // let image =
        // const canvas = this.$el.querySelector('#for-image-resize')
        // pica.resize(image, canvas)
        //   .then(result => {
        //     debugger
        //   })
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
      position: absolute;
      > p {
        text-align: left;
      }
      > ul {
        text-align: left;
        list-style: none;
      }

      > ul > li > img {
        height: 100px;
      }
    }
  }
</style>
