<template>
    <el-text> Voici nos propositions ! </el-text>
    <ColdCarousel />
    <div class="restart-button">
    <el-button type="primary" @click="restart()"> Recommencer </el-button>
    </div>
</template>
<script>
    import { 
        ElButton
    } from 'element-plus';
    import { useDialogActions } from '@/actionStore/dialogActions.js';
    import ColdCarousel from '@/components/ColdStart/ColdCarousel.vue';

    export default {
        setup(){
            const dialogAction = useDialogActions();

            return { dialogAction };
        },
        components: {
            ElButton,
            ColdCarousel
        },
        methods: {
            restart() {
                this.dialogAction.setActiveStep(0);
            },
        }
    }
</script>
<style lang="scss" scoped> @import "@/assets/scss/RecommendationCarousel.scss"
</style>
