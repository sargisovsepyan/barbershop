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
	  <th scope="col">Комент</th>
	  <th scope="col">Del</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(item, index) in book" :key="item.name" >
      <th scope="row">{{index}}</th>
      <td>{{book[index].name}}</td>
      <td>{{book[index].phone}}</td>
      <td>{{book[index].service}}</td>
	  <td>{{book[index].dateOfService}}</td>
	  <td>{{book[index].time}}</td>
	  <td>{{book[index].note}}</td>
	  <td><button type="button" class="btn btn-danger" @click = "deleteBook(book,book[index]._id)">Del</button></td>
    </tr>
    
    
  </tbody>
</table>

	
</template>


<style>


</style>


    

<script type="text/javascript">
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import * as utils from '../utils'

Vue.use(VueAxios, axios)

export default {
    components: {
       
    },
    data() {
      return {
        book : []
       
   }
  },
  methods: {

	  deleteBook(book, id){
		  Vue.axios.delete("http://localhost:3000/book/" + id)
		  .then(response => this.book.splice(index,1));
		 window.location.reload();

	  }
  
  },
   mounted: function(){
        Vue.axios.get("http://localhost:3000/book").then((response) => {
            //console.log(response.data)
			this.book = response.data;
			console.log(this.book);
        })
    
       
    }
}
</script>