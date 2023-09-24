<template>
    <el-button type="primary" @click="filter()"> Affiner </el-button>
</template>
<script>
import axios from 'axios';
import { urlAPI } from '@/assets/const.js';
import { ElButton } from 'element-plus';
import { useMLStore } from '@/stores/mlStore.js';
import { useMLActions } from '@/actionStore/mlActions.js';
import { useUserActions } from '@/actionStore/userActions.js';
import { useUserStore } from '@/stores/userStore.js';

export default {
    name: "FilterButton",
    setup() {
        const mlActions = useMLActions();
        const mlStore = useMLStore();
        const userAction = useUserActions();
        const userStore = useUserStore();

        return {
            mlActions,
            mlStore,
            userAction,
            userStore
        };
    },
    components: {
        ElButton
    },
    methods: {
        filter() {
            if(!this.mlStore.recoLoading) {
                this.mlActions.toggleRecoLoading();
            }
            
            axios({
            method: 'get',
            params:{
                type: this.mlActions.getType(),
                mechanic: this.mlActions.getMechanic(),
                duration: this.mlActions.getDuration(),
                age: this.mlActions.getAge(),
                user: this.userStore.username,
            },
            url: urlAPI+'/api/ml/recommandation',
            headers: {
                'Authorization': 'Bearer ' + this.userAction.getToken()
            }
        }).then((response) => {
            if(this.mlStore.recoLoading) {
                this.mlActions.toggleRecoLoading();
            }
            this.mlActions.setRecommandations(response.data);
        }).catch((error) => {
            if(this.mlstore.recoLoading) {
                this.mlActions.toggleRecoLoading();
            }
        });
        }
    }
}
</script>
<style lang="scss" scoped> @import "@/assets/scss/Filters.scss"
</style>