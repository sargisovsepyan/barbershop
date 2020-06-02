<template>
    <div id="wrapper" class="wrapper clearfix">
         <Header/>
<!-- Page Title #1
============================================= -->
<section id="page-title" class="page-title bg-overlay bg-overlay-dark bg-parallax">
    <div class="bg-section">
        <img src="assets/images/page-titles/7.jpg" alt="Background" />
    </div>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="title title-1 text-center">
                    <div class="title--heading">
                        <h1>About Us</h1>
                    </div>
                    <div class="clearfix"></div>
                    <ol class="breadcrumb">
                        <li><a href="index-3.html">Home</a></li>
                        <li class="active">About Us</li>
                    </ol>
                </div>
                <!-- .title end -->
            </div>
            <!-- .col-md-12 end -->
        </div>
        <!-- .row end -->
    </div>
    <!-- .container end -->
</section>
<!-- #page-title end -->

<!-- Video #2
============================================= -->
<section id="video2" class="video-button video-button-1">
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-6 col-md-6">
                <div class="heading heading-2 mb-30 pt-50">
                    <h2 class="heading--title">Barbershop hairy<br></h2>
                </div>
                <p>Hairy - это больше, чем мужская парикмахерская и уж точно не салон красоты. Здесь работают мастера своего дела, знающие, как из мельчайших деталей собирается образ настоящей мужественности. Пользуясь лучшей мужской косметикой, которую мы закупаем в самых разных уголках света, мы чтем трехсотлетние традиции классической стрижки и ухода за бородой, ну и конечно же, королевского бритья.</p>

                <p>Посетив наш барбершоп, вы поймете, что такое быть "нашим человеком". Наш барбер - это не просто парикмахер, к которому приходят за стрижкой, а еще и приятель, за работой которого можно пропустить стаканчик Jameson, обсуждая политику или футбол.</p>
                <img src="assets/images/icons/signature.png" alt="signature">
            </div>
            <!-- .col-md-6 end -->
            <div class="col-xs-12 col-sm-6 col-md-6">
                <div class="video--content">
                    <div class="bg-section">
                        <img src="assets/images/background/4.jpg" alt="Background" />
                    </div>
                    <div class="video-overlay">
                        <div class="video--button">
                            <div class="pos-vertical-center">
                                <a class="popup-video" href="https://www.youtube.com/watch?v=nrJtHemSPW4">
									<i class="fa fa-play"></i>
								</a>
                            </div>
                        </div>
                        <!-- .video--player end -->
                    </div>
                </div>
            </div>
            <!-- .col-md-6 end -->
        </div>
        <!-- .row end -->
    </div>
    <!-- .container end -->
</section>
<!-- #video2 end -->

<!-- Counter #1
============================================= -->
<section id="counter1" class="counter counter-1 bg-gray">
    <div class="container">
        <div class="row">
            <!-- count #1 -->
            <div class="col-xs-12 col-sm-6 col-md-3">
                <div class="count-box text-center">
                    <div class="count-img">
                        <img src="assets/images/icons/1.png" alt="count box">
                    </div>
                    <div class="counting">6</div>
                    <div class="count-title">Барберов</div>
                </div>
            </div>
            <!-- .col-md-3 end -->

            <!-- count #2 -->
            <div class="col-xs-12 col-sm-6 col-md-3">
                <div class="count-box text-center">
                    <div class="count-img">
                        <img src="assets/images/icons/7.png" alt="count box">
                    </div>
                    <div class="counting">2000</div>
                    <div class="count-title">Счастливых клиеннтов</div>
                </div>
            </div>
            <!-- .col-md-3 end -->

            <!-- count #3 -->
            <div class="col-xs-12 col-sm-6 col-md-3">
                <div class="count-box text-center">
                    <div class="count-img">
                        <img src="assets/images/icons/8.png" alt="count box">
                    </div>
                    <div class="counting">370</div>
                    <div class="count-title">Постоянных клиентов</div>
                </div>
            </div>
            <!-- .col-md-3 end -->

            <!-- count #4 -->
            <div class="col-xs-12 col-sm-6 col-md-3">
                <div class="count-box text-center">
                    <div class="count-img">
                        <img src="assets/images/icons/9.png" alt="count box">
                    </div>
                    <div class="counting">16</div>
                    <div class="count-title">Опыт работы</div>
                </div>
            </div>
            <!-- .col-md-3 end -->
        </div>
        <!-- .row end -->
    </div>
    <!-- .container end -->
</section>
<!-- #counter1 end -->




<!-- Footer #5
============================================= -->
    <Footer/>
</div>

</template>

 <script src="../assets/js/functions.js"></script>  
<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import * as utils from '../utils'

import Header from './Header.vue'
import Footer from './Footer.vue'

Vue.use(VueAxios, axios)

    export default {
       components: {
       Header,
       Footer
       },
       props: {
           
          
       },
       data() {
           return {
                student : {},
           }
       },
       mounted: function(){
        Vue.axios.get("http://46.101.212.195:3000/students/"+this.id).then((response) => {
            console.log(response.data)
            this.student = response.data;
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