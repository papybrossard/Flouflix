<template>
    <div v-if="store.userConnected">
        <FilterRecommendation />
        <RecommendationCarousel/>
    </div>
    <div class="disconnect" v-else>
        <p> Veuillez vous connecter à votre compte BGG afin de beneficier de cette fonctionnalité </p>
    </div>
</template>
<script>
import FilterRecommendation from '@/components/Recommendation/FilterRecommendation.vue';
import RecommendationCarousel from '@/components/Recommendation/RecommendationCarousel.vue';
import { useDialogStore } from "@/stores/dialogStore.js";

    export default {
    name: "RecommendationSpace",
    components: {
        FilterRecommendation,
        RecommendationCarousel,
    },
    setup() {
        const store = useDialogStore();

        return { store }
    }
}
</script>
