import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
const store = new Vuex.Store({
    //plugins: [createPersistedState()],
    state: {
      user: null,
      count: 0,
      color: ""
    },
    mutations: {
        setUser: (state, user) => state.user = user,
        setCount: (state, count) => state.count = count,
        setColor: (state, color) => state.color = color
    },
    getters: {
        getUser: (state) =>
        {
            return state.user
        },
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
  