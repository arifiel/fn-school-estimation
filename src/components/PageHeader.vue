<template>
    <div class="header">
        <img src="@/assets/epsilon.png" />
        <div class="info optional">
            <div>Estilamtion tool</div>
        </div>
        <div class="header__user_info optional_replacement">
            {{username}}
        </div>
        <div class="header__menu">
            <a href="#" @focus="onFocusMenu" @blur="onBlurMenu">
                <img src="@/assets/menu.png" />
            </a>
            <div class="header__menu__items" v-if="menu_opened">
                <router-link tag="button" to="/">CR List</router-link>
                <router-link tag="button" to="/create">Create CR</router-link>
                <router-link class="logout_button" tag="button" to="/login" @click="logout()">Logout</router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
const sleep = (milliseconds: number) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

import { Component, Vue } from 'vue-property-decorator';
import { AuthService } from '@/common/services/AuthService';

export default Vue.extend({
    name: 'PageHeader',
    data() {
        return {
            menu_opened: false,
        };
    },
    computed: {
        username(): string {
            const user = AuthService.getUser();
            return user != null ? user.name : 'Unauthorized user!';
        },
    },
    methods: {
        logout() {
            AuthService.logout();
            console.log('logout');

        },
        onFocusMenu() {
            this.menu_opened = true;
        },
        onBlurMenu() {
            sleep(100).then(() => {
                this.menu_opened = false;
            });
        },
    },
});
</script>

<style lang="scss" scoped>
    @import '@/common/styles/common.scss';

    .header {
        height: 40px;        
        width: 100%;
        background-color: $element-background-color;
        position: fixed;
        top: 0;
        display: flex;

        & > img {
            width: 40px;
            filter: invert(100%);
        }

        .info {
            padding-top: 10px;
            flex-grow: 1;
        }

        .header__user_info {
            padding-top: 10px;
            padding-right: 10px;
        }

        .header__menu {
            align-self: right;
            width: 50px;

            img {
                width: 40px;
                filter: invert(100%);
            }

            .header__menu__items {
                position: relative;
                background-color: $element-background-color;
                width: 100px;
                left: -64px;
                border: 1px solid #CCCCCC;
                padding: 5px;

                button {
                    width: 100%;
                    height: 30px;
                }

                .logout_button {
                    background-color: $login-background-color;
                }
            }

        }

    }
</style>