<template>
    <div id="wrapper" class="wrapper clearfix">
        <Header/>
        <InnerPageHero
            title="Наш состав"
            subtitle="Команда мастеров Hairy"
            image="assets/images/page-titles/5.jpg"
        />

        <section id="team1" class="team team-1 staff-page">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
                        <div class="text--center heading heading-2 staff-page__heading">
                            <h2 class="heading--title">Наши мастера</h2>
                            <p class="heading--desc mb-0">Мастера Hairy внимательно работают с каждой деталью образа — от классической стрижки до ухода за бородой.</p>
                            <div class="divider--line divider--center"></div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div v-for="item in masters" :key="item._id || item.imgsrc"
                        class="col-xs-12 col-sm-4 col-md-4">
                        <div class="member">
                            <div class="member-img">
                                <img :src="item.imgsrc" :alt="item.name">
                                <div class="member-overlay">
                                    <div class="member-social">
                                        <div class="pos-vertical-center">
                                            <a href="https://www.facebook.com/" target="_blank"
                                                rel="noopener noreferrer" aria-label="Facebook">
                                                <i class="fa fa-facebook" aria-hidden="true"></i>
                                            </a>
                                            <a href="https://www.instagram.com/" target="_blank"
                                                rel="noopener noreferrer" aria-label="Instagram">
                                                <i class="fa fa-instagram" aria-hidden="true"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="member-info">
                                <h5>{{ item.name }}</h5>
                                <h6>{{ localizedPosition(item.position) }}</h6>
                            </div>
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
            masters: []
        }
    },
    mounted() {
        axios.get(API_BASE_URL + '/masters').then((response) => {
            this.masters = response.data
        })
    },
    methods: {
        localizedPosition(position) {
            return position === 'Barber' ? 'Барбер' : position
        }
    }
}
</script>

<style>
.staff-page {
    padding: 90px 0 55px;
}

.staff-page__heading {
    margin-bottom: 55px;
}

@media only screen and (max-width: 767px) {
    .staff-page {
        padding: 60px 0 30px;
    }

    .staff-page__heading {
        margin-bottom: 38px;
    }
}
</style>
