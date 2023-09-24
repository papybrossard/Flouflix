<template>
    <el-carousel type="card" :interval="4000" height="50vh" class="carousel">
        <el-carousel-item v-for="item in this.carouselItem" :key="item.id">
            <h1 class="carousel-title"> {{ item.name }}</h1>
            <div class="carousel-info-global">
                <img :src="item.urlImage" alt=" " class="carousel-image" />
                <div class="carousel-info">
                    <el-icon>
                        <user />
                    </el-icon>
                    <p> {{ item.minPlayers }} - {{ item.maxPlayers }} </p>
                </div>
                <div class="carousel-info">
                    <el-icon>
                        <avatar />
                    </el-icon>
                    <p> {{ item.minAge }} </p>
                </div>
                <div class="carousel-info">
                    <el-icon>
                        <timer />
                    </el-icon>
                    <p> {{ item.minPlayTime }} - {{ item.maxPlayTime }} </p>
                </div>
            </div>
            <el-card class="description">
                <p> {{ item.description }}</p>
            </el-card>
        </el-carousel-item>
    </el-carousel>
    <recommendation-rate :games="this.carouselItem" class="carousel-rate" />
</template>
<script>
import { ElCarousel, ElCarouselItem } from 'element-plus';
import RecommendationRate from '@/components/Recommendation/RecommendationRate.vue';
import { useUserActions } from '@/actionStore/userActions.js';
import { useUserStore } from '@/stores/userStore.js';
import { useMLActions } from '@/actionStore/mlActions.js';
import { useMLStore } from '@/stores/mlStore.js';
import { toRef } from 'vue';

import {
    Timer,
    Avatar,
    User,
} from '@element-plus/icons-vue';

export default {
    name: "coldCaroussel",
    components: {
        ElCarousel,
        ElCarouselItem,
        RecommendationRate,
        Timer,
        Avatar,
        User,
    },
    setup() {
        const userAction = useUserActions();
        const userStore = useUserStore();
        const mlAction = useMLActions();
        const mlStore = useMLStore();
        const carouselItem = toRef(mlStore, 'coldRecommandations');
        return {
            carouselItem,
            userAction,
            mlAction,
            mlStore,
            userStore 
        }
    },
    methods: {
        replaceBR(description) {
            let descriptionBR = description.replaceAll('<br/>', '\n');
            let descriptionQuot = descriptionBR.replaceAll('&quot;', '"');
            return descriptionQuot;
        }
    }
}
</script>
<style lang="scss" scoped> @import "@/assets/scss/RecommendationCarousel.scss"
</style>