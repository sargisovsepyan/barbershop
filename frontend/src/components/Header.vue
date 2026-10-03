<template>
    <header id="navbar-spy" class="header header-topbar header-transparent header-fixed public-header">
        <div id="top-bar" class="top-bar">
            <div class="container">
                <div class="bottom-bar-border">
                    <div class="row">
                        <div class="col-xs-12 col-sm-6 col-md-6 top--contact hidden-xs">
                            <ul class="list-inline mb-0">
                                <li><i class="lnr lnr-clock"></i><span>Пн–Пт 9:00–17:00</span></li>
                                <li><i class="lnr lnr-phone-handset"></i><span>(093) 111 888 888</span></li>
                            </ul>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6 top--info text-right text-center-xs">
                            <span class="top--login">
                                <i class="lnr lnr-exit"></i>
                                <router-link to="/Authorization">Вход</router-link>
                                <span class="top--separator"> / </span>
                                <span class="top--register">Регистрация</span>
                            </span>
                            <span class="top--social" aria-label="Социальные сети">
                                <a class="facebook" href="https://www.facebook.com/" target="_blank"
                                    rel="noopener noreferrer" aria-label="Facebook">
                                    <i class="fa fa-facebook" aria-hidden="true"></i>
                                </a>
                                <a class="instagram" href="https://www.instagram.com/" target="_blank"
                                    rel="noopener noreferrer" aria-label="Instagram">
                                    <i class="fa fa-instagram" aria-hidden="true"></i>
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <nav id="primary-menu" class="navbar navbar-fixed-top public-navbar"
            :class="{ 'is-scrolled': isScrolled }">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                        data-target="#navbar-collapse-1" aria-expanded="false" aria-label="Открыть меню">
                        <span class="sr-only">Открыть меню</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <router-link class="logo" to="/" aria-label="Hairy — главная">
                        <img class="logo-light" src="assets/images/logo/logo-light.png" alt="Hairy">
                        <img class="logo-dark" src="assets/images/logo/logo-light.png" alt="Hairy">
                    </router-link>
                </div>

                <div class="collapse navbar-collapse pull-right" id="navbar-collapse-1">
                    <ul class="nav navbar-nav nav-pos-right nav-bordered-right snavbar-left">
                        <li><router-link exact to="/">ГЛАВНАЯ</router-link></li>
                        <li><router-link to="/AboutUs">О НАС</router-link></li>
                        <li><router-link to="/OurStaff">НАШ СОСТАВ</router-link></li>
                        <li><router-link to="/Gallery">ГАЛЕРЕЯ</router-link></li>
                    </ul>

                    <div class="module module-cart pull-left booking-module">
                        <div class="module-icon">
                            <a class="btn btn--white btn--bordered btn--rounded booking-nav-button"
                                href="/#/#booking" @click.prevent="goToBooking">Онлайн-запись</a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
import { scrollToBooking, scrollToBookingWhenReady } from '../navigation'

export default {
    data() {
        return {
            isScrolled: false
        }
    },
    mounted() {
        this.updateScrolledState()
        window.addEventListener('scroll', this.updateScrolledState, { passive: true })
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.updateScrolledState)
    },
    methods: {
        updateScrolledState() {
            this.isScrolled = window.pageYOffset > 50
        },
        closeMobileMenu() {
            const menu = document.getElementById('navbar-collapse-1')
            const toggle = this.$el.querySelector('.navbar-toggle')
            if (menu) {
                menu.classList.remove('in')
            }
            if (toggle) {
                toggle.classList.add('collapsed')
                toggle.setAttribute('aria-expanded', 'false')
            }
        },
        goToBooking() {
            this.closeMobileMenu()
            const destination = { path: '/', hash: '#booking' }
            const scrollWhenStable = () => this.$nextTick(() => scrollToBookingWhenReady())
            const scrollNow = () => this.$nextTick(() => {
                window.requestAnimationFrame(() => scrollToBooking())
            })

            if (this.$route.path === '/') {
                if (this.$route.hash === '#booking') {
                    scrollNow()
                } else {
                    this.$router.push(destination).then(scrollNow).catch(scrollNow)
                }
                return
            }

            this.$router.push(destination).then(scrollWhenStable).catch(scrollWhenStable)
        }
    }
}
</script>

<style>
html {
    overflow-x: hidden;
    overflow-y: auto;
}

body {
    min-height: 100%;
    overflow: visible;
}

.public-navbar {
    transition: top 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease;
}

.public-navbar.is-scrolled,
.public-navbar.affix {
    top: 0 !important;
    background-color: rgba(35, 35, 35, 0.98) !important;
    box-shadow: 0 3px 14px rgba(0, 0, 0, 0.22);
}

.public-navbar .navbar-nav > li > a {
    transition: color 0.2s ease;
}

.public-navbar .navbar-nav > li > a:hover,
.public-navbar .navbar-nav > li > a.router-link-exact-active {
    color: #bb8c4b;
}

.public-navbar .booking-nav-button {
    cursor: pointer;
}

.public-navbar.is-scrolled .booking-nav-button,
.public-navbar.affix .booking-nav-button {
    border-color: #bb8c4b;
    color: #ffffff;
}

.public-header .top--register,
.public-header .top--social a {
    color: #ffffff;
}

@media only screen and (max-width: 991px) {
    .public-navbar .navbar-collapse {
        max-height: calc(100vh - 90px);
    }

    .public-navbar .booking-module {
        clear: both;
        float: none !important;
        padding: 8px 15px 20px;
    }

    .public-navbar .booking-module .module-icon {
        padding: 0;
    }

    .public-navbar .booking-nav-button {
        display: inline-block;
        margin: 0;
    }
}
</style>
