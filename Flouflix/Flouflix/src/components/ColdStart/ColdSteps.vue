<template>
    <el-steps :active="this.dialogStore.activeStep" finish-status="success">
        <el-step title="Préfiltres" />
        <el-step title="Vos Préferences" />
        <el-step title="Nos propositions" />
    </el-steps>
</template>
<script>
import { ElSteps, ElStep, ElButton } from 'element-plus';
import { useDialogStore } from '@/stores/dialogStore.js';

export default {
    setup() {
        const dialogStore = useDialogStore();

        return { dialogStore }
    },
    components: {
        ElSteps,
        ElStep,
        ElButton
    }
}

</script>
