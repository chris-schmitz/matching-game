<template>
  <div id="app">
      <ul>
        <li>matchCount: {{matchCount}}</li>
        <li>faceUpCount: {{faceUpCount}}</li>
        <li>notification: {{notification}}</li>
      </ul>
      <card v-for="card in cards" :card-data="card" :key="card.id"></card>
  </div>
</template>

<script>
  const Card = require('./Card.vue')
  const { mapState, mapGetters } = require('vuex')

  export default {
    components: {Card},
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
  #app {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;

    > * {
      margin: 10px;
    }
  }

</style>
