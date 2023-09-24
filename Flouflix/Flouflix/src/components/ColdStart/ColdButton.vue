<template>
    <el-button type="primary" @click="filter()"> Suivant </el-button>
</template>
<script>
import { ElButton } from 'element-plus';
import { useMLActions } from '@/actionStore/mlActions.js';
import { useMLStore } from '@/stores/mlStore.js';
import { useDialogActions } from '@/actionStore/dialogActions.js';

export default {
    name: "ColdButton",
    setup() {
        const mlActions = useMLActions();
        const mlStore = useMLStore();
        const dialogAction = useDialogActions();

        return {
            mlActions,
            mlStore,
            dialogAction
        };
    },
    components: {
        ElButton
    },
    methods: {
        filter() {
        this.dialogAction.setActiveStep(1);
        }
    }
}
</script>
<style lang="scss" scoped> @import "@/assets/scss/Filters.scss"
</style>