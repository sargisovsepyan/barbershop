import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
const store = new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
      count: 0,
      color: ""
    },
    mutations: {
        setCount: (state, count) => state.count = count,
        setColor: (state, color) => state.color = color
    },
    getters: {
        getCount: (state) =>
        {
            return state.count
        },

        getColor: (state) =>
        {
            return state.color
        }
        
    },
    actions:{

    },

      
  })
  export default store;
  