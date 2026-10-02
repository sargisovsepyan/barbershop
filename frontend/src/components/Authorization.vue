<template>
  <div class="limiter">
    <div class="container-login100" style="background-image: url('../assets/images/background/5.jpg');">
      <div class="wrap-login100">
        <form class="login100-form validate-form" @submit.prevent="log">
          <span class="login100-form-logo">
            <img src="assets/images/icons/favicon.png" alt="Barbershop logo">
          </span>

          <span class="login100-form-title p-b-34 p-t-27">
            Авторизация
          </span>

          <div class="wrap-input100 validate-input" data-validate="Enter username">
            <input
              v-model="login"
              class="input100"
              type="text"
              name="username"
              placeholder="логин"
              autocomplete="username"
            >
            <span class="focus-input100" data-placeholder=""></span>
          </div>

          <div class="wrap-input100 validate-input" data-validate="Enter password">
            <input
              v-model="password"
              class="input100"
              type="password"
              name="password"
              placeholder="пароль"
              autocomplete="current-password"
            >
            <span class="focus-input100" data-placeholder=""></span>
          </div>

          <div class="container-login100-form-btn">
            <button class="login100-form-btn" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

import { API_BASE_URL } from '../api'

Vue.use(VueAxios, axios)
Vue.use(VueSweetalert2)

export default {
  data() {
    return {
      login: '',
      password: ''
    }
  },
  methods: {
    log() {
      Vue.axios.post(API_BASE_URL + '/auth/login', {
        username: this.login,
        password: this.password
      }).then(response => {
        this.$store.commit('setUser', {
          name: this.login,
          token: response.data.token
        })
        this.password = ''
        this.$router.push('/AdminPanel')
      }).catch(() => {
        this.password = ''
        Vue.swal('Доступ запрещен', 'Проверьте логин и пароль.', 'error')
      })
    }
  }
}
</script>
