import Vue from 'vue'
import Vuex from 'vuex'
// vuex状态持久化
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    test: 'test'
  },
  mutations: {
  },
  actions: {
  },
  plugins: [createPersistedState()]
});

export default store

