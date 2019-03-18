<template>
    <div class="header">
        <img class="header__logo" alt="Estimation tool logo" src="../assets/epsilon.png">
        <div class = "header__title">Estimation tool</div>
        <div class="header__menu">
            <div class="header__menu_content_wrapper" v-if="authenticated">
                <img class="header__menu__logo" alt="Estimation tool logo" src="../assets/menu.png">
                <div class="header__menu__elements">
                    <router-link to="/login" v-on:click.native="logout()" replace>Logout</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PageHeader',
    props: {
        authenticated: Boolean,
        username: String
    },
    methods: {
        logout() {
            authenticated = false;
            this.$emit('authenticated', false);
        }
    }
}
</script>

<style scoped>
.header {
    width: 99vw;
    padding: 4px;
    display: flex;
    height: 40px;
    position: fixed;
    top: 0;
}

.header__logo {
    object-fit: contain;
    flex-grow: 0;
    width: 40px;
}

.header__title {
    flex-grow: 1;
}

.header__menu {
    position: relative;
    display: inline-block;
}

.header__menu:hover .header__menu__elements {
    display: block;
}

.header__menu__elements {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    margin-left: -160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    padding: 12px 16px;
    z-index: 1;
}

.header__menu__logo {
    object-fit: contain;
    flex-grow: 0;
    width: 40px;
}
</style>