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
            <div class="slide--item bg-section bg-overlay bg-overlay-dark"
                style="background-image: url('assets/images/sliders/slide-bg/1.jpg')">
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
            <div class="slide--item bg-section bg-overlay bg-overlay-dark"
                style="background-image: url('assets/images/sliders/slide-bg/2.jpg')">
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
            <div class="slide--item bg-section bg-overlay bg-overlay-dark"
                style="background-image: url('assets/images/sliders/slide-bg/3.jpg')">
                <div class="pos-vertical-center">
                    <div class="container">
                        <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 text--center">
                                <div class="slide--headline">Наши Клиенты Доверяют Нам</div>
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
        <section id="pricing2" class="pricing pricing-2 bg-section bg-overlay bg-overlay-dark bg-parallax"
            style="background-image: url('assets/images/background/5.jpg')">
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
                        <span v-for="item in gallery" v-bind:key="item._id || item.imgsrc">
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
                        <router-link to="/Gallery" class="btn btn--secondary btn--bordered btn--rounded">Смотреть галерею</router-link>
                        
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
        <section id="testimonial2"
            class="testimonial testimonial-2 bg-section bg-overlay bg-overlay-dark bg-parallax text-center"
            style="background-image: url('assets/images/background/7.jpg')">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-8 col-md-offset-2">
                        <div id="testimonial-carousel" class="carousel carousel-dots carousel-white" data-slide="1"
                            data-slide-rs="1" data-autoplay="true" data-nav="false" data-dots="true" data-space="30"
                            data-loop="true" data-speed="600" data-autoplay-timeout="5500">
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
                            <p class="heading--desc mb-0">Команда мастеров Hairy помогает подобрать стрижку и уход,
                                которые подходят вашему стилю и характеру.</p>
                            <div class="divider--line divider--center"></div>
                        </div>
                    </div>
                    <!-- .col-md-6 end -->
                </div>
                <!-- .row end -->

                
                    <div class="row">

                        <span v-for="barber in masters" :key="barber._id || barber.imgsrc">
                            <!-- Members #1 -->
                            <div class="col-xs-12 col-sm-4 col-md-4">
                                <div class="member">
                                    <div class="member-img">
                                        <img v-bind:src="barber.imgsrc">
                                        <div class="member-overlay">
                                            <div class="member-social">
                                                <div class="pos-vertical-center">
                                                    <a href="https://www.facebook.com/" target="_blank"
                                                        rel="noopener noreferrer" aria-label="Facebook"><i
                                                            class="fa fa-facebook"></i></a>
                                                    <a href="https://www.instagram.com/" target="_blank"
                                                        rel="noopener noreferrer" aria-label="Instagram"><i
                                                            class="fa fa-instagram"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- .memebr-ovelay end -->
                                    </div>
                                    <!-- .member-img end -->
                                    <div class="member-info">
                                        <h5>{{barber.name}}</h5>
                                        <h6>{{localizedPosition(barber.position)}}</h6>
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
                        <router-link to="/OurStaff" class="btn btn--secondary btn--bordered btn--rounded">Все мастера</router-link>
                    </div>
                    <!-- .col-md-12 end -->
                </div>

            </div>
            
        </section>
        <!-- #team4 end  -->



        <!-- Booking
