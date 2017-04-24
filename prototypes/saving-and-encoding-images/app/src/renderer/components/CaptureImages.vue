<template>
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
  </div>
</template>

<script>
  export default {
    data () {
      return {
        dragoverIsActive: false,
        files: []
      }
    },
    computed: {
      fileNames () {
        return this.files.map(file => file.name)
      }
    },
    methods: {
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
    }
  }
</style>
