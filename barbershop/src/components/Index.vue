<template>
    <!-- Document Wrapper
	============================================= -->
    <div id="wrapper" class="wrapper clearfix">
        <Header/>

        <!-- Slider #1
============================================= -->
        <section id="slider" class="carousel slider slider-navs" data-slide="1" data-slide-rs="1" data-autoplay="true"
            data-nav="true" data-dots="true" data-space="0" data-loop="true" data-speed="800">

            <!-- Slide #1 -->
            <div class="slide--item bg-overlay bg-overlay-dark">
                <div class="bg-section">
                    <img src="assets/images/sliders/slide-bg/1.jpg" alt="background">
                </div>
                <div class="pos-vertical-center">
                    <div class="container">
                        <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 text--center">
                                <div class="slide--headline">Hairy Барбершоп</div>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-6 col-md-offset-3 text--center">
                                <div class="slide--bio">Идеальное пространство для идеальных мужчин. </div>
                            </div>

                        </div>
                        <!-- .row end -->
                    </div>
                    <!-- .container end -->
                </div>
            </div>
            <!-- .slide-item end -->

            <!-- Slide #2 -->
            <div class="slide--item bg-overlay bg-overlay-dark">
                <div class="bg-section">
                    <img src="assets/images/sliders/slide-bg/2.jpg" alt="background">
                </div>
                <div class="pos-vertical-center">
                    <div class="container">
                        <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 text--center">
                                <div class="slide--headline">Сформируем Ваш персональный имидж</div>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-6 col-md-offset-3 text--center">
                                <div class="slide--bio">Подбираем то, что подходит именно Вашему характеру и делает Вас
                                    не похожим ни на кого.</div>
                            </div>
                        </div>
                        <!-- .row end -->
                    </div>
                    <!-- .container end -->
                </div>
            </div>
            <!-- .slide-item end -->

            <!-- Slide #3 -->
            <div class="slide--item bg-overlay bg-overlay-dark">
                <div class="bg-section">
                    <img src="assets/images/sliders/slide-bg/3.jpg" alt="background">
                </div>
                <div class="pos-vertical-center">
                    <div class="container">
                        <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 text--center">
                                <div class="slide--headline">Наши клеинты доверяют нам</div>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-6 col-md-offset-3 text--center">
                                <div class="slide--bio">Мы как никто другой ценим чистоту, открытость, комфорт, качество
                                    во всех деталях.</div>
                            </div>
                        </div>
                        <!-- .row end -->
                    </div>
                    <!-- .container end -->
                </div>
            </div>
            <!-- .slide-item end -->
        </section>
        <!-- #slider end -->


        <section id="service1" class="services services-2 text-center bg-white">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-6 col-md-offset-3">
                        <div class="heading text--center mb-80">

                            <h2>Что мы умеем делать?</h2>
                            <!-- <p class="heading--desc">Duis aute irure dolor in reprehenderit volupte velit esse cillum
                                dolore eu fugiat pariatursint occaecat cupidatat non proident culpa.</p> -->
                            <div class="divider--line"></div>
                        </div>
                    </div>
                    <!-- .col-md-6 end -->
                </div>
                <!-- .row end -->
                <div>
                    <div class="row">
                        <!-- Service #1 -->
                        <span v-for="item in WhatWeCanDo" :key="item.imgsrc">
                            <div class="col-xs-12 col-sm-4 col-md-4">
                                <div class="service-panel">
                                    <div class="service--img">
                                        <img v-bind:src="item.imgsrc">
                                    </div>
                                    <h3>{{item.caption}}</h3>
                                    <p>{{item.description}}</p>
                                </div>
                                <!-- .container end -->
                            </div>
                        </span>
                        <!-- .col-md-4 end -->
                    </div>
                </div>
                <!-- .row end -->
            </div>
            <!-- .container end -->
        </section>
        <!-- #service1 end -->

        <!-- pricing #2
============================================= -->
        <section id="pricing2" class="pricing pricing-2 bg-overlay bg-overlay-dark bg-parallax">
            <div class="bg-section">
                <img src="assets/images/background/5.jpg" alt="Background" />
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-6 col-md-offset-3">
                        <div class="heading text--center mb-70">
                            <h2 class="heading--title text-white">ПРЕЙСКУРАНТ</h2>
                            <!-- <p class="heading--desc text-white">Duis aute irure dolor in reprehenderit volupte velit
                                esse cillum dolore eu fugiat pariatursint occaecat cupidatat non proident culpa.</p> -->
                            <div class="divider--line"></div>
                        </div>
                    </div>
                    <!-- .col-md-6 end -->
                </div>
                <!-- .row end -->
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-8 col-md-offset-2">
                        <div class="row panel-wrapper">
                            <!-- pricing Panel #1 -->

                         
                                <span v-for="item in services" :key="item.name">
                                    <div class="col-xs-12 col-sm-6 col-md-12">
                                        <div class="pricing-panel">
                                            <div class="pricing--content">
                                                <h4 class="pricing--heading">{{item.name}}</h4>
                                                <div class="pricing--divider"></div>
                                                <span class="price">{{item.price}}</span>
                                            </div>
                                        </div>
                                        <!-- .panel end -->
                                    </div>
                                </span>
                        


                            <!-- .row end -->
                        </div>
                        <!-- .col-md-8 end -->
                    </div>
                    <!-- .row end -->
                </div>
                <!-- .container end --></div>
        </section>
        <!-- #pricing1 end -->

        <!-- gallery 3 Column