============================================= -->
        <section id="booking" class="booking booking-2 bg-section bg-overlay bg-overlay-dark bg-parallax text-center"
            style="background-image: url('assets/images/testimonial/bg-1.jpg')">
            <div class="container">
                <div class="row clearfix">
                    <div class="col-xs-12 col-sm-12 col-md-8 col-md-offset-2">
                        <div class="heading heading-2 mb-50 text--center">
                            <p class="booking-kicker">Без регистрации и звонков</p>
                            <h2 class="heading--title text-white">Онлайн-запись</h2>
                            <p class="heading--desc text-white">Выберите услугу, мастера и свободное время — запись подтвердится сразу.</p>
                            <div class="divider--line"></div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-10 col-md-offset-1">
                        <div class="booking-form booking-widget">
                            <div v-if="bookingOptionsLoading" class="booking-state" role="status">
                                Загружаем расписание…
                            </div>
                            <div v-else-if="bookingOptionsError" class="booking-alert booking-alert--error" role="alert">
                                <p>{{ bookingOptionsError }}</p>
                                <button type="button" class="booking-link-button" @click="loadBookingOptions">Повторить</button>
                            </div>

                            <div v-else-if="bookingConfirmation" class="booking-confirmation" aria-live="polite">
                                <span class="booking-confirmation__icon" aria-hidden="true">✓</span>
                                <p class="booking-kicker booking-kicker--dark">Запись подтверждена</p>
                                <h3>{{ bookingConfirmation.clientName }}, ждём вас!</h3>
                                <dl class="booking-summary">
                                    <div><dt>Услуга</dt><dd>{{ bookingConfirmation.service.name }}</dd></div>
                                    <div><dt>Мастер</dt><dd>{{ bookingConfirmation.master.name }}</dd></div>
                                    <div><dt>Дата</dt><dd>{{ formatBookingDate(bookingConfirmation.date) }}</dd></div>
                                    <div><dt>Время</dt><dd>{{ bookingConfirmation.startTime }}–{{ bookingConfirmation.endTime }}</dd></div>
                                </dl>
                                <button type="button" class="btn btn--secondary btn--rounded" @click="resetBooking">
                                    Новая запись
                                </button>
                            </div>

                            <form v-else class="booking-flow" novalidate @submit.prevent="bookBtn">
                                <div class="booking-grid">
                                    <div class="booking-field">
                                        <label for="booking-service"><span>1</span> Услуга</label>
                                        <div class="form-select">
                                            <i class="fa fa-angle-down" aria-hidden="true"></i>
                                            <select id="booking-service" v-model="bookingForm.serviceId" class="form-control"
                                                @change="onBookingServiceChange">
                                                <option value="">Выберите услугу</option>
                                                <option v-for="service in bookingServices" :key="service.id" :value="service.id">
                                                    {{ service.name }} · {{ service.durationMinutes }} мин · {{ service.price }}
                                                </option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="booking-field">
                                        <label for="booking-master"><span>2</span> Мастер</label>
                                        <div class="form-select">
                                            <i class="fa fa-angle-down" aria-hidden="true"></i>
                                            <select id="booking-master" v-model="bookingForm.masterId" class="form-control"
                                                :disabled="!bookingForm.serviceId" @change="onBookingMasterChange">
                                                <option value="">Выберите мастера</option>
                                                <option v-for="master in eligibleBookingMasters" :key="master.id" :value="master.id">
                                                    {{ master.name }}
                                                </option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="booking-field">
                                        <label for="booking-date"><span>3</span> Дата</label>
                                        <input id="booking-date" v-model="bookingForm.date" type="date" class="form-control"
                                            :min="bookingOptions.today" :max="bookingOptions.maxDate"
                                            :disabled="!bookingForm.masterId" @change="onBookingDateChange">
                                        <small>Запись открыта на 30 дней, часовой пояс — Ереван.</small>
                                    </div>

                                    <div class="booking-field booking-field--wide">
                                        <label><span>4</span> Свободное время</label>
                                        <div v-if="availabilityLoading" class="booking-state booking-state--compact" role="status">
                                            Проверяем расписание…
                                        </div>
                                        <div v-else-if="!bookingForm.date" class="booking-placeholder">Сначала выберите дату.</div>
                                        <div v-else-if="availabilityError" class="booking-alert booking-alert--error" role="alert">
                                            {{ availabilityError }}
                                        </div>
                                        <div v-else-if="availableSlots.length === 0" class="booking-placeholder">
                                            {{ availabilityEmptyText }}
                                        </div>
                                        <div v-else class="booking-slots" role="radiogroup" aria-label="Доступное время">
                                            <button v-for="slot in availableSlots" :key="slot.start" type="button"
                                                class="booking-slot" :class="{ 'is-selected': bookingForm.startTime === slot.start }"
                                                :aria-pressed="bookingForm.startTime === slot.start"
                                                @click="selectBookingTime(slot.start)">
                                                {{ slot.start }}
                                            </button>
                                        </div>
                                    </div>

                                    <div class="booking-field">
                                        <label for="booking-name"><span>5</span> Ваше имя</label>
                                        <input id="booking-name" v-model.trim="bookingForm.name" type="text" class="form-control"
                                            autocomplete="name" maxlength="80" placeholder="Как к вам обращаться"
                                            @input="invalidateBookingKey">
                                    </div>

                                    <div class="booking-field">
                                        <label for="booking-phone"><span>6</span> Телефон</label>
                                        <input id="booking-phone" v-model.trim="bookingForm.phone" type="tel" class="form-control"
                                            autocomplete="tel" maxlength="30" placeholder="+374 00 000 000"
                                            @input="invalidateBookingKey">
                                    </div>

                                    <div class="booking-field booking-field--wide">
                                        <label for="booking-comment"><span>7</span> Комментарий <em>необязательно</em></label>
                                        <textarea id="booking-comment" v-model="bookingForm.comment" class="form-control"
                                            rows="3" maxlength="500" placeholder="Пожелания к визиту"
                                            @input="invalidateBookingKey"></textarea>
                                        <small>{{ bookingForm.comment.length }}/500</small>
                                    </div>
                                </div>

                                <div v-if="bookingSubmitError" class="booking-alert booking-alert--error" role="alert">
                                    {{ bookingSubmitError }}
                                </div>

                                <button type="submit" class="btn btn--secondary btn--rounded btn--block booking-submit"
                                    :disabled="!canSubmitBooking || bookingSubmitting">
                                    {{ bookingSubmitting ? 'Подтверждаем…' : 'Подтвердить запись' }}
                                </button>
                                <p class="booking-privacy">Отправляя форму, вы соглашаетесь на обработку данных для оформления визита.</p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
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
import { API_BASE_URL } from '../api'

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
        masters : [],
        bookingOptions: {
          services: [],
          masters: [],
          today: '',
          maxDate: ''
        },
        bookingOptionsLoading: true,
        bookingOptionsError: '',
        bookingForm: {
          serviceId: '',
          masterId: '',
          date: '',
          startTime: '',
          name: '',
          phone: '',
          comment: ''
        },
        availableSlots: [],
        availabilityReason: '',
        availabilityLoading: false,
        availabilityError: '',
        availabilityRequest: 0,
        bookingSubmitting: false,
        bookingSubmitError: '',
        bookingIdempotencyKey: '',
        bookingConfirmation: null,
        
   }
  },
  computed: {
      bookingServices: function() {
        return this.bookingOptions.services || []
      },
      eligibleBookingMasters: function() {
        const serviceId = this.bookingForm.serviceId
        if (!serviceId) {
          return []
        }
        return (this.bookingOptions.masters || []).filter(function(master) {
          return master.eligibleServiceIds.indexOf(serviceId) !== -1
        })
      },
      canSubmitBooking: function() {
        const selectedTimeExists = this.availableSlots.some((slot) => slot.start === this.bookingForm.startTime)
        return Boolean(
          this.bookingForm.serviceId &&
          this.bookingForm.masterId &&
          this.bookingForm.date &&
          selectedTimeExists &&
          this.bookingForm.name.trim().length >= 2 &&
          this.bookingForm.phone.trim().length >= 7
        )
      },
      availabilityEmptyText: function() {
        if (this.availabilityReason === 'MASTER_NOT_WORKING') {
          return 'У мастера выходной. Выберите другую дату.'
        }
        return 'На эту дату свободных слотов нет. Попробуйте другой день.'
      }
  },
  methods: {
      initializeCarousels: function() {
        if (typeof window.initializeLegacyCarousels === 'function') {
          window.initializeLegacyCarousels(this.$el)
        }
      },
      localizedPosition: function(position) {
        return position === 'Barber' ? 'Барбер' : position
      },
      loadBookingOptions: function() {
        this.bookingOptionsLoading = true
        this.bookingOptionsError = ''
        axios.get(API_BASE_URL + '/api/booking/options').then((response) => {
          this.bookingOptions = response.data.data
        }).catch(() => {
          this.bookingOptionsError = 'Не удалось загрузить расписание. Проверьте соединение и попробуйте снова.'
        }).then(() => {
          this.bookingOptionsLoading = false
        })
      },
      invalidateBookingKey: function() {
        this.bookingIdempotencyKey = ''
        this.bookingSubmitError = ''
      },
      clearAvailability: function() {
        this.availabilityRequest += 1
        this.availableSlots = []
        this.availabilityReason = ''
        this.availabilityError = ''
        this.availabilityLoading = false
        this.bookingForm.startTime = ''
      },
      onBookingServiceChange: function() {
        this.bookingForm.masterId = ''
        this.bookingForm.date = ''
        this.clearAvailability()
        this.invalidateBookingKey()
      },
      onBookingMasterChange: function() {
        this.bookingForm.date = ''
        this.clearAvailability()
        this.invalidateBookingKey()
      },
      onBookingDateChange: function() {
        this.clearAvailability()
        this.invalidateBookingKey()
        if (this.bookingForm.date) {
          this.loadAvailability()
        }
      },
      loadAvailability: function() {
        if (!this.bookingForm.serviceId || !this.bookingForm.masterId || !this.bookingForm.date) {
          return Promise.resolve()
        }
        const requestNumber = this.availabilityRequest + 1
        this.availabilityRequest = requestNumber
        this.availabilityLoading = true
        this.availabilityError = ''
        this.availabilityReason = ''
        this.availableSlots = []

        return axios.get(API_BASE_URL + '/api/booking/availability', {
          params: {
            serviceId: this.bookingForm.serviceId,
            masterId: this.bookingForm.masterId,
            date: this.bookingForm.date
          }
        }).then((response) => {
          if (requestNumber !== this.availabilityRequest) {
            return
          }
          this.availableSlots = response.data.data.slots
          this.availabilityReason = response.data.data.reason || ''
        }).catch((error) => {
          if (requestNumber !== this.availabilityRequest) {
            return
          }
          this.availabilityError = error.response && error.response.data && error.response.data.error
            ? error.response.data.error.message
            : 'Не удалось проверить расписание. Попробуйте ещё раз.'
        }).then(() => {
          if (requestNumber === this.availabilityRequest) {
            this.availabilityLoading = false
          }
        })
      },
      selectBookingTime: function(startTime) {
        this.bookingForm.startTime = startTime
        this.invalidateBookingKey()
      },
      createIdempotencyKey: function() {
        const bytes = new Uint8Array(16)
        window.crypto.getRandomValues(bytes)
        bytes[6] = (bytes[6] & 0x0f) | 0x40
        bytes[8] = (bytes[8] & 0x3f) | 0x80
        const hex = Array.from(bytes).map((value) => value.toString(16).padStart(2, '0')).join('')
        return [hex.slice(0, 8), hex.slice(8, 12), hex.slice(12, 16), hex.slice(16, 20), hex.slice(20)].join('-')
      },
      bookBtn: function() {
        if (!this.canSubmitBooking || this.bookingSubmitting) {
          this.bookingSubmitError = 'Заполните обязательные поля и выберите свободное время.'
          return
        }
        if (!this.bookingIdempotencyKey) {
          this.bookingIdempotencyKey = this.createIdempotencyKey()
        }
        this.bookingSubmitting = true
        this.bookingSubmitError = ''

        axios.post(API_BASE_URL + '/api/booking/appointments', {
          serviceId: this.bookingForm.serviceId,
          masterId: this.bookingForm.masterId,
          date: this.bookingForm.date,
          startTime: this.bookingForm.startTime,
          name: this.bookingForm.name,
          phone: this.bookingForm.phone,
          comment: this.bookingForm.comment
        }, {
          headers: { 'Idempotency-Key': this.bookingIdempotencyKey }
        }).then((response) => {
          this.bookingConfirmation = response.data.data.appointment
          this.bookingIdempotencyKey = ''
        }).catch((error) => {
          const serverError = error.response && error.response.data && error.response.data.error
          if (!error.response) {
            this.bookingSubmitError = 'Сервер записи недоступен. Проверьте соединение и повторите отправку.'
          } else if (serverError && serverError.code === 'SLOT_TAKEN') {
            this.bookingSubmitError = 'Это время только что заняли. Мы обновили свободные слоты.'
            this.bookingIdempotencyKey = ''
            this.bookingForm.startTime = ''
            this.loadAvailability()
          } else if (serverError) {
            this.bookingSubmitError = serverError.message
          } else {
            this.bookingSubmitError = 'Не удалось оформить запись. Попробуйте ещё раз.'
          }
        }).then(() => {
          this.bookingSubmitting = false
        })
      },
      resetBooking: function() {
        this.bookingForm = {
          serviceId: '',
          masterId: '',
          date: '',
          startTime: '',
          name: '',
          phone: '',
          comment: ''
        }
        this.bookingConfirmation = null
        this.bookingSubmitError = ''
        this.bookingIdempotencyKey = ''
        this.clearAvailability()
      },
      formatBookingDate: function(value) {
        if (!value) {
          return ''
        }
        const parts = value.split('-')
        return parts[2] + '.' + parts[1] + '.' + parts[0]
      }
  },
   mounted: function(){
        this.$nextTick(this.initializeCarousels)

        Vue.axios.get(API_BASE_URL + "/WhatWeCanDo").then((response) => {
            this.WhatWeCanDo = response.data;
        })
    
        Vue.axios.get(API_BASE_URL + "/services").then((response) => {
            this.services = response.data;
        })

        Vue.axios.get(API_BASE_URL + "/gallery").then((response) => {
            this.gallery = response.data;
        })

        Vue.axios.get(API_BASE_URL + "/masters").then((response) => {
            this.masters = response.data;
        })

        this.loadBookingOptions()

    },
    beforeDestroy: function() {
        if (typeof window.destroyLegacyCarousels === 'function') {
            window.destroyLegacyCarousels(this.$el)
        }
    }
}
</script>
<style>
.booking-kicker {
  margin: 0 0 10px;
  color: #d5ad72;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1.8px;
  text-transform: uppercase;
}

