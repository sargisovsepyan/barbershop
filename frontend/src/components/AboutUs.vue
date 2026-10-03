<template>
    <div id="wrapper" class="wrapper clearfix">
        <Header/>
        <InnerPageHero
            title="О нас"
            subtitle="Традиции барберинга, мастерство и внимание к деталям."
            image="assets/images/page-titles/7.jpg"
        />

        <section class="about-story">
            <div class="container">
                <div class="row about-story__row">
                    <div class="col-xs-12 col-sm-6 col-md-6 about-story__copy">
                        <div class="heading heading-2 mb-30">
                            <h2 class="heading--title">Barbershop Hairy</h2>
                        </div>
                        <p>Hairy — это больше, чем мужская парикмахерская и уж точно не салон красоты. Здесь работают мастера своего дела, знающие, как из мельчайших деталей собирается образ настоящей мужественности. Пользуясь качественной мужской косметикой, мы чтим традиции классической стрижки, ухода за бородой и королевского бритья.</p>
                        <p>Посетив наш барбершоп, вы поймёте, что значит быть «нашим человеком». Наш барбер — не просто парикмахер, к которому приходят за стрижкой, но и приятель, с которым можно поговорить о важных вещах.</p>
                        <img class="about-story__signature" src="assets/images/icons/signature.png" alt="Hairy">
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-6">
                        <img class="about-story__image" src="assets/images/background/4.jpg"
                            alt="Мастер Hairy за работой">
                    </div>
                </div>
            </div>
        </section>

        <section id="counter1" class="counter counter-1 bg-gray about-counters">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-sm-6 col-md-3">
                        <div class="count-box text-center">
                            <div class="count-img"><img src="assets/images/icons/1.png" alt=""></div>
                            <div class="counting">6</div>
                            <div class="count-title">Барберов</div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-3">
                        <div class="count-box text-center">
                            <div class="count-img"><img src="assets/images/icons/7.png" alt=""></div>
                            <div class="counting">2000</div>
                            <div class="count-title">Счастливых клиентов</div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-3">
                        <div class="count-box text-center">
                            <div class="count-img"><img src="assets/images/icons/8.png" alt=""></div>
                            <div class="counting">370</div>
                            <div class="count-title">Постоянных клиентов</div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-3">
                        <div class="count-box text-center">
                            <div class="count-img"><img src="assets/images/icons/9.png" alt=""></div>
                            <div class="counting">16</div>
                            <div class="count-title">Лет опыта</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <Footer/>
    </div>
</template>

<script>
import Header from './Header.vue'
import Footer from './Footer.vue'
import InnerPageHero from './InnerPageHero.vue'

export default {
    components: {
        Header,
        Footer,
        InnerPageHero
    }
}
</script>

<style>
.about-story {
    padding: 90px 0;
}

.about-story__row {
    display: flex;
    align-items: center;
}

.about-story__copy p {
    max-width: 560px;
    color: #777777;
    font-size: 16px;
    line-height: 1.75;
}

.about-story__signature {
    max-width: 150px;
    margin-top: 14px;
}

.about-story__image {
    display: block;
    width: 100%;
    height: auto;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
}

.about-counters {
    padding: 80px 0 55px;
}

@media only screen and (max-width: 767px) {
    .about-story {
        padding: 60px 0;
    }

    .about-story__row {
        display: block;
    }

    .about-story__copy {
        margin-bottom: 38px;
    }

    .about-story__copy .heading {
        padding-top: 0;
    }

    .about-counters {
        padding: 55px 0 30px;
    }
}
</style>