============================================= -->
        <section id="gallery" class="gallery gallery-grid gallery-3col">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-6 col-md-offset-3">
                        <div class="heading text--center mb-70">
                            <h2>НАША ГАЛЕРЕЯ</h2>
                            <!-- <p class="heading--desc">Duis aute irure dolor in reprehenderit volupte velit esse cillum
                                dolore eu fugiat pariatursint occaecat cupidatat non proident culpa.</p> -->
                            <div class="divider--line"></div>
                        </div>
                    </div>
                </div>
                <div id="app3">

                    <div class="row">


                        <!-- gallery #1 -->
                        <span v-for="item in gallery" v-bind:key="item.id">
                            <div class="col-xs-12 col-sm-6 col-md-4 gallery-item filter-Lineup">
                                <div class="gallery--img">

                                    <img v-bind:src="item.imgsrc">
                                    <!-- <div class="gallery--hover">
                            <div class="gallery--action">
                                <div class="pos-vertical-center">
                                    <div class="gallery--title">
                                        <h4><a href="#">Modern Haircut</a></h4>
                                    </div>
                                    <div class="gallery--cat">
                                        <a href="#">Hairstyle</a> <a href="#">Lineup</a>
                                    </div>
                                </div>
                            </div>
                            
                        </div> -->
                                    <!-- .gallery-action end -->
                                    <!-- .gallery-hover end -->
                                </div>
                                <!-- .gallery-img end -->
                            </div>
                        </span>
                        <!-- . gallery-item end -->
                    </div>

                </div>

                <!-- .row end -->
                <!-- .row end -->
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 clearfix mt-30 text--center">
                        <router-link to="GAllery"  class="btn btn--secondary btn--bordered btn--rounded">See Galary</router-link>
                        
                    </div>
                    <!-- .col-md-12 end -->
                </div>
                <!-- .row end -->
            </div>
            <!-- .container end -->
        </section>
        <!-- #gallery end -->

        <!-- Testimonial #2
============================================= -->
        <section id="testimonial2" class="testimonial testimonial-2 bg-overlay bg-overlay-dark bg-parallax text-center">
            <div class="bg-section">
                <img src="assets/images/background/7.jpg" alt="Background" />
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-8 col-md-offset-2">
                        <div id="testimonial-carousel" class="carousel carousel-dots carousel-white" data-slide="1"
                            data-slide-rs="1" data-autoplay="true" data-nav="false" data-dots="true" data-space="30"
                            data-loop="true" data-speed="5000">
                            <!-- Testimonial #1 -->
                            <div class="testimonial-panel">
                                <div class="testimonial--meta-content">
                                    <h4>Фрэнк Синатра сказал:</h4><br />
                                </div>
                                <div class="testimonial--body">
                                    <p>“Чтобы иметь успех, нужно иметь друзей.
                                        Но чтобы поддерживать большой успех, нужно
                                        иметь много друзей”</p>
                                </div>
                                <!-- .testimonial-body end -->
                                <div class="testimonial--meta-content">
                                    <h4>Мы всегда рады новым друзьям, и с нетерпением ждем тебя в гости!</h4>
                                </div>
                            </div>
                            <!-- .testimonial-panel end -->

                            <!-- Testimonial #2 -->
                            <div class="testimonial-panel">
                                <div class="testimonial--meta-content">
                                    <h4>Томас Мор сказал:</h4>
                                </div>
                                <div class="testimonial--body">
                                    <p>“Если хотите иметь успех, вы должны выглядеть так, как будто вы его имеете.”</p>
                                </div>
                                <!-- .testimonial-body end -->
                                <div class="testimonial--meta-content">
                                    <h4>Красивый вид - залог успеха!</h4>
                                </div>
                            </div>
                            <!-- .testimonial-panel end -->

                            <!-- Testimonial #3 -->
                            <div class="testimonial-panel">
                                <div class="testimonial--meta-content">
                                    <h4>Публий Сир сказал:</h4>
                                </div>
                                <div class="testimonial--body">
                                    <p>„Ухоженный вид – немая рекомендация.”</p>
                                </div>
                                <!-- .testimonial-body end -->
                                <div class="testimonial--meta-content">
                                    <h4>Уделите нам время и мы вам поможем!</h4>
                                </div>
                            </div>
                            <!-- .testimonial-panel end -->

                        </div>
                    </div>
                    <!-- .col-md-12 end -->
                </div>
                <!-- .row end -->
            </div>
            <!-- .container end -->
        </section>
        <!-- #testimonial2 end -->

        <!-- Team #1