.booking-kicker--dark {
  color: #9a6d30;
}

.booking-widget {
  border-radius: 4px;
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.24);
  color: #333333;
  text-align: left;
}

.booking-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px 28px;
}

.booking-field--wide {
  grid-column: 1 / -1;
}

.booking-field label {
  display: block;
  margin: 0 0 9px;
  color: #252525;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.35px;
  text-transform: uppercase;
}

.booking-field label span {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 23px;
  height: 23px;
  margin-right: 7px;
  border-radius: 50%;
  background: #bb8c4b;
  color: #ffffff;
  font-size: 12px;
}

.booking-field label em {
  color: #999999;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  text-transform: none;
}

.booking-field .form-control {
  width: 100%;
  margin: 0;
  border: 1px solid #dddddd;
  border-radius: 2px;
  background: #ffffff;
  color: #252525;
  font-weight: 600;
}

.booking-field textarea.form-control {
  height: auto;
  min-height: 96px;
  padding-top: 13px;
  resize: vertical;
}

.booking-field .form-control:focus {
  border-color: #bb8c4b;
  box-shadow: 0 0 0 3px rgba(187, 140, 75, 0.16);
  outline: 0;
}

.booking-field .form-control:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.booking-field small {
  display: block;
  margin-top: 7px;
  color: #777777;
  font-size: 12px;
  line-height: 1.5;
}

