<template>
    <p>
    {{ returnMessage}}
        
    </p>
    <el-carousel v-loading="this.recoLoading" type="card" :interval="4000" height="50vh" class="carousel">
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
    <p v-if="recoError"> Oups ! Désolé, une erreur est survenue, désolé pour cela! </p>
    <recommendation-rate :games="this.carouselItem" class="carousel-rate" />
</template>
<script>
import { ElCarousel, ElCarouselItem } from 'element-plus';
import RecommendationRate from '@/components/Recommendation/RecommendationRate.vue';
import { useUserActions } from '@/actionStore/userActions.js';
import { useUserStore } from '@/stores/userStore.js';
import { useMLActions } from '@/actionStore/mlActions.js';
import { useMLStore } from '@/stores/mlStore.js';
import { toRef, ref } from 'vue';
import axios from 'axios';
import { urlAPI } from '@/assets/const.js';


import {
    Timer,
    Avatar,
    User,
} from '@element-plus/icons-vue';

export default {
    name: "SelectTypeList",
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
        const carouselItem = toRef(mlStore, 'recommandations');
        const recoDone = toRef(mlStore, 'recoDone');
        const recoLoading = toRef(mlStore, 'recoLoading');
        const recoError = toRef(mlStore, 'recoError');

        return {
            carouselItem,
            userAction,
            mlAction,
            mlStore,
            userStore,
            recoDone,
            recoLoading,
            recoError 
        }
    },
    mounted() {
        if(!this.mlAction.setColdRecommandations()){
            axios({
            method: 'get',
            url: urlAPI+'/api/ml/recommandation',
            params: {
                duration: 180,
                age: 3,
                user: this.userStore.username
            },
            headers: {
                'Authorization': 'Bearer ' + this.userAction.getToken()
            }
        }).then((response) => {
            this.mlAction.toggleRecoLoading();
            this.mlAction.setColdRecommandations(response.data)
            if(response.status == 201) {
                this.mlAction.toggleRecoDone(true);
            } else {
                this.recoDone = false;
            }
        }).catch((error) => {
            this.mlAction.toggleRecoLoading();
            this.mlAction.toggleRecoError(true);
        });
        }
    },
    methods: {
        replaceBR(description) {
            let descriptionBR = description.replaceAll('<br/>', '\n');
            let descriptionQuot = descriptionBR.replaceAll('&quot;', '"');
            return descriptionQuot;
        },
    },
    data: {
        returnMessage: ""
    } 
}
</script>
<style lang="scss" scoped> @import "@/assets/scss/RecommendationCarousel.scss"
</style>