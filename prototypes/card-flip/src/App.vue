<template>
  <div id="app">
      <ul>
        <li>matchCount: {{matchCount}}</li>
        <li>faceUpCount: {{faceUpCount}}</li>
        <li>notification: {{notification}}</li>
      </ul>
      <!--
        note that we are intensionally letting the size of the notification component
        show in the browser even if nothing is displayed (i.e. we're not using `v-if` 
        or `v-show` directive to prevent the notification component from rendering). 
        This is because we don't want the game board to jump up and down anytime a 
        notification appears or disappears. Since we're using a slot and a prop to
        show the color and contents of the notification we control whether or not the 
        user sees the notification by providing or not providing the information necessary 
        for the notification to show.
      -->
      <notification :type="notification.type">
        <div>{{notification.message}}</div>
      </notification>
      <div class="game-board">
            <card v-for="card in cards" :card-data="card" :key="card.id"></card>
      </div>
  </div>
</template>

<script>
  const Card = require('./Card.vue')
  const Notification = require('./Notification.vue')
  const { mapState, mapGetters } = require('vuex')

  export default {
    components: {Card, Notification},
    name: 'app',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
      }
    },
    computed: {
      ...mapState({
        cards: state => state.cards,
        notification: state => state.notification
      }),
      ...mapGetters([
        'matchCount',
        'faceUpCount'
      ])
    }
  }
</script>


<style lang="scss">
  body{font-family: Arial, Helvetica, sans-serif;}

  .game-board{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;

    > * {
      margin: 10px;
    }
  }

  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-to /* .list-leave-active for <2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
  }

</style>