============================================= -->
        <section id="team1" class="team team-1 bg-white">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-6 col-md-offset-3">
                        <div class="text--center heading heading-2 mb-70">
                            <h2 class="heading--title">Мастера</h2>
                            <p class="heading--desc mb-0">В наших барбершопах работают исключительно высококлассные
                                профессионалы, обладающие набором дипломов и сертификатов, которые закончили образование
                                в лучших мировых школах.</p>
                            <div class="divider--line divider--center"></div>
                        </div>
                    </div>
                    <!-- .col-md-6 end -->
                </div>
                <!-- .row end -->

                
                    <div class="row">

                        <span v-for="barber in masters">
                            <!-- Members #1 -->
                            <div class="col-xs-12 col-sm-4 col-md-4">
                                <div class="member">
                                    <div class="member-img">
                                        <img v-bind:src="barber.imgsrc">
                                        <div class="member-overlay">
                                            <div class="member-social">
                                                <div class="pos-vertical-center">
                                                    <a href="#"><i class="fa fa-facebook"></i></a>
                                                    <a href="#"><i class="fa fa-twitter"></i></a>
                                                    <a href="#"><i class="fa fa-google-plus"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- .memebr-ovelay end -->
                                    </div>
                                    <!-- .member-img end -->
                                    <div class="member-info">
                                        <h5>{{barber.name}}</h5>
                                        <h6>{{barber.position}}</h6>
                                    </div>
                                    <!-- .member-info end -->
                                </div>
                                <!-- .member end -->
                            </div>
                            <!-- .col-md-4 end -->
                        </span>
                       
                    </div>

                    <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 clearfix mt-30 text--center">
                        <router-link to="OurStaff"  class="btn btn--secondary btn--bordered btn--rounded">See Masters</router-link> 
                    </div>
                    <!-- .col-md-12 end -->
                </div>

            </div>
            
        </section>
        <!-- #team4 end  -->



        <!-- Booking
============================================= -->
        <section id="booking" class="booking booking-2 bg-overlay bg-overlay-dark bg-parallax text-center">
            <div class="bg-section">
                <img src="assets/images/testimonial/bg-1.jpg" alt="Background" />
            </div>
            <div class="container">
                <div class="row clearfix">
                    <div class="col-xs-12 col-sm-12 col-md-6 col-md-offset-3">
                        <div class="heading heading-2 mb-80 text--center">
                            <h2 class="heading--title text-white">Онлайн-запись</h2>
                            <!-- <p class="heading--desc text-white">Барбершоп Hairy</p> -->
                            <div class="divider--line"></div>
                        </div>
                    </div>
                    <!-- .col-md-6 end -->
                </div>
                <!-- .row end -->
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-8 col-md-offset-2">
                        <div class="booking-form">
                         
                                <div class="row">
                                    <div class="col-xs-12 col-sm-12 col-md-6">
                                        <input type="text" class="form-control" name="contact-name" id="name"
                                            placeholder="Ваше имя" v-model = "nameOfC" style="font-weight: bold;" > 
                                    </div>
                                    <div class="col-xs-12 col-sm-12 col-md-6">
                                        <input type="text" class="form-control" name="contact-phone" id="phone" style="font-weight: bold;"
                                            placeholder="Телефон" v-model = "phoneOfC">
                                    </div>

                                    <div class="col-xs-12 col-sm-12 col-md-6">
                                        <div class="form-select">
                                            <i class="fa fa-angle-down"></i>
                                            <select class="form-control" name="services" id="services" v-model = "serviceOfC" style="font-weight: bold;">
                                                <option value="">Услуга</option>
                                                <option v-for="item in services" :value="item.name" :key="item.id">{{item.name}}</option>
                                                
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-xs-12 col-sm-12 col-md-6">
                                        <div class="form-select">
                                            <i class="fa fa-angle-down"></i>
                                            <select class="form-control" name="date" id="date" v-model = "dateOfC"  @change="selectDate()" style="font-weight: bold;">
                                                <option value="">Date</option>
                                                <option>{{todayDate.getDate()}}. {{todayDate.getMonth()+1}}. {{todayDate.getFullYear()}}</option>
                                                <option >{{todayDate.getDate()+1}}. {{todayDate.getMonth()+1}}. {{todayDate.getFullYear()}}</option>
                                                <option >{{todayDate.getDate()+2}}. {{todayDate.getMonth()+1}}. {{todayDate.getFullYear()}}</option>
                                                <option >{{todayDate.getDate()+3}}. {{todayDate.getMonth()+1}}. {{todayDate.getFullYear()}}</option>
                                                <option >{{todayDate.getDate()+4}}. {{todayDate.getMonth()+1}}. {{todayDate.getFullYear()}}</option>
                                            </select>
                                        </div>
                                    </div>
                                    
                
                                    
                                    <div class="col-xs-12 col-sm-12 col-md-6">
                                        <div class="form-select">
                                            <i class="fa fa-angle-down"></i>
                                            <select class="form-control" name="date" id="date" v-model = "timeOfC" style="font-weight: bold;" >
                                                <option value="" >Время</option>
                                                <option v-for="timeFromServer in times" v-bind:key="timeFromServer.time" :value="timeFromServer._id">{{timeFromServer.time}}</option>
                                               
                                            </select>
                                        </div>
                                    </div>

                                        

                                    <div class="col-xs-12 col-sm-12 col-md-12">
                                        <textarea class="form-control" name="contact-message" id="message" rows="3"
                                            placeholder="Коментарий" v-model = "noteOfC" style="font-weight: bold;"></textarea>
                                    </div>
                                    <div class="col-xs-12 col-sm-12 col-md-12">
                                        <input type="button" value="ОФОРМИТЬ ВИЗИТ" 
                                            class="btn btn--secondary btn--rounded btn--block" v-on:click="bookBtn">
                                    </div>
                                </div>
                                <!-- .row end -->
                       
                            <!-- form end -->
                        </div>
                        <!-- .booking-form end -->
                    </div>
                    <!-- .col-md-8 end -->
                </div>
                <!-- .row end -->
            </div>
            <!-- .container end -->
        </section>
        <!-- #booking end -->


        <!-- Footer #5
