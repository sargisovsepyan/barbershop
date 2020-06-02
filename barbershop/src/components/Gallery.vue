<template>
    <div id="wrapper" class="wrapper clearfix">
         <Header/>

<!-- Page Title #1
============================================= -->
<section id="page-title" class="page-title bg-overlay bg-overlay-dark bg-parallax">
    <div class="bg-section">
        <img src="assets/images/page-titles/6.jpg" alt="Background" />
    </div>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="title text-center">
                    <div class="title--heading">
                        <h1>3 Columns</h1>
                    </div>
                    <div class="clearfix"></div>
                    <ol class="breadcrumb">
                        <li><a href="index-3.html">Home</a></li>
                        <li><a href="index-3.html">gallery</a></li>
                        <li class="active">3 Columns</li>
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

<!-- gallery 3 Column
============================================= -->
<section id="gallery" class="gallery gallery-grid gallery-3col">
    <div class="container">
        <div class="row">
            <!-- gallery Filter
			============================================= -->
            <div class="col-xs-12 col-sm-12 col-md-12 gallery-filter">
                <ul class="list-inline mb-0">
                    <li><a class="active-filter" href="#" data-filter="*">All</a></li>
                    <li><a href="#" data-filter=".filter-Hairstyle">Hairstyle</a></li>
                    <li><a href="#" data-filter=".filter-Beard">Beard</a></li>
                    <li><a href="#" data-filter=".filter-Lineup">Lineup</a></li>
                    <li><a href="#" data-filter=".filter-Shave">Shave</a></li>
                </ul>
            </div>
            <!-- .gallery-filter end -->
        </div>
        <div id="gallery-all">
            <!-- gallery #1 -->
            <span v-for="item in gallery" :key="item.imgsrc">
                <div class="col-xs-12 col-sm-6 col-md-4 gallery-item filter-Lineup">
                    <div class="gallery--img">
                        <img v-bind:src="item.imgsrc">
                        <div class="gallery--hover">
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
                            <!-- .gallery-action end -->
                        </div>
                        <!-- .gallery-hover end -->
                    </div>
                    <!-- .gallery-img end -->
                </div>
            </span>
            <!-- . gallery-item end -->

         
        </div>
        <!-- .row end -->
        <!-- .row end -->
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 clearfix mt-30 text--center">
                <ul class="pagination">
                    <li class="active"><a href="#">1</a></li>
                    <li><a href="#">2</a></li>
                    <li><a href="#">3</a></li>
                    <li>
                        <a class="pagination-next" href="#" aria-label="Next">
					  <span aria-hidden="true">next <i class="fa fa-angle-right"></i></span>
				  </a>
                    </li>
                </ul>
            </div>
            <!-- .col-md-12 end -->
        </div>
        <!-- .row end -->
    </div>
    <!-- .container end -->
</section>
<!-- #gallery end -->
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