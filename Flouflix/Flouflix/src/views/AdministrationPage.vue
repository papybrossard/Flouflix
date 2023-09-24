<template>
 <el-button @click="updateGames()"> Mettre à jour les jeux </el-button>
 <el-button @click="updateMech()"> Mettre à jour les mechaniques </el-button>
 <el-button @click="updateType()"> Mettre à jour les types  </el-button>
 <el-button @click="updateGameType()"> Mettre à jour les associations Jeux / Types  </el-button>
 <el-button @click="updateGameMech()"> Mettre à jour les associations Jeux / Mechaniques  </el-button>
</template>
<script>
import axios from 'axios';
import { urlAPI } from '@/assets/const.js';
import { ElButton } from 'element-plus';
import { useUserStore } from '@/stores/userStore';
import { useUserActions } from '@/actionStore/userActions.js';

export default {
 setup() {
     const userStore = useUserStore();
     const userAction = useUserActions();
     return { userStore, userAction };
 },
 name:"AdministrationPage",
 components: {
     ElButton,
 },
 methods: {
     updateGames() {
         axios({
             method: 'get',
             url: urlAPI+'/api/update/games',
             headers: {
             'Authorization': 'Bearer ' + this.userAction.getToken()
         }
         }).then((response) => {
             console.log(response);
         });
     },
     updateType() {
         axios({
             method: 'get',
             url: urlAPI+'/api/update/types',
             headers: {
             'Authorization': 'Bearer ' + this.userAction.getToken()
         }
         }).then((response) => {
             console.log(response);
         });
     },
     updateMech() {
         axios({
             method: 'get',
             url: urlAPI+'/api/update/mechanics',
             headers: {
             'Authorization': 'Bearer ' + this.userAction.getToken()
         }
         }).then((response) => {
             console.log(response);
         });
     },
     updateGameType() {
        axios({
             method: 'get',
             url: urlAPI+'/api/update/gametype',
             headers: {
             'Authorization': 'Bearer ' + this.userAction.getToken()
         }
         }).then((response) => {
             console.log(response);
         });
     },
     updateGameMech() {
        axios({
             method: 'get',
             url: urlAPI+'/api/update/gamemech',
             headers: {
             'Authorization': 'Bearer ' + this.userAction.getToken()
         }
         }).then((response) => {
             console.log(response);
         });
     }
 }
}
</script>