============================================= -->
        <Footer/>
    </div>
  





</template>

<script type="text/javascript">
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import * as utils from '../utils'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import Header from './Header.vue'
import Footer from './Footer.vue'

Vue.use(VueAxios, axios)
Vue.use(VueSweetalert2);

export default {
    components: {
       Header,
       Footer
    },
    data() {
      return {
        WhatWeCanDo : [],
        services : [],
        gallery : [],
        masters : [],
        times: [],
        nameOfC : "",
        phoneOfC : "",
        serviceOfC : "",
        dateOfC : "",
        timeOfC : "",
        noteOfC : "",
        todayDate : new Date(),
        
   }
  },
  methods: {
      selectDate: function() {
        Vue.axios.get("http://localhost:3000/book/" + this.dateOfC).then((response) => {
            console.log(response.data)
            this.times = response.data
          
        })
      },
      bookBtn: function(){
         var d = new Date();
        // console.log(this.todayDate.getDate()+"."+(this.todayDate.getMonth()+1)+"."+(this.todayDate.getFullYear()));
        // console.log(this.todayDate);



        //  console.log(d.getDate());
        //  console.log(d.getMonth()+1);
        //  console.log(d.getFullYear());

    if( (this.nameOfC == "") || (this.phoneOfC == "") || (this.serviceOfC == "") || (this.dateOfC == "") || (this.timeOfC =="")){
            Vue.swal("Введите все поля!", "", "error");
    }else{
           //
          
            Vue.axios.put("http://127.0.0.1:3000/book/" + this.timeOfC, {
               name : this.nameOfC,
               phone : this.phoneOfC,
               service : this.serviceOfC,
               dateOfService : this.dateOfC,
               time: this.timeOfC,
               note : this.noteOfC,
               booked: true
            }).then((response) => {
            console.log(response.data)  
        })//

            //alert('Вы записаны!');
            Vue.swal("Вы записаны", "Ждем вас!", "success");
            
        }
      
      
      
      }
  },
   mounted: function(){
        Vue.axios.get("http://localhost:3000/WhatWeCanDo").then((response) => {
            console.log(response.data)
            this.WhatWeCanDo = response.data;
        })
    
        Vue.axios.get("http://localhost:3000/services").then((response) => {
            console.log(response.data)
            this.services = response.data;
        })

        Vue.axios.get("http://localhost:3000/gallery").then((response) => {
            console.log(response.data)
            this.gallery = response.data;
        })

        Vue.axios.get("http://localhost:3000/masters").then((response) => {
            console.log(response.data)
            this.masters = response.data;
        })

    },
    beforeRouteEnter (to, from, next) {
        next(() => {
            utils.updatePageWithJQuery()
        })
    }
}
</script>
<style>
</style>