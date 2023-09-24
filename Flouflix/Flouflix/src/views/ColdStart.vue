<template>
    <ColdSteps />
    <p v-if="filters()" class="coldDescription"> Pour commencer, afin de vous proposer les résultats les plus pertinents, nous vous proposons de prefiltrer les résultats,
        si vous n'avez pas de preferences, vous pouvez directement selectionner "Suivant".</p>
    <FilterColdStart v-if="filters()"/>
    <GameForm v-if="game()" />
    <ColdResult v-if="result()" />
</template>
<script>
import ColdSteps from '@/components/ColdStart/ColdSteps.vue';
import FilterColdStart from '@/components/ColdStart/FilterColdStart.vue';
import GameForm from '@/components/ColdStart/GameForm.vue';
import ColdResult from '@/components/ColdStart/ColdResult.vue';
import axios from 'axios';
import { urlAPI } from '@/assets/const.js';
import { useDialogStore } from '@/stores/dialogStore';
import { useUserActions } from '@/actionStore/userActions.js';
import { useMLActions } from '@/actionStore/mlActions';

export default {
    setup() {
        const dialogStore = useDialogStore();
        const mlActions = useMLActions();
        const userAction = useUserActions();
        return { dialogStore, mlActions, userAction }
    },
    components: {
        ColdSteps,
        FilterColdStart,
        GameForm,
        ColdResult
    },
    mounted() {
        axios({
            method: 'get',
            url: urlAPI+'/api/games/list',
            params: {
                typed: "ang"
            },
            headers: {
                'Authorization': 'Bearer ' + this.userAction.getToken()
            }
        }).then((response) => {
            this.mlActions.setGames(response.data);
        });
    },
    methods: {
        filters() {
            if(this.dialogStore.activeStep === 0) {
                return true;
            } else {
                return false
            }
        },
        game() {
            if(this.dialogStore.activeStep === 1) {
                return true;
            } else {
                return false
            }
        },
        result() {
            if(this.dialogStore.activeStep === 2) {
                return true;
            } else {
                return false
            }
        }
    }
}

</script>