.booking-slots {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
}

.booking-slot {
  min-width: 74px;
  padding: 10px 13px;
  border: 1px solid #d8d8d8;
  border-radius: 22px;
  background: #ffffff;
  color: #333333;
  font-weight: 700;
  transition: border-color 0.2s ease, background-color 0.2s ease, color 0.2s ease;
}

.booking-slot:hover,
.booking-slot:focus,
.booking-slot.is-selected {
  border-color: #bb8c4b;
  background: #bb8c4b;
  color: #ffffff;
  outline: 0;
}

.booking-slot:focus-visible {
  box-shadow: 0 0 0 3px rgba(187, 140, 75, 0.3);
}

.booking-placeholder,
.booking-state--compact {
  padding: 16px;
  border: 1px dashed #d7d7d7;
  border-radius: 3px;
  background: #fafafa;
  color: #777777;
}

.booking-state {
  padding: 35px 15px;
  text-align: center;
}

.booking-alert {
  margin: 22px 0 0;
  padding: 13px 15px;
  border-radius: 3px;
  line-height: 1.55;
}

.booking-alert p {
  margin-bottom: 7px;
}

.booking-alert--error {
  border: 1px solid #efb0aa;
  background: #fff3f2;
  color: #8c2f28;
}

.booking-link-button {
  padding: 0;
  border: 0;
  border-bottom: 1px solid currentColor;
  background: transparent;
  color: inherit;
  font-weight: 700;
}

