<template>
    <div id="welcomeSpeech">
        <h1> Bienvenue sur WouldYouPlayIt - Votre Guide de Jeux de Société </h1>
        <p>
            Plongez dans un monde de divertissement, d'excitation et de stratégie avec WouldYouPlayIt.
            Nous sommes votre destination ultime pour découvrir et explorer les jeux de société les plus
            passionnants et captivants du moment. Que vous soyez un joueur chevronné ou que vous découvriez
            le monde des jeux de société pour la première fois, notre site est conçu pour vous
            aider à trouver les jeux parfaits pour vos préférences, votre groupe d'amis et votre occasion
            spéciale.
        </p>
        <h2> Découvrez Votre Prochain Coup de Cœur </h2>
        <p>
            Que vous recherchiez un jeu pour une soirée tranquille à la maison, une compétition féroce entre amis ou une
            expérience épique en famille, WouldYouPlayIt est là pour vous guider: Explorez notre vaste collection de jeux de
            société,
            des classiques intemporels aux dernières nouveautés.
            Nous avons soigneusement sélectionné chaque jeu pour vous offrir une expérience de jeu
            exceptionnelle. Notre plateforme vous propose de vous aider à choisir avec lequel de ces jeux
            vous animerez vos moments festifs!
        </p>
        <h3> Vous avez un compte BoardGameGeek!</h3>
        <p>
            Si vous disposez d'un compte site sur le site BoardGameGeek, et que vous avez noté assez de jeux de société
            (à notre humble avis une vingtaine de jeux de société),
            <el-button link type="primary" class="inline" @click="register()">
                inscrivez-vous ou connectez-vous
            </el-button>
            sur notre site,et venez consulter les recommandations que nous avons à vous faire!
        </p>
        <h3> Vous n'avez de compte BoardGameGeek!</h3>
        <p>
            Pas de panique! Nous avons également pensé à vous, vous trouverez une section dédiée,
            vous n'aurez qu'à nous indiquer quelques informations,
            et nous vous proposerons toutes une séries de jeux personnalisés!
        </p>
    </div>
</template>
<script>
import { ElButton } from 'element-plus';
import { useDialogActions } from '@/actionStore/dialogActions.js';
import { useUserActions } from '@/actionStore/userActions.js';

export default {
    setup() {
        const dialogAction = useDialogActions();
        const userAction = useUserActions();
        return { dialogAction, userAction };
    },
    name: "AdministrationPage",
    components: {
        ElButton,
    },
    methods: {
        register() {
            this.dialogAction.toggleDialogState();
        }
    }
}
</script>
<style lang="scss" scoped> @import "@/assets/scss/WelcomePage.scss"
</style>