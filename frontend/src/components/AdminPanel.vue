<template>
  <table class="table table-dark">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">ФИО</th>
        <th scope="col">Телефон</th>
        <th scope="col">Услуга</th>
        <th scope="col">Дата</th>
        <th scope="col">Время</th>
        <th scope="col">Комментарий</th>
        <th scope="col">Удалить</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in book" :key="item._id">
        <th scope="row">{{ index + 1 }}</th>
        <td>{{ item.name }}</td>
        <td>{{ item.phone }}</td>
        <td>{{ item.service }}</td>
        <td>{{ item.dateOfService }}</td>
        <td>{{ item.time }}</td>
        <td>{{ item.note }}</td>
        <td>
          <button type="button" class="btn btn-danger" @click="deleteBook(index, item._id)">
            Удалить
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

import { API_BASE_URL } from '../api'

Vue.use(VueAxios, axios)

export default {
  data() {
    return {
      book: []
    }
  },
  methods: {
    authorizationHeaders() {
      const user = this.$store.getters.getUser

      return {
        headers: {
          Authorization: 'Bearer ' + user.token
        }
      }
    },
    handleAuthorizationError(error) {
      if (error.response && error.response.status === 401) {
        this.$store.commit('setUser', null)
        this.$router.push('/Authorization')
      }
    },
    deleteBook(index, id) {
      Vue.axios.delete(
        API_BASE_URL + '/book/' + id,
        this.authorizationHeaders()
      ).then(() => {
        this.book.splice(index, 1)
      }).catch(this.handleAuthorizationError)
    }
  },
  mounted() {
    Vue.axios.get(
      API_BASE_URL + '/book',
      this.authorizationHeaders()
    ).then(response => {
      this.book = response.data
    }).catch(this.handleAuthorizationError)
  }
}
</script>
