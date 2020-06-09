<template>
  
  <div class="limiter">
		<div class="container-login100" style="background-image: url('../assets/images/background/5.jpg');">
			<div class="wrap-login100">  
				<form class="login100-form validate-form">
					<span class="login100-form-logo">
						<img src="assets/images/icons/favicon.png" />
					</span>

					<span class="login100-form-title p-b-34 p-t-27">
						Авторизация
					</span>

					<div class="wrap-input100 validate-input" data-validate = "Enter username" >
						<input class="input100" type="text" name="username" placeholder="логин" v-model="login">
						<span class="focus-input100" data-placeholder=""></span>
					</div>

					<div class="wrap-input100 validate-input" data-validate="Enter password">
						<input class="input100" type="password" name="pass" placeholder="пароль" v-model="password">
						<span class="focus-input100" data-placeholder=""></span>
					</div>

					<div class="contact100-form-checkbox">
						<input class="input-checkbox100" id="ckb1" type="checkbox" name="remember-me">
						<label class="label-checkbox100" for="ckb1">
							Remember me
						</label>
					</div>

					<div class="container-login100-form-btn">
						<button class="login100-form-btn" @click = "log()"> 
							Login
						</button>
					</div>

					<div class="text-center p-t-90">
						<a class="txt1" href="#">
							Forgot Password?
						</a>
					</div>
				</form>
			</div>
		</div>
	</div>
	

	
</template>


<style>


</style>


    

<script type="text/javascript">
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

import * as utils from '../utils'


Vue.use(VueAxios, axios)
Vue.use(VueSweetalert2)

export default {
    components: {
       
    },
    data() {
      return {
		login: "",
		password: ""
       
   }
  },
  methods: {

	  log(){
		if ((this.login=="admin") && (this.password=="111")){
			this.$router.push('/AdminPanel');
		}else{
			 Vue.swal("Ты не админ!", "", "error");
		}
		
		
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