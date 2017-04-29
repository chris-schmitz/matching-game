<template>
  <div @click="close" class='enlarged-image-container'>
    <div class="lightbox-window" @click.stop>
      <slot></slot>
      <span class="close-button" @click="close">X</span>
    </div>
  </div>
</template>

<script>
  import bus from '../EventBus'

  export default {
    data () {
      return {}
    },
    methods: {
      close () {
        bus.$emit('close-enlarge-image')
      }
    }
  }
</script>

<style lang='scss' scoped>
  .enlarged-image-container{
    background-color: rgba(black, .5);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .lightbox-window {
      background-color: white;
      height: 50vh;
      width: 50vw;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;

      .close-button {
        position: absolute;
        top: 10px;
        right: 10px;

        font-size: 25px;
      }
    }
  }
</style>
