<template>
    <div v-if="!this.ratedDone">
        <el-rate v-model="rateValue" half />
        <el-button @click="evaluate()">Evaluer</el-button>
    </div>
    <div v-else>
        <div class="rateDone">
            <el-icon>
                <SuccessFilled />
            </el-icon>
            <p> Merci de votre retour, il a bien été pris en compte </p>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue';
import axios from 'axios';
import { urlAPI } from '@/assets/const.js';
import { ElButton, ElIcon } from 'element-plus';
import { useUserStore } from '@/stores/userStore';
import { useUserActions } from '@/actionStore/userActions.js';
import { useMLActions } from '@/actionStore/mlActions.js';
import {
    SuccessFilled
} from '@element-plus/icons-vue';

export default {
    setup() {
        const rateValue = ref(0);
        const ratedDone = ref(false);
        const userStore = useUserStore();
        const userAction = useUserActions();
        const mlAction = useMLActions();

        return { 
            rateValue, 
            ratedDone, 
            userStore, 
            userAction, 
            mlAction 
        };
    },
    name: "RecommendationRate",
    components: {
        ElButton,
        ElIcon,
        SuccessFilled
    },
    props: {
        games: {
            type: Array,
            required: true
        }
    },
    methods: {
        evaluate() {
            if (this.userStore.username) {
                axios({
                    method: 'post',
                    url: urlAPI+'/api/rate',
                    data: {
                        games: this.mlAction.getRecommandations(),
                        username: this.userStore.username,
                        rate: this.rateValue
                    },
                    headers: {
                        'Authorization': 'Bearer ' + this.userAction.getToken()
                    }
                }).then(() => {
                    this.ratedDone = true
                });
            }
        }
    }
}
</script>
<style lang="scss" scoped> @import "@/assets/scss/recommandationRate.scss"
</style>