<template>
    <div id="wrapper" class="wrapper clearfix">
    <Header/>

<!-- Page Title #1
============================================= -->
<section id="page-title" class="page-title bg-overlay bg-overlay-dark bg-parallax">
    <div class="bg-section">
        <img src="assets/images/page-titles/5.jpg" alt="Background" />
    </div>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="title title-1 text-center">
                    <div class="title--heading">
                        <h1>Our Staff</h1>
                    </div>
                    <div class="clearfix"></div>
                    <ol class="breadcrumb">
                        <li><a href="index-3.html">Home</a></li>
                        <li class="active">Our Staff</li>
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

<!-- Team #1
============================================= -->
<section id="team1" class="team team-1">
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-6 col-md-offset-3">
                <div class="text--center heading heading-2 mb-70">
                    <h2 class="heading--title">Skilled Barbers</h2>
                    <p class="heading--desc mb-0">Duis aute irure dolor in reprehenderit volupte velit esse cillum dolore eu fugiat pariatursint occaecat cupidatat non proident culpa.</p>
                    <div class="divider--line divider--center"></div>
                </div>
            </div>
            <!-- .col-md-6 end -->
        </div>
        <!-- .row end -->
        <div class="row">
            <!-- Member #1 -->
            <span v-for="item in masters" :key="item.imgsrc">
                <div class="col-xs-12 col-sm-4 col-md-4">
                    <div class="member">
                        <div class="member-img">
                            <img v-bind:src="item.imgsrc" alt="member">
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
                            <h5>{{item.name}}</h5>
                            <h6>{{item.position}}</h6>
                        </div>
                        <!-- .member-info end -->
                    </div>
                    <!-- .member end -->
                </div>
            </span>
            <!-- .col-md-4 end -->

        </div>
    </div>
</section>
<!-- #team4 end  -->
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

import Header from './Header.vue'
import Footer from './Footer.vue'

Vue.use(VueAxios, axios)

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
            masters : []
        }
    },
    mounted () {
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
