<template>
    <div id="wrapper" class="wrapper clearfix">
        <Header/>
        <InnerPageHero
            title="Галерея"
            subtitle="Работы наших мастеров: стрижки, бороды, бритьё и детали образа."
            image="assets/images/page-titles/6.jpg"
        />

        <section id="gallery" class="gallery gallery-grid gallery-3col gallery-page">
            <div class="container">
                <div id="gallery-all" class="row gallery-page__grid">
                    <div v-for="(item, index) in gallery" :key="item._id || item.imgsrc"
                        class="col-xs-12 col-sm-6 col-md-4 gallery-item">
                        <div class="gallery--img">
                            <img :src="item.imgsrc" :alt="'Работа барбершопа Hairy, фото ' + (index + 1)">
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <Footer/>
    </div>
</template>

<script>
import axios from 'axios'
import { API_BASE_URL } from '../api'
import Header from './Header.vue'
import Footer from './Footer.vue'
import InnerPageHero from './InnerPageHero.vue'

export default {
    components: {
        Header,
        Footer,
        InnerPageHero
    },
    data() {
        return {
            gallery: []
        }
    },
    mounted() {
        axios.get(API_BASE_URL + '/gallery').then((response) => {
            this.gallery = response.data
        })
    }
}
</script>

<style>
.gallery-page {
    padding: 85px 0 90px;
}

.gallery-page__grid {
    min-height: 300px;
}

.gallery-page__grid .gallery-item {
    margin-bottom: 30px;
}

@media only screen and (max-width: 767px) {
    .gallery-page {
        padding: 60px 0;
    }

}
</style>
