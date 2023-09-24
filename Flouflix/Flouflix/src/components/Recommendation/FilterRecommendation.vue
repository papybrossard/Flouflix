<template>
    <el-form class="filter rounded-border">
        <div class="filter-item">
            <p>Type: </p>
            <el-form-item>
                <el-select filterable clearable  v-model="mlStore.type">
                    <el-option 
                        v-for="item in typeOptions"    
                        :key="item.key" 
                        :label="item.type" 
                        :value="item.type" 
                    />
                </el-select>
            </el-form-item>
        </div>
        <div class="filter-item">
            <p>Mécanique: </p>
            <el-form-item>
                <el-select filterable clearable  v-model="mlStore.mechanic">
                    <el-option 
                    v-for="item in this.mechOptions" 
                    :key="item.key" 
                    :label="item.mechanic"
                    :value="item.mechanic"
                />
                </el-select>
            </el-form-item>
        </div>
        <div class="filter-item">
            <p> Durée maximum: </p>
            <el-form-item class="slider">
                <el-slider :step="20" :max="180" :format-tooltip="durationTooltip" v-model="mlStore.duration" />
            </el-form-item>
        </div>
        <div class="filter-item">
            <p> Age minimum: </p>
            <el-form-item class="slider">
                <el-slider :min="3" :max="16" :format-tooltip="ageTooltip" v-model="mlStore.age" />
            </el-form-item>
        </div>
        <FilterButton class="filter-item filterButton"/>
    </el-form>
</template>
<script>
import { ref } from 'vue';
import axios from 'axios';
import { urlAPI } from '@/assets/const.js';
import { useMLStore } from '@/stores/mlStore.js';
import { useMLActions } from '@/actionStore/mlActions.js';
import { useUserActions } from '@/actionStore/userActions.js';
import FilterButton from '@/components/Recommendation/FilterButton.vue';

export default {
    name: "FilterRecommendation",
    setup() {
        const form = ref({
            type: "",
            mechanic: "",
            duration: 180,
            age: 3,
        });
        const typeOptions = ref([]);
        const mechOptions = ref([]);
        const userAction = useUserActions();
        const durationValue = ref(180);
        const ageValue = ref(3);
        const mlActions = useMLActions();
        const mlStore = useMLStore();

        const durationTooltip = (value) => {
            if (value === 180) {
                return '180m+';
            }
            return value.toString() + "m";
        };

        const ageTooltip = (value) => {
            if (value === 16) {
                return '16 ans +';
            }
            return value.toString() + " ans";
        };

        return {
            form,
            typeOptions,
            mechOptions,
            userAction,
            durationValue,
            ageValue,
            durationTooltip,
            ageTooltip,
            mlActions,
            mlStore,
            FilterButton
        };
    },
    components: {
        FilterButton
    },
    mounted() {
        axios({
            method: 'get',
            url: urlAPI+'/api/mechanics/list',
            headers: {
                'Authorization': 'Bearer ' + this.userAction.getToken()
            }
        }).then((response) => {
            this.mechOptions = response.data.mechanics
        });
        axios({
            method: 'get',
            url: urlAPI+'/api/types/list',
            headers: {
                'Authorization': 'Bearer ' + this.userAction.getToken()
            }
        }).then((response) => {
            this.typeOptions = response.data.types
        });
    }
}
</script>
<style lang="scss" scoped> @import "@/assets/scss/Filters.scss"
</style>