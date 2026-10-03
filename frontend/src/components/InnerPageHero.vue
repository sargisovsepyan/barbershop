<template>
    <section class="inner-page-hero" :style="heroStyle">
        <div class="inner-page-hero__overlay" aria-hidden="true"></div>
        <div class="container inner-page-hero__content">
            <h1>{{ title }}</h1>
            <p>{{ subtitle }}</p>
            <span class="inner-page-hero__line" aria-hidden="true"></span>
        </div>
    </section>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        },
        subtitle: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        }
    },
    computed: {
        heroStyle() {
            return {
                backgroundImage: `url('${this.image}')`
            }
        }
    }
}
</script>

<style>
.inner-page-hero {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    min-height: 410px;
    margin-top: -140px;
    padding-top: 140px;
    box-sizing: border-box;
    overflow: hidden;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    color: #ffffff;
}

.inner-page-hero__overlay {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(18, 18, 18, 0.58);
}

.inner-page-hero__content {
    position: relative;
    z-index: 2;
    max-width: 880px;
    text-align: center;
}

.inner-page-hero h1 {
    margin: 0 0 14px;
    color: #ffffff;
    font-size: 54px;
    font-weight: 700;
    line-height: 1.12;
}

.inner-page-hero p {
    max-width: 720px;
    margin: 0 auto;
    color: rgba(255, 255, 255, 0.9);
    font-size: 18px;
    line-height: 1.55;
}

.inner-page-hero__line {
    display: block;
    width: 52px;
    height: 2px;
    margin: 22px auto 0;
    background: #bb8c4b;
}

@media only screen and (max-width: 991px) {
    .inner-page-hero {
        min-height: 340px;
    }

    .inner-page-hero h1 {
        font-size: 44px;
    }
}

@media only screen and (max-width: 767px) {
    .inner-page-hero {
        min-height: 300px;
        padding-right: 20px;
        padding-left: 20px;
    }

    .inner-page-hero h1 {
        margin-bottom: 10px;
        font-size: 36px;
    }

    .inner-page-hero p {
        font-size: 15px;
        line-height: 1.45;
    }

    .inner-page-hero__line {
        margin-top: 16px;
    }
}
</style>
