<template>
    <div class="search">
        <div>Search query: </div>
        <input type="text" name="search_query" v-model="input.username" placeholder="CR_Number = '123' & Title = 'Some title'"/>
        <button>Search</button>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

export default Vue.extend({
    name: 'Search',
    data() {
        return {
            input: {
                username: '',
                password: '',
            },
        };  
    },
});

</script>

<style lang="scss">
    @import '@/common/styles/common.scss';

    .search {
        display: flex;
        border: 1px solid #CCCCCC;
        background-color: $element-background-color;
        padding: 5px;
        border-radius: 5px;

        & > div {
            padding: 5px;
            padding-top: 15px;
        }

        input {
            flex-grow: 1;
        }

        input, textarea  {
            height: 40px;
            font-size: 100%;
        }

    }

</style>