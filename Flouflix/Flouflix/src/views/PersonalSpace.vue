<template>
    <el-button type="primary" @click="refreshUser()">
        <el-icon>
            <refresh :size="50" />
        </el-icon>
        Synchroniser avec BGG
    </el-button>

    <el-button @click="this.dialogAction.toggleDialogPassword()">
        Modifier mon mot de passe
    </el-button>
    <UserInformation />
    <ModalPassword />
    <div class="list">
        <TopList :items="topItems" />
        <HotList :items="hotItems" />
    </div>
</template>
<script>
import axios from 'axios';
import { urlAPI } from '@/assets/const.js';
import { ref } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { useDialogStore } from '@/stores/dialogStore';
import { useUserActions } from '@/actionStore/userActions.js';
import { useDialogActions } from '@/actionStore/dialogActions.js';
import TopList from '@/components/PersonalSpace/TopList.vue';
import HotList from '@/components/PersonalSpace/HotList.vue';
import UserInformation from '@/components/PersonalSpace/UserInformation.vue';
import ModalPassword from '@/components/PersonalSpace/ModalPassword.vue';
import {
    ElButton,
    ElNotification,
    ElMessage
} from 'element-plus';


export default {
    name: "PersonalSpace",
    setup() {
        const dialogStore = useDialogStore();
        const dialogAction = useDialogActions();
        const userStore = useUserStore();
        const userAction = useUserActions();
        const topItems = ref([]);
        const hotItems = ref([]);

        const updateSuccess = (message, type) => {
            ElNotification({
                title: 'Mise à jour',
                duration: 2500,
                showClose: false,
                message: message,
                type: type
            })
        }

        const notif = (message, type) => {
            ElMessage({
                message: message,
                type: type

            })
        }

        axios({
            method: 'get',
            url: urlAPI+'/api/top/' + userAction.getUserName(),
            headers: {
                'Authorization': 'Bearer ' + userAction.getToken()
            }
        }).then((response) => {
            topItems.value = response.data;
        });

        axios({
            method: 'get',
            url: urlAPI+'/api/hot/' + userAction.getUserName(),
            headers: {
                'Authorization': 'Bearer ' + userAction.getToken()
            }
        }).then((response) => {
            hotItems.value = response.data;
        });

        return { dialogStore, userStore, userAction, updateSuccess, notif, dialogAction, topItems, hotItems }
    },
    components: {
        TopList,
        HotList,
        UserInformation,
        ModalPassword,
        ElButton,
    },
    methods: {
        refreshUser() {
            axios({
                method: 'get',
                url: urlAPI+'/api/user/refresh',
                headers: {
                    'Authorization': 'Bearer ' + this.userAction.getToken()
                },
                params: {
                    username: this.userStore.username
                }
            }).then((response) => {
                location.reload();
                this.updateSuccess(
                    response.data.message,
                    response.data.status
                )
            }).catch(($response, error) => {
                console.log(error);
            })
        },
        updatePassword() {
            this.dialogAction.toggleDialogPassword();
            console.log(this.dialogStore.dialogPasswordVisible);
        }

    }
}

</script>
<style lang="scss" scoped> @import "@/assets/scss/PersonalSpace.scss"
</style>