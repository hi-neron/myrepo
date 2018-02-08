'use strict'
const Vue = require('vue')

Vue.component('game-header', {
  template: '<h1>Video Games</h1>'
})

Vue.component('game-add', {
  template: `
    <div>
      <input type="text" v-model="titleGame" />
      <button @click="emitNewGame">Añadir</button>
    </div>
  `,
  data: function () {
    return {
      titleGame: null
    }
  },
  methods: {
    emitNewGame: function () {
      if (this.titleGame) {
        this.$emit('new', {title: this.titleGame})
        this.titleGame = null
      }
    }
  }
})

Vue.component('game-list', {
  props: ['games'],
  template: `
    <ol>
      <game-item v-for="item in games" :game="item" :key="item.id"></game-item>
    </ol>
  `
});

Vue.component('game-item', {
  props: ['game'],
  template: '<li>{{ game.title }}</li>'
});

new Vue({
  el: '#app',
  template: `
    <div class="view">
      <game-header></game-header>
      <game-add @new="addNewGame"></game-add>
      <game-list v-bind:games="games"></game-list>
    </div>
  `,
  data: {
    games: [
      {title: 'me: andromeda'},
      {title: 'fifa 2017'},
      {title: 'lol'},
    ]
  },
  methods: {
    addNewGame: function (game) {
      this.games.push(game)
    }
  }
})