.booking-submit {
  margin-top: 28px;
}

.booking-submit:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.booking-privacy {
  margin: 13px 0 0;
  color: #777777;
  font-size: 11px;
  line-height: 1.5;
  text-align: center;
}

.booking-confirmation {
  padding: 10px 0;
  text-align: center;
}

.booking-confirmation__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 58px;
  height: 58px;
  margin-bottom: 18px;
  border-radius: 50%;
  background: #2f7f51;
  color: #ffffff;
  font-size: 30px;
}

.booking-confirmation h3 {
  margin-bottom: 25px;
  color: #252525;
}

.booking-summary {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1px;
  max-width: 640px;
  margin: 0 auto 30px;
  background: #e5e5e5;
}

.booking-summary div {
  padding: 16px;
  background: #fafafa;
}

.booking-summary dt {
  margin-bottom: 5px;
  color: #888888;
  font-size: 11px;
  text-transform: uppercase;
}

.booking-summary dd {
  margin: 0;
  color: #252525;
  font-weight: 700;
}

@media only screen and (max-width: 767px) {
  .booking-2 .booking-form.booking-widget {
    padding: 30px 20px;
  }

  .booking-grid,
  .booking-summary {
    grid-template-columns: 1fr;
  }

  .booking-field--wide {
    grid-column: auto;
  }

  .booking-slot {
    flex: 1 0 70px;
  }
}
</style>
