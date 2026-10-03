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
                <div class="row">
                    <div class="col-xs-12 gallery-filter gallery-page__filters">
                        <ul class="list-inline mb-0" aria-label="Фильтр галереи">
                            <li v-for="filter in filters" :key="filter.value">
                                <button type="button" :class="{ 'active-filter': activeCategory === filter.value }"
                                    @click="setCategory(filter.value)">{{ filter.label }}</button>
                            </li>
                        </ul>
                    </div>
                </div>

                <div ref="galleryGrid" id="gallery-all" class="row gallery-page__grid">
                    <div v-for="item in paginatedGallery" :key="item._id || item.imgsrc"
                        class="col-xs-12 col-sm-6 col-md-4 gallery-item">
                        <div class="gallery--img">
                            <img :src="item.imgsrc" :alt="categoryText(item.categories)">
                            <div class="gallery--hover">
                                <div class="gallery--action">
                                    <div class="pos-vertical-center gallery-page__category">
                                        <span v-for="category in item.categories" :key="category">
                                            {{ categoryLabel(category) }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="totalPages > 1" class="row">
                    <div class="col-xs-12 clearfix mt-30 text--center">
                        <ul class="pagination gallery-page__pagination" aria-label="Страницы галереи">
                            <li :class="{ disabled: currentPage === 1 }">
                                <button type="button" :disabled="currentPage === 1"
                                    @click="goToPage(currentPage - 1)">‹ Назад</button>
                            </li>
                            <li v-for="page in pageNumbers" :key="page" :class="{ active: currentPage === page }">
                                <button type="button" @click="goToPage(page)">{{ page }}</button>
                            </li>
                            <li :class="{ disabled: currentPage === totalPages }">
                                <button type="button" :disabled="currentPage === totalPages"
                                    @click="goToPage(currentPage + 1)">Далее ›</button>
                            </li>
                        </ul>
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

const galleryCategoryMap = {
    'assets/images/gallery/3col/1.jpg': ['Lineup'],
    'assets/images/gallery/3col/2.jpg': ['Beard'],
    'assets/images/gallery/3col/3.jpg': ['Hairstyle', 'Shave'],
    'assets/images/gallery/3col/4.jpg': ['Hairstyle'],
    'assets/images/gallery/3col/5.jpg': ['Lineup'],
    'assets/images/gallery/3col/6.jpg': ['Hairstyle'],
    'assets/images/gallery/3col/7.jpg': ['Shave'],
    'assets/images/gallery/3col/8.jpg': ['Hairstyle'],
    'assets/images/gallery/3col/9.jpg': ['Lineup']
}

const categoryLabels = {
    Hairstyle: 'Стрижки',
    Beard: 'Борода',
    Lineup: 'Контуры',
    Shave: 'Бритьё'
}

function normalizeImagePath(imagePath) {
    return String(imagePath || '').replace(/\\/g, '/').replace(/^\//, '')
}

export default {
    components: {
        Header,
        Footer,
        InnerPageHero
    },
    data() {
        return {
            gallery: [],
            activeCategory: 'All',
            currentPage: 1,
            pageSize: 6,
            filters: [
                { value: 'All', label: 'Все' },
                { value: 'Hairstyle', label: 'Стрижки' },
                { value: 'Beard', label: 'Борода' },
                { value: 'Lineup', label: 'Контуры' },
                { value: 'Shave', label: 'Бритьё' }
            ]
        }
    },
    computed: {
        galleryWithMetadata() {
            return this.gallery.map((item) => {
                const imagePath = normalizeImagePath(item.imgsrc)
                return Object.assign({}, item, {
                    categories: galleryCategoryMap[imagePath] || []
                })
            })
        },
        filteredGallery() {
            if (this.activeCategory === 'All') {
                return this.galleryWithMetadata
            }
            return this.galleryWithMetadata.filter((item) => item.categories.includes(this.activeCategory))
        },
        paginatedGallery() {
            const start = (this.currentPage - 1) * this.pageSize
            return this.filteredGallery.slice(start, start + this.pageSize)
        },
        totalPages() {
            return Math.max(1, Math.ceil(this.filteredGallery.length / this.pageSize))
        },
        pageNumbers() {
            const pages = []
            for (let page = 1; page <= this.totalPages; page += 1) {
                pages.push(page)
            }
            return pages
        }
    },
    mounted() {
        axios.get(API_BASE_URL + '/gallery').then((response) => {
            this.gallery = response.data
        })
    },
    methods: {
        setCategory(category) {
            this.activeCategory = category
            this.currentPage = 1
        },
        goToPage(page) {
            if (page < 1 || page > this.totalPages || page === this.currentPage) {
                return
            }
            this.currentPage = page
            this.$nextTick(() => {
                const top = this.$refs.galleryGrid.getBoundingClientRect().top + window.pageYOffset - 105
                window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
            })
        },
        categoryLabel(category) {
            return categoryLabels[category] || category
        },
        categoryText(categories) {
            return categories.map(this.categoryLabel).join(', ')
        }
    }
}
</script>

<style>
.gallery-page {
    padding: 85px 0 90px;
}

.gallery-page__filters {
    margin-bottom: 45px;
    text-align: center;
}

.gallery-page__filters button {
    padding: 0 0 8px;
    border: 0;
    border-bottom: 2px solid transparent;
    background: transparent;
    color: #333333;
    font-family: 'Open Sans', sans-serif;
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    transition: color 0.2s ease, border-color 0.2s ease;
}

.gallery-page__filters button:hover,
.gallery-page__filters button:focus,
.gallery-page__filters button.active-filter {
    border-bottom-color: #bb8c4b;
    outline: 0;
    color: #bb8c4b;
}

.gallery-page__grid {
    min-height: 300px;
}

.gallery-page__category span {
    color: #ffffff;
    font-size: 16px;
    font-weight: 600;
}

.gallery-page__category span + span:before {
    content: ' • ';
    color: #bb8c4b;
}

.gallery-page__pagination > li > button {
    min-width: 37px;
    height: 37px;
    padding: 0 12px;
    border: 1px solid #e5e5e5;
    background: transparent;
    color: #333333;
    font-size: 14px;
    line-height: 35px;
    transition: background-color 0.2s ease, color 0.2s ease;
}

.gallery-page__pagination > li.active > button,
.gallery-page__pagination > li > button:hover:not(:disabled) {
    border-color: #333333;
    background: #333333;
    color: #ffffff;
}

.gallery-page__pagination > li.disabled > button {
    cursor: not-allowed;
    opacity: 0.4;
}

@media only screen and (max-width: 767px) {
    .gallery-page {
        padding: 60px 0;
    }

    .gallery-page__filters {
        margin-bottom: 32px;
    }

    .gallery-page__filters li {
        margin-bottom: 12px;
    }

    .gallery-page__pagination > li {
        margin-right: 5px;
    }

    .gallery-page__pagination > li > button {
        padding: 0 8px;
    }
}
</style>
