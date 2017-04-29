<template>
  <div id="app">
    <capture-images></capture-images>
  </div>
</template>

<script>
  import CaptureImages from './components/CaptureImages'
  export default {
    components: {
      CaptureImages
    }
  }
</script>

<style>
  @import url(https://fonts.googleapis.com/css?family=Lato:300);

  * {
    margin: 0;
    padding: 0;
  }

  #app {
    padding: 20px;
  }

  html,
  body { height: 100%; box-sizing: border-box;}

  body {
    align-items: center;
    background:
      radial-gradient(
        ellipse at center,
        rgba(255, 255, 255, 1) 0%,
        rgba(229, 229, 229, .85) 100%
      );
    background-position: center;
    display: flex;
    font-family: Lato, Helvetica, sans-serif;
    justify-content: center;
    text-align: center;
  }
</style>
