<template>
    <p class="coldDescription"> Etape 2/3: Merci de selectionner 5 jeux que vous appreciez, afin que nous puissions generer
        vos
        recommandation.</p>
    <el-form class="filter rounded-border">
        <div class="filter-item">
            <el-form-item>
                <el-select placeholder="Selection N°1" filterable :filter-method="itemFiltered" v-model="form.firstGame">
                    <el-option v-for="item in items" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
            </el-form-item>
        </div>
        <div class="filter-item">
            <el-form-item>
                <el-select placeholder="Selection N°2" filterable v-model="form.secondGame">
                    <el-option v-for="item in items" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
            </el-form-item>
        </div>
        <div class="filter-item">
            <el-form-item>
                <el-select placeholder="Selection N°3" filterable v-model="form.thirdGame">
                    <el-option v-for="item in items" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
            </el-form-item>
        </div>
        <div class="filter-item">
            <el-form-item>
                <el-select placeholder="Selection N°4" filterable v-model="form.fourthGame">
                    <el-option v-for="item in items" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
            </el-form-item>
        </div>
        <div class="filter-item">
            <el-form-item>
                <el-select placeholder="Selection N°5" filterable v-model="form.fifthGame">
                    <el-option v-for="item in items" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
            </el-form-item>
        </div>
    </el-form>
    <div class= "buttonGroup">
        <el-button @click="previousStep()"> Retour </el-button>
        <el-button type="primary" @click="nextStep()"> Voir mes Recommandations </el-button>
    </div>
</template>
<script>
import {
    ElForm,
    ElFormItem,
    ElButton,
    ElMessage
} from 'element-plus';
import { ref } from 'vue';
import axios from 'axios';
import { urlAPI } from '@/assets/const.js';
import { useUserActions } from '@/actionStore/userActions.js';
import { useDialogActions } from '@/actionStore/dialogActions.js';
import { useMLActions } from '@/actionStore/mlActions.js';

export default {
    setup() {
        const dialogAction = useDialogActions();
        const userAction = useUserActions();
        const mlAction = useMLActions();

        const items = ref([]);
        const form = ref({
            firstGame: "",
            secondGame: "",
            thirdGame: "",
            fourthGame: "",
            fifthGame: ""
        });

        const notif = () => {
            ElMessage({
                message: "Merci de sélectionner tous les jeux",
                type: "warning"
            })
        };

        const timer = ref(null);

        const startTimer = () => {
            timer.value = null;
            timer.value = setInterval(() => { }, 1000);
        };

        return {
            dialogAction,
            items,
            form,
            userAction,
            notif,
            mlAction,
            timer,
            startTimer
        };
    },
    components: {
        ElForm,
        ElFormItem,
        ElButton,
    },
    mounted() {
        axios({
            method: 'get',
            url: urlAPI+'/api/games/list',
            params: {
                typed: ""
            },
            headers: {
                'Authorization': 'Bearer ' + this.userAction.getToken()
            }
        }).then((response) => {
            this.items = response.data;
        });
    },
    methods: {
        nextStep() {
            if (this.checkList()) {
                this.mlAction.setColdGamesSelect(this.form);
                axios({
                    method:'get',
                    url:urlAPI+'/api/ml/coldStart',
                    params: {
                        type: this.mlAction.getColdType(),
                        mechanic: this.mlAction.getColdMechanic(),
                        duration: this.mlAction.getColdDuration(),
                        age: this.mlAction.getColdAge(),
                        firstGame: this.form.firstGame,
                        secondGame: this.form.secondGame,
                        thirdGame: this.form.thirdGame,
                        fourthGame: this.form.fourthGame,
                        fifthGame: this.form.fifthGame,
                    }
                }).then((response) => {
                    this.mlAction.setColdRecommandations(response.data);
                });
                this.dialogAction.setActiveStep(2);
            } else {
                this.notif();
            }
        },
        previousStep() {
            this.dialogAction.setActiveStep(0);
        },
        checkList() {
            if (
                (!this.form.firstGame)
                || (!this.form.secondGame)
                || (!this.form.thirdGame)
                || (!this.form.fourthGame)
                || (!this.form.fifthGame)
            ) {
                return false;
            } else {
                return true
            }
        },
        itemFiltered(query) {
            if (this.timer > 2) {
                axios({
                    method: 'get',
                    url: urlAPI+'/api/games/list',
                    params: {
                        typed: query
                    },
                    headers: {
                        'Authorization': 'Bearer ' + this.userAction.getToken()
                    }
                }).then((response) => {
                    this.items = response.data;
                });
            }
            this.timer = 0;
            this.startTimer();
        }
    }
}
</script>
<style lang="scss" scoped> @import "@/assets/scss/coldStart.scss"
</style>